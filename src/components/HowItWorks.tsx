import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Users, 
  MessageCircle, 
  Shield, 
  Plane,
  MapPin,
  CheckCircle,
  ArrowRight,
  Clock,
  Star
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: "Insira Seus Dados de Voo",
      description: "Digite seu número de voo, aeroportos de origem e destino, e data da viagem.",
      details: [
        "Busca automática de informações do voo",
        "Detecção de escalas e conexões",
        "Sincronização com dados de aviação em tempo real"
      ],
      color: "text-flight-blue"
    },
    {
      step: 2,
      icon: Users,
      title: "Encontre Correspondências",
      description: "Nosso algoritmo inteligente encontra pessoas com voos similares e interesses compatíveis.",
      details: [
        "Análise de compatibilidade de horários",
        "Verificação de preferências de viagem",
        "Filtragem por idiomas e interesses"
      ],
      color: "text-flight-blue-light"
    },
    {
      step: 3,
      icon: Shield,
      title: "Verificação de Segurança",
      description: "Todos os usuários passam por verificação rigorosa para garantir sua segurança.",
      details: [
        "Verificação de documentos oficiais",
        "Checagem de antecedentes",
        "Sistema de avaliações e reviews"
      ],
      color: "text-safety-green"
    },
    {
      step: 4,
      icon: MessageCircle,
      title: "Conecte-se e Converse",
      description: "Inicie conversas seguras com chat criptografado e tradução automática.",
      details: [
        "Chat criptografado ponta a ponta",
        "Tradução automática em 50+ idiomas",
        "Compartilhamento de localização opcional"
      ],
      color: "text-flight-blue-dark"
    },
    {
      step: 5,
      icon: MapPin,
      title: "Encontre-se no Aeroporto",
      description: "Use a localização em tempo real para encontrar seus novos amigos de viagem.",
      details: [
        "Localização precisa no aeroporto",
        "Pontos de encontro sugeridos",
        "Notificações de proximidade"
      ],
      color: "text-warning-amber"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Economize Tempo",
      description: "Transforme horas de espera em momentos produtivos e divertidos"
    },
    {
      icon: Star,
      title: "Experiências Únicas",
      description: "Descubra lugares especiais e atividades recomendadas por locais"
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Sistema de verificação rigoroso e monitoramento 24/7"
    },
    {
      icon: Users,
      title: "Conexões Reais",
      description: "Forme amizades duradouras com pessoas que compartilham seus interesses"
    }
  ];

  const safetyFeatures = [
    "Verificação de identidade obrigatória",
    "Histórico de avaliações transparente",
    "Chat moderado por IA",
    "Botão de emergência integrado",
    "Suporte 24/7 em múltiplos idiomas",
    "Geolocalização com privacidade"
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="relative bg-sky-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Como Funciona o 
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              FlightConnect
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Cinco passos simples para transformar suas escalas em experiências incríveis
          </p>
          <Button variant="glow" size="lg" className="text-lg px-8 py-6">
            <Plane className="h-5 w-5 mr-2" />
            Começar Agora
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-flight-blue-dark mb-4">
              Processo Simples e Seguro
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Em apenas alguns minutos, você estará conectado com outros viajantes
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                } mb-16`}>
                  
                  {/* Content */}
                  <div className="flex-1 max-w-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-gradient text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        Passo {step.step}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-flight-blue-dark mb-3">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {step.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-safety-green shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <Card className="w-32 h-32 flex items-center justify-center shadow-card-flight hover:shadow-flight transition-all duration-300 hover:scale-105">
                      <step.icon className={`h-16 w-16 ${step.color}`} />
                    </Card>
                  </div>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center mb-8">
                    <ArrowRight className="h-8 w-8 text-flight-blue/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-flight-blue-dark mb-4">
              Por Que Escolher o FlightConnect?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Benefícios únicos que tornam suas viagens mais seguras e divertidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center shadow-card-flight hover:shadow-flight transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <benefit.icon className="h-12 w-12 text-flight-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-flight-blue-dark mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-flight">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 text-safety-green mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-flight-blue-dark mb-4">
                  Sua Segurança é Nossa Prioridade
                </h2>
                <p className="text-lg text-muted-foreground">
                  Implementamos as mais rigorosas medidas de segurança para proteger nossa comunidade
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {safetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-safety-green shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="flight" size="lg">
                  Saiba Mais Sobre Segurança
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto Para Sua Primeira Conexão?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Junte-se a milhares de viajantes que já descobriram o poder das conexões durante escalas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glow" size="lg" className="text-lg px-8 py-6">
              <Plane className="h-5 w-5 mr-2" />
              Criar Conta Grátis
            </Button>
            <Button variant="flight-outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-flight-blue">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;