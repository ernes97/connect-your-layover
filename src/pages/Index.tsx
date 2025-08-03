import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FlightSearch from "@/components/FlightSearch";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { DemoData } from "@/components/DemoData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FlightSearch />
      <div className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-flight-blue-dark mb-2">
              Test the System
            </h2>
            <p className="text-muted-foreground">
              Add demo users to see how the layover matching works
            </p>
          </div>
          <DemoData />
        </div>
      </div>
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
