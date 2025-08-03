import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Lock,
  Phone,
  FileCheck,
  UserCheck,
  Clock,
  MessageSquare,
  MapPin,
  Globe
} from "lucide-react";

const Safety = () => {
  const verificationSteps = [
    {
      icon: FileCheck,
      title: "Verificação de Documentos",
      description: "Validação de identidade com documentos oficiais",
      status: "Obrigatório",
      details: [
        "Upload de documento com foto oficial",
        "Verificação de autenticidade em tempo real",
        "Confirmação de dados pessoais",
        "Processo 100% automatizado e seguro"
      ]
    },
    {
      icon: UserCheck,
      title: "Histórico de Viagens",
      description: "Confirmação de experiência em viagens",
      status: "Recomendado",
      details: [
        "Histórico de voos anteriores",
        "Verificação com companhias aéreas",
        "Confirmação de frequência de viagens",
        "Badge de viajante experiente"
      ]
    },
    {
      icon: Phone,
      title: "Verificação de Contato",
      description: "Confirmação de telefone e email",
      status: "Obrigatório",
      details: [
        "SMS de verificação",
        "Confirmação de email ativo",
        "Teste de conectividade",
        "Contato de emergência opcional"
      ]
    }
  ];

  const safetyFeatures = [
    {
      icon: Eye,
      title: "Monitoramento 24/7",
      description: "Nossa equipe monitora atividades suspeitas continuamente",
      features: [
        "Análise comportamental por IA",
        "Detecção de padrões anômalos",
        "Intervenção imediata quando necessário",
        "Equipe de segurança especializada"
      ]
    },
    {
      icon: Lock,
      title: "Criptografia Total",
      description: "Todas as comunicações são protegidas com criptografia ponta a ponta",
      features: [
        "Mensagens criptografadas",
        "Dados pessoais protegidos",
        "Localização anonimizada",
        "Conformidade com LGPD/GDPR"
      ]
    },
    {
      icon: MessageSquare,
      title: "Chat Moderado",
      description: "IA avançada monitora conversas para prevenir comportamentos inadequados",
      features: [
        "Detecção de linguagem inadequada",
        "Prevenção de spam e golpes",
        "Alertas automáticos",
        "Revisão humana quando necessário"
      ]
    },
    {
      icon: MapPin,
      title: "Privacidade de Localização",
      description: "Sua localização é compartilhada apenas quando você escolher",
      features: [
        "Controle total sobre compartilhamento",
        "Localização aproximada por padrão",
        "Modo anônimo disponível",
        "Histórico deletado automaticamente"
      ]
    }
  ];

  const emergencyFeatures = [
    {
      title: "Botão de Emergência",
      description: "Acesso direto à ajuda com um toque",
      icon: AlertTriangle
    },
    {
      title: "Contatos de Emergência",
      description: "Notificação automática de pessoas próximas",
      icon: Phone
    },
    {
      title: "Localização de Emergência",
      description: "Compartilhamento de localização precisa com autoridades",
      icon: MapPin
    },
    {
      title: "Suporte Multilíngue",
      description: "Assistência em mais de 20 idiomas",
      icon: Globe
    }
  ];

  const communityGuidelines = [
    "Trate todos os usuários com respeito e cortesia",
    "Compartilhe apenas informações verdadeiras sobre você",
    "Não solicite ou forneça informações financeiras",
    "Relate qualquer comportamento suspeito imediatamente",
    "Encontre-se sempre em locais públicos e movimentados",
    "Mantenha amigos ou familiares informados sobre seus planos",
    "Use o chat da plataforma para comunicação inicial",
    "Confie em seus instintos - se algo parecer errado, afaste-se"
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="relative bg-sky-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-20 w-20 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Segurança em 
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Primeiro Lugar
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Implementamos as mais rigorosas medidas de segurança para proteger nossa comunidade de viajantes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glow" size="lg" className="text-lg px-8 py-6">
              Ver Relatório de Segurança
            </Button>
            <Button variant="flight-outline" size="lg" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-flight-blue">
              Central de Ajuda
            </Button>
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-flight-blue-dark mb-4">
              Processo de Verificação Rigoroso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada usuário passa por um processo completo de verificação antes de poder usar a plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {verificationSteps.map((step, index) => (
              <Card key={index} className="shadow-card-flight hover:shadow-flight transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <step.icon className="h-10 w-10 text-flight-blue" />
                    <Badge 
                      variant={step.status === "Obrigatório" ? "destructive" : "secondary"}
                      className={step.status === "Obrigatório" ? "bg-flight-blue text-white" : ""}
                    >
                      {step.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-flight-blue-dark">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-safety-green shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-flight-blue-dark mb-4">
              Recursos de Segurança Avançados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnologia de ponta para garantir sua proteção em todas as interações
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="shadow-card-flight">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <feature.icon className="h-8 w-8 text-flight-blue shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-flight-blue-dark mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-safety-green shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <AlertTriangle className="h-16 w-16 text-warning-amber mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-flight-blue-dark mb-4">
              Recursos de Emergência
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas imediatas para situações que requerem ajuda urgente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {emergencyFeatures.map((feature, index) => (
              <Card key={index} className="text-center shadow-card-flight hover:shadow-flight transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-warning-amber mx-auto mb-4" />
                  <h3 className="font-semibold text-flight-blue-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto bg-warning-amber/10 border-warning-amber/30">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-warning-amber mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-flight-blue-dark mb-2">
                Em Caso de Emergência
              </h3>
              <p className="text-muted-foreground mb-4">
                Pressione e segure o botão de emergência por 3 segundos para ativar nossa resposta de emergência
              </p>
              <Button variant="outline" className="border-warning-amber text-warning-amber hover:bg-warning-amber hover:text-white">
                Testar Botão de Emergência
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-flight-blue-dark mb-4">
                Diretrizes da Comunidade
              </h2>
              <p className="text-lg text-muted-foreground">
                Juntos, criamos um ambiente seguro e acolhedor para todos os viajantes
              </p>
            </div>

            <Card className="shadow-flight">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {communityGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-safety-green shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{guideline}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-accent rounded-lg text-center">
                  <Shield className="h-8 w-8 text-flight-blue mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-flight-blue-dark mb-2">
                    Comprometimento com a Segurança
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Nossa equipe trabalha 24/7 para manter nossa comunidade segura. 
                    Qualquer violação das diretrizes resultará em ação imediata.
                  </p>
                  <Button variant="flight">
                    Reportar Problema
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-sky-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossa Segurança em Números
            </h2>
            <p className="text-xl text-white/90">
              Dados que comprovam nosso comprometimento com sua segurança
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-white/80">Taxa de Satisfação de Segurança</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">&lt;1min</div>
              <div className="text-white/80">Tempo de Resposta de Emergência</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80">Usuários Verificados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Monitoramento Ativo</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Safety;