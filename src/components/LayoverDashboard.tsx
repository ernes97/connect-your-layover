import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plane, Clock, MapPin, Users, MessageCircle, Globe, 
  User, Languages, Timer, UserPlus 
} from 'lucide-react';
import { useCurrentUser, useLayoverMatches, usePrivateChats, useGroupChats } from '../hooks/useLayoverStore';
import { formatDistanceToNow } from 'date-fns';

export function LayoverDashboard() {
  const { user } = useCurrentUser();
  const { matches, isLoading: matchesLoading } = useLayoverMatches();
  const { chats: privateChats, createChat } = usePrivateChats();
  const { chats: groupChats } = useGroupChats();
  const [selectedTab, setSelectedTab] = useState('matches');

  if (!user) return null;

  const layoverTimeRemaining = user.travelCode.layoverEnd.getTime() - new Date().getTime();
  const timeRemainingText = layoverTimeRemaining > 0 
    ? formatDistanceToNow(user.travelCode.layoverEnd)
    : 'Layover ended';

  const handleStartChat = (otherUserId: string) => {
    createChat(otherUserId);
    setSelectedTab('private-chats');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* User Info Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 bg-blue-100">
                <AvatarFallback className="text-blue-700 text-xl font-bold">
                  {user.nickname.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.nickname}</h2>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {user.age}y, {user.gender === 'M' ? 'Male' : user.gender === 'F' ? 'Female' : 'Other'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {user.originCountry}
                  </span>
                  <span className="flex items-center gap-1">
                    <Languages className="w-4 h-4" />
                    {user.languages.join(', ')}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Timer className="w-5 h-5 text-blue-600" />
                {timeRemainingText}
              </div>
              <p className="text-sm text-muted-foreground">remaining in layover</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flight Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Flight Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold">{user.travelCode.departureAirport}</div>
              <div className="text-sm text-muted-foreground">Departure</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">{user.travelCode.layoverAirport}</div>
              <div className="text-sm text-muted-foreground">Layover in {user.travelCode.layoverCountry}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{user.travelCode.arrivalAirport}</div>
              <div className="text-sm text-muted-foreground">Final Destination</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">{user.travelCode.flightNumber}</div>
              <div className="text-sm text-muted-foreground">Flight Number</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="matches" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Travelers ({matches?.matchedUsers.length || 0})
          </TabsTrigger>
          <TabsTrigger value="private-chats" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Private Chats ({privateChats.length})
          </TabsTrigger>
          <TabsTrigger value="group-chats" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Group Chats ({groupChats.length})
          </TabsTrigger>
        </TabsList>

        {/* Layover Matches Tab */}
        <TabsContent value="matches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Travelers in {user.travelCode.layoverAirport}</CardTitle>
              <CardDescription>
                Connect with fellow travelers during your layover
              </CardDescription>
            </CardHeader>
            <CardContent>
              {matchesLoading ? (
                <div className="text-center py-8">Loading travelers...</div>
              ) : matches?.matchedUsers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No other travelers found at {user.travelCode.layoverAirport} during your layover.</p>
                  <p className="text-sm mt-2">Check back later as more travelers join!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {matches?.matchedUsers.map(traveler => (
                    <div key={traveler.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 bg-green-100">
                          <AvatarFallback className="text-green-700 font-bold">
                            {traveler.nickname.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{traveler.nickname}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{traveler.age}y, {traveler.gender === 'M' ? 'Male' : traveler.gender === 'F' ? 'Female' : 'Other'}</span>
                            <span className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {traveler.originCountry}
                            </span>
                            <span className="flex items-center gap-1">
                              <Languages className="w-3 h-3" />
                              {traveler.languages.slice(0, 2).join(', ')}
                              {traveler.languages.length > 2 && '...'}
                            </span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {traveler.languages.map(lang => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleStartChat(traveler.id)}
                        className="flex items-center gap-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        Start Chat
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Private Chats Tab */}
        <TabsContent value="private-chats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Private Conversations</CardTitle>
              <CardDescription>
                Your one-on-one conversations with other travelers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {privateChats.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No private conversations yet.</p>
                  <p className="text-sm mt-2">Start a chat with a traveler from the Travelers tab!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {privateChats.map(chat => {
                    const otherUserId = chat.participants.find(id => id !== user.id);
                    const lastMessage = chat.messages[chat.messages.length - 1];
                    const timeUntilExpiry = chat.expiresAt.getTime() - new Date().getTime();
                    
                    return (
                      <div key={chat.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Private Chat</h3>
                          <Badge variant={timeUntilExpiry > 0 ? "default" : "destructive"}>
                            {timeUntilExpiry > 0 
                              ? `Expires in ${formatDistanceToNow(chat.expiresAt)}`
                              : 'Expired'
                            }
                          </Badge>
                        </div>
                        {lastMessage && (
                          <div className="text-sm text-muted-foreground">
                            Last message: "{lastMessage.content.substring(0, 50)}
                            {lastMessage.content.length > 50 ? '...' : ''}"
                          </div>
                        )}
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Open Chat
                          </Button>
                          {timeUntilExpiry > 0 && (
                            <Button size="sm" variant="outline">
                              Keep After Flight
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Group Chats Tab */}
        <TabsContent value="group-chats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Group Conversations</CardTitle>
              <CardDescription>
                Public chats for travelers in {user.travelCode.layoverCountry}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {groupChats.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No group chats available.</p>
                  <p className="text-sm mt-2">Groups are automatically created when multiple travelers are in the same country.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {groupChats.map(chat => {
                    const lastMessage = chat.messages[chat.messages.length - 1];
                    
                    return (
                      <div key={chat.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">
                            {chat.layoverCountry} - {chat.layoverAirport}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {chat.participants.length} travelers
                            </Badge>
                            <Badge variant="outline">
                              <MapPin className="w-3 h-3 mr-1" />
                              {chat.layoverAirport}
                            </Badge>
                          </div>
                        </div>
                        {lastMessage && (
                          <div className="text-sm text-muted-foreground">
                            Last message: "{lastMessage.content.substring(0, 50)}
                            {lastMessage.content.length > 50 ? '...' : ''}"
                          </div>
                        )}
                        <Button size="sm" variant="outline" className="mt-3">
                          Join Conversation
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}