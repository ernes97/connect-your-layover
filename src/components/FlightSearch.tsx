import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, MapPin, Plane, Search, Shield } from "lucide-react";
import { TravelCodeForm } from "./TravelCodeForm";

const FlightSearch = () => {
  const [showFullForm, setShowFullForm] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  if (showFullForm) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <TravelCodeForm onSuccess={handleSuccess} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-flight-blue-dark mb-4">
            Encontre Sua Conexão
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conecte-se com outros viajantes durante sua escala
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-card-flight border-0">
          <CardHeader className="bg-gradient-to-r from-flight-blue to-flight-blue-light text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Plane className="h-6 w-6" />
              Layover Connect
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-flight-blue-dark mb-2">
                  Conecte-se Durante Sua Escala
                </h3>
                <p className="text-muted-foreground">
                  Encontre outros viajantes no mesmo aeroporto durante sua escala. 
                  Faça novos amigos, pratique idiomas ou simplesmente tenha uma boa conversa.
                </p>
              </div>

              <div className="bg-accent rounded-lg p-6">
                <h4 className="font-semibold mb-3">Como Funciona:</h4>
                <div className="space-y-2 text-sm text-left">
                  <p>• Insira seus dados de voo e escala</p>
                  <p>• Encontre automaticamente outros viajantes na mesma escala</p>
                  <p>• Converse de forma privada ou em grupos públicos</p>
                  <p>• Todos os chats são apagados 1 hora após o voo</p>
                  <p>• Seus dados pessoais permanecem privados</p>
                </div>
              </div>

              <Button 
                onClick={() => setShowFullForm(true)}
                size="lg" 
                className="px-12 py-6 text-lg bg-flight-blue hover:bg-flight-blue-dark"
              >
                <Search className="h-5 w-5 mr-2" />
                Começar a Conectar
              </Button>

              <div className="p-4 bg-accent rounded-lg">
                <p className="text-sm text-accent-foreground">
                  <Shield className="inline h-4 w-4 mr-1 text-safety-green" />
                  Seus dados são protegidos e apenas informações básicas são compartilhadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FlightSearch;