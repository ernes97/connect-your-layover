import { UserProfile, TravelCode, PrivateChat, GroupChat, ChatMessage, LayoverMatch } from '../types';
import { generateUniqueNickname } from '../utils/nicknameGenerator';
import { v4 as uuidv4 } from 'uuid';

class LayoverStore {
  private users: Map<string, UserProfile> = new Map();
  private privateChats: Map<string, PrivateChat> = new Map();
  private groupChats: Map<string, GroupChat> = new Map();
  private layoverMatches: Map<string, LayoverMatch> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startCleanupTimer();
  }

  // User Management
  createUser(
    firstName: string,
    age: number,
    gender: 'M' | 'F' | 'Other',
    originCountry: string,
    languages: string[],
    travelCode: TravelCode
  ): UserProfile {
    const existingNicknames = Array.from(this.users.values()).map(user => user.nickname);
    
    const user: UserProfile = {
      id: uuidv4(),
      travelCode,
      nickname: generateUniqueNickname({
        firstName,
        age,
        gender,
        originCountry,
        existingNicknames
      }),
      age,
      gender,
      originCountry,
      languages,
      isActive: true,
      createdAt: new Date()
    };

    this.users.set(user.id, user);
    this.findLayoverMatches(user);
    this.joinOrCreateGroupChat(user);
    
    return user;
  }

  getUser(userId: string): UserProfile | undefined {
    return this.users.get(userId);
  }

  getUserByNickname(nickname: string): UserProfile | undefined {
    return Array.from(this.users.values()).find(user => user.nickname === nickname);
  }

  // Layover Matching Algorithm
  private findLayoverMatches(user: UserProfile): void {
    const matches: UserProfile[] = [];
    
    for (const [_, otherUser] of this.users) {
      if (otherUser.id === user.id || !otherUser.isActive) continue;
      
      // Check if users have layover in the same airport
      if (user.travelCode.layoverAirport === otherUser.travelCode.layoverAirport) {
        // Check if layover times overlap
        const userStart = user.travelCode.layoverStart.getTime();
        const userEnd = user.travelCode.layoverEnd.getTime();
        const otherStart = otherUser.travelCode.layoverStart.getTime();
        const otherEnd = otherUser.travelCode.layoverEnd.getTime();
        
        // Check for time overlap
        if (userStart < otherEnd && userEnd > otherStart) {
          matches.push(otherUser);
        }
      }
    }

    const layoverMatch: LayoverMatch = {
      userId: user.id,
      matchedUsers: matches,
      layoverInfo: user.travelCode
    };

    this.layoverMatches.set(user.id, layoverMatch);
  }

  getLayoverMatches(userId: string): LayoverMatch | undefined {
    return this.layoverMatches.get(userId);
  }

  // Group Chat Management
  private joinOrCreateGroupChat(user: UserProfile): void {
    const groupKey = `${user.travelCode.layoverCountry}_${user.travelCode.layoverAirport}`;
    let groupChat = Array.from(this.groupChats.values())
      .find(chat => chat.layoverCountry === user.travelCode.layoverCountry && 
                   chat.layoverAirport === user.travelCode.layoverAirport &&
                   chat.isActive);

    if (!groupChat) {
      groupChat = {
        id: uuidv4(),
        layoverCountry: user.travelCode.layoverCountry,
        layoverAirport: user.travelCode.layoverAirport,
        participants: [user.id],
        messages: [],
        expiresAt: user.travelCode.layoverEnd,
        isActive: true
      };
      this.groupChats.set(groupChat.id, groupChat);
    } else {
      if (!groupChat.participants.includes(user.id)) {
        groupChat.participants.push(user.id);
      }
    }
  }

  getGroupChatsForUser(userId: string): GroupChat[] {
    return Array.from(this.groupChats.values())
      .filter(chat => chat.participants.includes(userId) && chat.isActive);
  }

  // Private Chat Management
  createPrivateChat(user1Id: string, user2Id: string): PrivateChat | null {
    const user1 = this.users.get(user1Id);
    const user2 = this.users.get(user2Id);
    
    if (!user1 || !user2) return null;
    
    // Check if users are in the same layover
    if (user1.travelCode.layoverAirport !== user2.travelCode.layoverAirport) {
      return null;
    }

    // Check if chat already exists
    const existingChat = Array.from(this.privateChats.values())
      .find(chat => 
        (chat.participants[0] === user1Id && chat.participants[1] === user2Id) ||
        (chat.participants[0] === user2Id && chat.participants[1] === user1Id)
      );

    if (existingChat) return existingChat;

    // Calculate expiration time (1 hour after the earliest flight departure)
    const earliestDeparture = new Date(Math.min(
      user1.travelCode.layoverEnd.getTime(),
      user2.travelCode.layoverEnd.getTime()
    ));
    const expiresAt = new Date(earliestDeparture.getTime() + (60 * 60 * 1000)); // +1 hour

    const privateChat: PrivateChat = {
      id: uuidv4(),
      participants: [user1Id, user2Id],
      messages: [],
      keepAfterFlight: false,
      bothAgreedToKeep: false,
      expiresAt,
      layoverAirport: user1.travelCode.layoverAirport
    };

    this.privateChats.set(privateChat.id, privateChat);
    return privateChat;
  }

  getPrivateChatsForUser(userId: string): PrivateChat[] {
    return Array.from(this.privateChats.values())
      .filter(chat => chat.participants.includes(userId));
  }

  // Message Management
  sendMessage(
    senderId: string,
    content: string,
    chatId?: string,
    receiverId?: string
  ): ChatMessage | null {
    const message: ChatMessage = {
      id: uuidv4(),
      senderId,
      content,
      timestamp: new Date(),
      isRead: false,
      ...(receiverId && { receiverId }),
      ...(chatId && { groupId: chatId })
    };

    if (chatId) {
      // Group message
      const groupChat = this.groupChats.get(chatId);
      if (groupChat && groupChat.participants.includes(senderId)) {
        groupChat.messages.push(message);
        return message;
      }
    } else if (receiverId) {
      // Private message
      const privateChat = Array.from(this.privateChats.values())
        .find(chat => chat.participants.includes(senderId) && chat.participants.includes(receiverId));
      
      if (privateChat) {
        privateChat.messages.push(message);
        return message;
      }
    }

    return null;
  }

  // Chat Preservation
  setKeepChatAfterFlight(chatId: string, userId: string, keep: boolean): boolean {
    const chat = this.privateChats.get(chatId);
    if (!chat || !chat.participants.includes(userId)) return false;

    const otherUserId = chat.participants.find(id => id !== userId);
    if (!otherUserId) return false;

    if (keep) {
      chat.keepAfterFlight = true;
      
      // Check if both users want to keep the chat
      const otherUserKeeps = true; // This would be checked from UI state
      if (otherUserKeeps) {
        chat.bothAgreedToKeep = true;
      }
    } else {
      // If one user doesn't want to keep it, delete the chat
      this.privateChats.delete(chatId);
    }

    return true;
  }

  // Cleanup System
  private startCleanupTimer(): void {
    // Run cleanup every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredData();
    }, 60 * 1000);
  }

  private cleanupExpiredData(): void {
    const now = new Date();

    // Clean up expired private chats
    for (const [chatId, chat] of this.privateChats) {
      if (now > chat.expiresAt && (!chat.keepAfterFlight || !chat.bothAgreedToKeep)) {
        this.privateChats.delete(chatId);
      }
    }

    // Clean up expired group chats
    for (const [chatId, chat] of this.groupChats) {
      if (now > chat.expiresAt) {
        this.groupChats.delete(chatId);
      }
    }

    // Clean up inactive users (after their layover ends)
    for (const [userId, user] of this.users) {
      if (now > user.travelCode.layoverEnd) {
        user.isActive = false;
        this.layoverMatches.delete(userId);
      }
    }
  }

  // Clean up when store is destroyed
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }

  // Get stats for debugging
  getStats() {
    return {
      activeUsers: Array.from(this.users.values()).filter(u => u.isActive).length,
      totalUsers: this.users.size,
      privateChats: this.privateChats.size,
      groupChats: this.groupChats.size,
      layoverMatches: this.layoverMatches.size
    };
  }
}

export const layoverStore = new LayoverStore();