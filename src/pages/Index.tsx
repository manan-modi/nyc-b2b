
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const handleJoinCommunityClick = () => {
    window.open('https://nycb2b.beehiiv.com', '_blank');
  };

  return (
    <>
      <SEOHead 
        title="NYC B2B - The Ultimate B2B Community in New York City"
        description="Join NYC's premier B2B community. Access curated job opportunities, connect with industry leaders, and accelerate your career in the heart of NYC's business district."
      />
      
      <div className="min-h-screen bg-white">
        <Navigation onJoinCommunityClick={handleJoinCommunityClick} />
        <HeroSection />
        <SocialProofSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
