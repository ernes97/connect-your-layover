import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  MapPin, 
  Plane, 
  Star, 
  Shield, 
  Edit,
  Camera,
  Languages,
  Calendar
} from "lucide-react";

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Ana Silva",
    email: "ana.silva@email.com",
    bio: "Viajante apaixonada, sempre em busca de novas conexões e experiências.",
    location: "São Paulo, Brasil",
    languages: ["Português", "Inglês", "Espanhol"],
    flightCount: 47,
    rating: 4.8,
    verified: true,
    joinDate: "2023"
  });

  const achievements = [
    { icon: Plane, title: "Frequent Flyer", desc: "50+ voos conectados" },
    { icon: Star, title: "Top Rated", desc: "5.0 rating médio" },
    { icon: Shield, title: "Verificado", desc: "Perfil 100% verificado" },
    { icon: Languages, title: "Poliglota", desc: "3+ idiomas" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header do Perfil */}
        <Card className="mb-8 shadow-card-flight">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/api/placeholder/150/150" alt={userProfile.name} />
                  <AvatarFallback className="text-2xl bg-flight-blue text-white">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="flight"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-flight-blue-dark flex items-center gap-2">
                      {userProfile.name}
                      {userProfile.verified && (
                        <Badge variant="secondary" className="bg-safety-green text-white">
                          <Shield className="h-3 w-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {userProfile.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Membro desde {userProfile.joinDate}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant={editing ? "outline" : "flight"}
                    onClick={() => setEditing(!editing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editing ? "Cancelar" : "Editar Perfil"}
                  </Button>
                </div>

                <p className="text-muted-foreground mt-4">{userProfile.bio}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {userProfile.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="bg-accent text-accent-foreground">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Estatísticas */}
          <Card className="shadow-card-flight">
            <CardHeader>
              <CardTitle className="text-flight-blue-dark">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Voos Conectados</span>
                  <span className="font-bold text-flight-blue">{userProfile.flightCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avaliação</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning-amber text-warning-amber" />
                    <span className="font-bold text-flight-blue">{userProfile.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Conexões Feitas</span>
                  <span className="font-bold text-flight-blue">127</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conquistas */}
          <Card className="md:col-span-2 shadow-card-flight">
            <CardHeader>
              <CardTitle className="text-flight-blue-dark">Conquistas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                    <achievement.icon className="h-8 w-8 text-flight-blue" />
                    <div>
                      <h4 className="font-semibold text-flight-blue-dark">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formulário de Edição */}
        {editing && (
          <Card className="mt-6 shadow-card-flight">
            <CardHeader>
              <CardTitle className="text-flight-blue-dark">Editar Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={userProfile.location}
                    onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                  placeholder="Conte um pouco sobre você e seus interesses de viagem..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditing(false)}>
                  Cancelar
                </Button>
                <Button variant="flight" onClick={() => setEditing(false)}>
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserProfile;