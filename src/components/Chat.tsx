import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Smile, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  MapPin,
  Languages,
  Shield,
  Clock,
  CheckCheck,
  MessageCircle
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "location" | "system";
  translated?: boolean;
  originalLanguage?: string;
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  flightInfo: string;
  lastSeen?: Date;
  verified: boolean;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [translateEnabled, setTranslateEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatUsers: ChatUser[] = [
    {
      id: "1",
      name: "Maria Costa",
      avatar: "/api/placeholder/50/50",
      status: "online",
      flightInfo: "TAM3054 • GRU → LHR",
      verified: true
    },
    {
      id: "2", 
      name: "João Silva",
      avatar: "/api/placeholder/50/50",
      status: "away",
      flightInfo: "GOL1829 • GRU → MAD",
      lastSeen: new Date(Date.now() - 1000 * 60 * 15),
      verified: true
    },
    {
      id: "3",
      name: "Ana Santos",
      avatar: "/api/placeholder/50/50", 
      status: "offline",
      flightInfo: "LATAM8765 • GRU → CDG",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
      verified: false
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "1",
      content: "Oi! Vi que temos voos similares para Londres. Você já conhece o aeroporto de Heathrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "text"
    },
    {
      id: "2", 
      senderId: "me",
      content: "Olá Maria! Sim, já passei por lá algumas vezes. É bem grande mas tem boa sinalização. Primeira vez em Londres?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      type: "text"
    },
    {
      id: "3",
      senderId: "1", 
      content: "Sim, primeira vez! Estou um pouco nervosa. Quanto tempo você sugere para a conexão?",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      type: "text"
    },
    {
      id: "4",
      senderId: "me",
      content: "Para conexões internacionais eu sempre deixo pelo menos 2 horas. E há muitas lojas e restaurantes para passar o tempo! 😊",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: "text"
    },
    {
      id: "5",
      senderId: "system",
      content: "Maria compartilhou sua localização atual",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), 
      type: "system"
    }
  ]);

  useEffect(() => {
    if (selectedUser && !selectedUser) {
      setSelectedUser(chatUsers[0]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "me",
        content: message,
        timestamp: new Date(),
        type: "text"
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-safety-green";
      case "away": return "bg-warning-amber";
      case "offline": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) {
      return `visto ${minutes}min atrás`;
    } else {
      return `visto ${hours}h atrás`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-flight-blue-dark mb-2">Chat</h1>
          <p className="text-muted-foreground">Converse com outros viajantes de forma segura</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Lista de Conversas */}
          <Card className="shadow-card-flight">
            <CardHeader>
              <CardTitle className="text-flight-blue-dark">Conversas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {chatUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-4 cursor-pointer hover:bg-accent/50 transition-colors border-l-4 ${
                      selectedUser?.id === user.id 
                        ? 'border-flight-blue bg-accent/30' 
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-flight-blue text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-flight-blue-dark truncate">
                            {user.name}
                          </span>
                          {user.verified && (
                            <Shield className="h-3 w-3 text-safety-green" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{user.flightInfo}</div>
                        {user.status === "offline" && user.lastSeen && (
                          <div className="text-xs text-muted-foreground">
                            {formatLastSeen(user.lastSeen)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Área de Chat */}
          <Card className="lg:col-span-2 shadow-card-flight flex flex-col">
            {selectedUser ? (
              <>
                {/* Header do Chat */}
                <CardHeader className="bg-gradient-to-r from-flight-blue to-flight-blue-light text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                          <AvatarFallback className="bg-white text-flight-blue">
                            {selectedUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(selectedUser.status)}`} />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{selectedUser.name}</span>
                          {selectedUser.verified && (
                            <Badge variant="secondary" className="bg-white/20 text-white">
                              <Shield className="h-3 w-3 mr-1" />
                              Verificado
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-white/80">{selectedUser.flightInfo}</div>
                        <div className="text-xs text-white/60">
                          {selectedUser.status === "online" ? "Online agora" : 
                           selectedUser.status === "away" ? "Ausente" : 
                           selectedUser.lastSeen ? formatLastSeen(selectedUser.lastSeen) : "Offline"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() => setTranslateEnabled(!translateEnabled)}
                      >
                        <Languages className={`h-4 w-4 ${translateEnabled ? 'text-warning-amber' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Mensagens */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      {msg.type === "system" ? (
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent rounded-full text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {msg.content}
                            <span className="text-xs">{formatTime(msg.timestamp)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[70%] ${msg.senderId === "me" ? "order-2" : "order-1"}`}>
                            <div className={`p-3 rounded-lg ${
                              msg.senderId === "me" 
                                ? "bg-flight-blue text-white rounded-br-sm" 
                                : "bg-accent text-accent-foreground rounded-bl-sm"
                            }`}>
                              {msg.translated && (
                                <div className="text-xs opacity-70 mb-1 flex items-center gap-1">
                                  <Languages className="h-3 w-3" />
                                  Traduzido do {msg.originalLanguage}
                                </div>
                              )}
                              <div>{msg.content}</div>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs opacity-70">{formatTime(msg.timestamp)}</span>
                                {msg.senderId === "me" && (
                                  <CheckCheck className="h-3 w-3 opacity-70" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input de Mensagem */}
                <div className="p-4 border-t bg-background">
                  {translateEnabled && (
                    <div className="mb-2 text-xs text-muted-foreground flex items-center gap-1">
                      <Languages className="h-3 w-3 text-warning-amber" />
                      Tradução automática ativada
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4" />
                    </Button>
                    
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    
                    <Button 
                      variant="flight" 
                      size="sm"
                      onClick={sendMessage}
                      disabled={!message.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">Selecione uma conversa</h3>
                  <p>Escolha um contato para começar a conversar</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Aviso de Segurança */}
        <Card className="mt-6 bg-accent/30 border-flight-blue/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-safety-green shrink-0" />
              <div className="text-sm">
                <span className="font-semibold text-flight-blue-dark">Lembre-se:</span>
                <span className="text-muted-foreground ml-1">
                  Todas as conversas são monitoradas por IA para sua segurança. 
                  Nunca compartilhe informações pessoais sensíveis ou financeiras.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;