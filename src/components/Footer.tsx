import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plane, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-flight-blue-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-primary-glow" />
              <h3 className="text-2xl font-bold">FlightConnect</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Conectando viajantes ao redor do mundo durante escalas de voos, 
              criando experiências únicas e seguras.
            </p>
            <div className="flex gap-4">
              <Button variant="flight-outline" size="sm" className="text-white border-white hover:bg-white hover:text-flight-blue">
                Download iOS
              </Button>
              <Button variant="flight-outline" size="sm" className="text-white border-white hover:bg-white hover:text-flight-blue">
                Download Android
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Segurança</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Preços</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Suporte</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Diretrizes da Comunidade</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Relatório de Transparência</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                contato@flightconnect.com
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                +55 (11) 99999-0000
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                São Paulo, Brasil
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="font-medium mb-2">Newsletter</h5>
              <p className="text-sm text-white/80 mb-3">
                Receba updates sobre novas funcionalidades
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu email"
                  className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-primary-glow"
                />
                <Button variant="glow" size="sm">
                  Inscrever
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 FlightConnect. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              Português
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              English
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              Español
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;