import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, MapPin, Plane, Search, Shield } from "lucide-react";

const FlightSearch = () => {
  const [flightData, setFlightData] = useState({
    flightNumber: "",
    departure: "",
    arrival: "",
    date: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFlightData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-flight-blue-dark mb-4">
            Encontre Sua Conexão
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insira seus dados de voo e descubra quem está voando com você
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-card-flight border-0">
          <CardHeader className="bg-gradient-to-r from-flight-blue to-flight-blue-light text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Plane className="h-6 w-6" />
              Seus Dados de Voo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="flightNumber" className="text-flight-blue-dark font-medium">
                    Número do Voo
                  </Label>
                  <Input
                    id="flightNumber"
                    placeholder="Ex: TAM3054"
                    value={flightData.flightNumber}
                    onChange={(e) => handleInputChange("flightNumber", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="departure" className="text-flight-blue-dark font-medium">
                    Aeroporto de Partida
                  </Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="departure"
                      placeholder="Ex: GRU - São Paulo"
                      value={flightData.departure}
                      onChange={(e) => handleInputChange("departure", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="arrival" className="text-flight-blue-dark font-medium">
                    Aeroporto de Destino
                  </Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="arrival"
                      placeholder="Ex: JFK - Nova York"
                      value={flightData.arrival}
                      onChange={(e) => handleInputChange("arrival", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="date" className="text-flight-blue-dark font-medium">
                    Data do Voo
                  </Label>
                  <div className="relative mt-2">
                    <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={flightData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="flight" size="lg" className="px-12 py-6 text-lg">
                <Search className="h-5 w-5 mr-2" />
                Buscar Conexões
              </Button>
            </div>

            <div className="mt-6 p-4 bg-accent rounded-lg">
              <p className="text-sm text-accent-foreground text-center">
                <Shield className="inline h-4 w-4 mr-1 text-safety-green" />
                Seus dados são protegidos e só serão compartilhados com usuários verificados
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FlightSearch;