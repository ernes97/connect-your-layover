import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plane, 
  Users, 
  MessageCircle, 
  Calendar,
  MapPin,
  Clock,
  Star,
  AlertCircle,
  Bell
} from "lucide-react";

const Dashboard = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: "match",
      title: "Nova Conexão Encontrada!",
      message: "Maria Costa tem voo similar ao seu para Londres",
      time: "2 min atrás",
      unread: true
    },
    {
      id: 2,
      type: "message",
      title: "Nova Mensagem",
      message: "João enviou uma mensagem sobre o encontro no aeroporto",
      time: "1h atrás",
      unread: true
    },
    {
      id: 3,
      type: "flight",
      title: "Lembrete de Voo",
      message: "Seu voo para Madrid é amanhã às 14:30",
      time: "3h atrás",
      unread: false
    }
  ]);

  const activeConnections = [
    {
      id: 1,
      name: "Maria Costa",
      avatar: "/api/placeholder/50/50",
      flight: "TAM3054",
      destination: "Londres",
      date: "15 Jan",
      status: "confirmed",
      rating: 4.9
    },
    {
      id: 2,
      name: "João Silva",
      avatar: "/api/placeholder/50/50",
      flight: "GOL1829",
      destination: "Madrid",
      date: "18 Jan",
      status: "pending",
      rating: 4.7
    },
    {
      id: 3,
      name: "Ana Santos",
      avatar: "/api/placeholder/50/50",
      flight: "LATAM8765",
      destination: "Paris",
      date: "22 Jan",
      status: "confirmed",
      rating: 5.0
    }
  ];

  const upcomingFlights = [
    {
      id: 1,
      flightNumber: "TAM3054",
      from: "GRU",
      to: "LHR",
      departure: "2024-01-15T14:30:00",
      status: "on-time",
      connections: 2
    },
    {
      id: 2,
      flightNumber: "GOL1829",
      from: "GRU",
      to: "MAD",
      departure: "2024-01-18T08:15:00",
      status: "delayed",
      connections: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-safety-green text-white";
      case "pending": return "bg-warning-amber text-white";
      case "on-time": return "bg-safety-green text-white";
      case "delayed": return "bg-destructive text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "match": return Users;
      case "message": return MessageCircle;
      case "flight": return Plane;
      default: return Bell;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-flight-blue-dark mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Gerencie suas conexões e acompanhe seus voos</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Próximos Voos */}
          <Card className="shadow-card-flight">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-flight-blue-dark">
                <Plane className="h-5 w-5" />
                Próximos Voos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingFlights.map((flight) => (
                  <div key={flight.id} className="p-4 border rounded-lg bg-gradient-to-r from-accent/30 to-accent/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-flight-blue">
                          {flight.flightNumber}
                        </div>
                        <Badge className={getStatusColor(flight.status)}>
                          {flight.status === "on-time" ? "No Horário" : "Atrasado"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(flight.departure).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-semibold text-flight-blue-dark">{flight.from}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(flight.departure).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </div>
                        </div>
                        <Plane className="h-4 w-4 text-flight-blue rotate-90" />
                        <div className="text-center">
                          <div className="font-semibold text-flight-blue-dark">{flight.to}</div>
                          <div className="text-sm text-muted-foreground">Chegada</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium text-flight-blue">
                          {flight.connections} {flight.connections === 1 ? "conexão" : "conexões"}
                        </div>
                        <Button variant="flight-outline" size="sm" className="mt-1">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conexões Ativas */}
          <Card className="shadow-card-flight">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-flight-blue-dark">
                <Users className="h-5 w-5" />
                Conexões Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={connection.avatar} alt={connection.name} />
                        <AvatarFallback className="bg-flight-blue text-white">
                          {connection.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="font-semibold text-flight-blue-dark">{connection.name}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{connection.flight}</span>
                          <span>•</span>
                          <span>{connection.destination}</span>
                          <span>•</span>
                          <span>{connection.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-warning-amber text-warning-amber" />
                          <span className="text-xs text-muted-foreground">{connection.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(connection.status)}>
                        {connection.status === "confirmed" ? "Confirmado" : "Pendente"}
                      </Badge>
                      <Button variant="flight-outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notificações */}
          <Card className="shadow-card-flight">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-flight-blue-dark">
                <Bell className="h-5 w-5" />
                Notificações
                {notifications.filter(n => n.unread).length > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {notifications.filter(n => n.unread).length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg border cursor-pointer hover:bg-accent/30 transition-colors ${
                        notification.unread ? 'bg-accent/20 border-flight-blue/30' : 'bg-background'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-4 w-4 text-flight-blue mt-1 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-flight-blue-dark">
                            {notification.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </div>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-flight-blue rounded-full mt-2 shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-card-flight">
            <CardHeader>
              <CardTitle className="text-flight-blue-dark">Estatísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Voos este mês</span>
                  <span className="font-bold text-flight-blue">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Novas conexões</span>
                  <span className="font-bold text-flight-blue">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mensagens trocadas</span>
                  <span className="font-bold text-flight-blue">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avaliação média</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warning-amber text-warning-amber" />
                    <span className="font-bold text-flight-blue">4.8</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;