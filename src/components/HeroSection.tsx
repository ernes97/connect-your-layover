import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plane, Users, Shield, MessageCircle } from "lucide-react";
import flightHeroImage from "@/assets/flight-hero.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-sky-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-flight-blue/10 to-flight-blue-light/20"></div>
      <div 
        className="absolute right-0 top-1/4 w-96 h-96 opacity-20 animate-flight-float"
        style={{
          backgroundImage: `url(${flightHeroImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Conecte-se Durante
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Suas Escalas
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Transforme suas escalas em experiências incríveis. Encontre pessoas com voos similares, 
            compartilhe atividades e viaje com segurança.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="glow" size="lg" className="text-lg px-8 py-6">
              <Plane className="h-5 w-5 mr-2" />
              Começar Agora
            </Button>
            <Button variant="flight-outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-flight-blue">
              Saiba Mais
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-card-flight hover:shadow-flight transition-all duration-300 hover:-translate-y-2">
              <Users className="h-8 w-8 text-flight-blue mb-4 mx-auto" />
              <h3 className="font-semibold text-flight-blue-dark mb-2">Conexões Seguras</h3>
              <p className="text-sm text-muted-foreground">
                Encontre pessoas verificadas com itinerários similares
              </p>
            </Card>

            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-card-flight hover:shadow-flight transition-all duration-300 hover:-translate-y-2">
              <Shield className="h-8 w-8 text-safety-green mb-4 mx-auto" />
              <h3 className="font-semibold text-flight-blue-dark mb-2">Total Segurança</h3>
              <p className="text-sm text-muted-foreground">
                Sistema de verificação e monitoramento 24/7
              </p>
            </Card>

            <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-card-flight hover:shadow-flight transition-all duration-300 hover:-translate-y-2">
              <MessageCircle className="h-8 w-8 text-flight-blue mb-4 mx-auto" />
              <h3 className="font-semibold text-flight-blue-dark mb-2">Chat Integrado</h3>
              <p className="text-sm text-muted-foreground">
                Comunicação fácil com tradução automática
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;