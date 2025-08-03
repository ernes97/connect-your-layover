export interface TravelCode {
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  layoverAirport: string;
  layoverStart: Date;
  layoverEnd: Date;
  layoverCountry: string;
}

export interface UserProfile {
  id: string;
  travelCode: TravelCode;
  nickname: string; // Auto-generated
  age: number;
  gender: 'M' | 'F' | 'Other';
  originCountry: string;
  languages: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId?: string; // For private chats
  groupId?: string; // For group chats
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface PrivateChat {
  id: string;
  participants: [string, string]; // User IDs
  messages: ChatMessage[];
  keepAfterFlight: boolean;
  bothAgreedToKeep: boolean;
  expiresAt: Date;
  layoverAirport: string;
}

export interface GroupChat {
  id: string;
  layoverCountry: string;
  layoverAirport: string;
  participants: string[]; // User IDs
  messages: ChatMessage[];
  expiresAt: Date;
  isActive: boolean;
}

export interface LayoverMatch {
  userId: string;
  matchedUsers: UserProfile[];
  layoverInfo: TravelCode;
}