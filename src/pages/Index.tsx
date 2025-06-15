
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";  
import { SocialProofSection } from "@/components/SocialProofSection";
import { EventsSection } from "@/components/EventsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const handleJoinCommunityClick = () => {
    document.getElementById('email-signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50/30">
      <Navigation onJoinCommunityClick={handleJoinCommunityClick} />
      <HeroSection />
      <SocialProofSection />
      <EventsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
