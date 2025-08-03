import { Button } from "@/components/ui/button";
import { Plane, User, MessageCircle, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b shadow-card-flight sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="h-8 w-8 text-flight-blue animate-flight-float" />
          <h1 className="text-2xl font-bold text-flight-blue">FlightConnect</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-flight-blue transition-colors">
            Descobrir
          </a>
          <a href="#" className="text-foreground hover:text-flight-blue transition-colors">
            Meus Voos
          </a>
          <a href="#" className="text-foreground hover:text-flight-blue transition-colors">
            Conversas
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-flight-blue rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="flight" size="sm">
            Conectar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;