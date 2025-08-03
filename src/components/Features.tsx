import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageCircle, 
  Shield, 
  MapPin, 
  Calendar, 
  Star,
  Globe,
  Heart,
  Coffee
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Correspondência Inteligente",
      description: "Nosso algoritmo conecta você com pessoas que têm itinerários similares e interesses compatíveis.",
      badge: "Popular",
      color: "text-flight-blue"
    },
    {
      icon: MessageCircle,
      title: "Chat Multilíngue",
      description: "Converse sem barreiras com tradução automática em tempo real para mais de 50 idiomas.",
      badge: "Novo",
      color: "text-flight-blue-light"
    },
    {
      icon: Shield,
      title: "Segurança 24/7",
      description: "Verificação de identidade rigorosa e monitoramento contínuo para sua tranquilidade.",
      badge: "Essencial",
      color: "text-safety-green"
    },
    {
      icon: MapPin,
      title: "Localização em Tempo Real",
      description: "Encontre outros usuários próximos no aeroporto com nosso sistema de geolocalização preciso.",
      color: "text-flight-blue-dark"
    },
    {
      icon: Calendar,
      title: "Planejamento de Atividades",
      description: "Organize eventos, refeições e atividades compartilhadas durante suas escalas.",
      color: "text-flight-blue"
    },
    {
      icon: Star,
      title: "Sistema de Avaliações",
      description: "Construa sua reputação e confie em outros viajantes através do nosso sistema de reviews.",
      color: "text-warning-amber"
    },
    {
      icon: Globe,
      title: "Rede Global",
      description: "Conecte-se em mais de 500 aeroportos ao redor do mundo com nossa comunidade crescente.",
      color: "text-flight-blue-light"
    },
    {
      icon: Coffee,
      title: "Experiências Únicas",
      description: "Descubra restaurants, lounges e atividades especiais recomendadas por outros viajantes.",
      color: "text-flight-blue-dark"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-flight-blue-dark mb-6">
            Por que Escolher o FlightConnect?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa para transformar suas viagens em experiências sociais inesquecíveis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-flight transition-all duration-300 hover:-translate-y-2 border-0 shadow-card-flight bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <feature.icon className={`h-12 w-12 ${feature.color} mx-auto group-hover:scale-110 transition-transform duration-300`} />
                  {feature.badge && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 text-xs bg-flight-blue text-white"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-flight-blue-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-sky-gradient text-white border-0 shadow-flight">
            <CardContent className="p-8">
              <Heart className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-4">Junte-se à Nossa Comunidade</h3>
              <p className="text-lg mb-6 text-white/90">
                Mais de 50.000 viajantes já descobriram o poder das conexões durante escalas
              </p>
              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-white/80">Usuários Ativos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-white/80">Aeroportos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8★</div>
                  <div className="text-white/80">Avaliação</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;