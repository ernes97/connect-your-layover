import { useState, useEffect, useCallback } from 'react';
import { layoverStore } from '../store/layoverStore';
import { UserProfile, TravelCode, PrivateChat, GroupChat, LayoverMatch } from '../types';

// Current user context
let currentUser: UserProfile | null = null;

export function useCurrentUser() {
  const [user, setUser] = useState<UserProfile | null>(currentUser);

  const setCurrentUser = useCallback((newUser: UserProfile | null) => {
    currentUser = newUser;
    setUser(newUser);
  }, []);

  return { user, setCurrentUser };
}

export function useCreateUser() {
  const { setCurrentUser } = useCurrentUser();

  const createUser = useCallback((
    firstName: string,
    age: number,
    gender: 'M' | 'F' | 'Other',
    originCountry: string,
    languages: string[],
    travelCode: TravelCode
  ) => {
    const user = layoverStore.createUser(firstName, age, gender, originCountry, languages, travelCode);
    setCurrentUser(user);
    return user;
  }, [setCurrentUser]);

  return { createUser };
}

export function useLayoverMatches() {
  const { user } = useCurrentUser();
  const [matches, setMatches] = useState<LayoverMatch | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshMatches = useCallback(() => {
    if (!user) return;
    
    setIsLoading(true);
    const layoverMatches = layoverStore.getLayoverMatches(user.id);
    setMatches(layoverMatches || null);
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    refreshMatches();
    
    // Refresh matches every 30 seconds
    const interval = setInterval(refreshMatches, 30000);
    return () => clearInterval(interval);
  }, [refreshMatches]);

  return { matches, isLoading, refreshMatches };
}

export function usePrivateChats() {
  const { user } = useCurrentUser();
  const [chats, setChats] = useState<PrivateChat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshChats = useCallback(() => {
    if (!user) return;
    
    setIsLoading(true);
    const privateChats = layoverStore.getPrivateChatsForUser(user.id);
    setChats(privateChats);
    setIsLoading(false);
  }, [user]);

  const createChat = useCallback((otherUserId: string) => {
    if (!user) return null;
    
    const chat = layoverStore.createPrivateChat(user.id, otherUserId);
    if (chat) {
      refreshChats();
    }
    return chat;
  }, [user, refreshChats]);

  const sendMessage = useCallback((content: string, receiverId: string) => {
    if (!user) return null;
    
    const message = layoverStore.sendMessage(user.id, content, undefined, receiverId);
    if (message) {
      refreshChats();
    }
    return message;
  }, [user, refreshChats]);

  const setKeepChat = useCallback((chatId: string, keep: boolean) => {
    if (!user) return false;
    
    const success = layoverStore.setKeepChatAfterFlight(chatId, user.id, keep);
    if (success) {
      refreshChats();
    }
    return success;
  }, [user, refreshChats]);

  useEffect(() => {
    refreshChats();
    
    // Refresh chats every 10 seconds
    const interval = setInterval(refreshChats, 10000);
    return () => clearInterval(interval);
  }, [refreshChats]);

  return { 
    chats, 
    isLoading, 
    refreshChats, 
    createChat, 
    sendMessage, 
    setKeepChat 
  };
}

export function useGroupChats() {
  const { user } = useCurrentUser();
  const [chats, setChats] = useState<GroupChat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshChats = useCallback(() => {
    if (!user) return;
    
    setIsLoading(true);
    const groupChats = layoverStore.getGroupChatsForUser(user.id);
    setChats(groupChats);
    setIsLoading(false);
  }, [user]);

  const sendMessage = useCallback((content: string, chatId: string) => {
    if (!user) return null;
    
    const message = layoverStore.sendMessage(user.id, content, chatId);
    if (message) {
      refreshChats();
    }
    return message;
  }, [user, refreshChats]);

  useEffect(() => {
    refreshChats();
    
    // Refresh chats every 10 seconds
    const interval = setInterval(refreshChats, 10000);
    return () => clearInterval(interval);
  }, [refreshChats]);

  return { 
    chats, 
    isLoading, 
    refreshChats, 
    sendMessage 
  };
}

export function useLayoverStore() {
  const [stats, setStats] = useState(layoverStore.getStats());

  const refreshStats = useCallback(() => {
    setStats(layoverStore.getStats());
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshStats, 5000);
    return () => clearInterval(interval);
  }, [refreshStats]);

  return { stats, refreshStats };
}