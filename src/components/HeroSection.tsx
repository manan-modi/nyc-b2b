
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "We need your email to subscribe you to our newsletter.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Subscribe to Beehiiv using your actual API token
      const response = await fetch('https://api.beehiiv.com/v2/publications/pub_255e23a2-96f2-406a-8d8b-f3c978f4620f/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 255e23a2-96f2-406a-8d8b-f3c978f4620f'
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: true,
          send_welcome_email: true
        })
      });

      if (response.ok) {
        toast({
          title: "Successfully subscribed!",
          description: "Welcome to the NYC B2B community. Check your email for confirmation.",
        });
        setEmail("");
      } else {
        const errorData = await response.json();
        console.error('Beehiiv API error:', errorData);
        
        // Fallback to manual subscription
        const subscriptionUrl = `https://nycb2b.beehiiv.com/subscribe?email=${encodeURIComponent(email)}`;
        window.open(subscriptionUrl, '_blank');
        
        toast({
          title: "Redirecting to subscription!",
          description: "Complete your subscription on the new page that opened.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error('Beehiiv API error:', error);
      // Fallback to manual subscription
      const subscriptionUrl = `https://nycb2b.beehiiv.com/subscribe?email=${encodeURIComponent(email)}`;
      window.open(subscriptionUrl, '_blank');
      
      toast({
        title: "Redirecting to subscription!",
        description: "Complete your subscription on the new page that opened.",
      });
      setEmail("");
    }
  };

  return (
    <section className="pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-yellow-600/5 to-green-600/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto text-center relative">
        <div className="animate-fade-in">
          <Badge className="mb-6 sm:mb-8 bg-gradient-to-r from-green-50 to-yellow-50 text-green-800 border-green-200/50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-sm">
            🚀 NYC's Leading B2B Startup Network · 10,000+ Members
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight px-2">
            Where Builders Meet.{" "}
            <span className="nyc-gradient-text animate-pulse">
              Deals Happen.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-2">
            Join the go-to community for 10k+ B2B founders, operators, and investors 
            shaping the next wave of enterprise tech.
          </p>
          
          <div id="email-signup" className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
            <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-3 w-full max-w-md sm:max-w-none group">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email!"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 sm:h-14 border-gray-200 focus:border-green-500 rounded-xl text-base sm:text-lg px-4 sm:px-6 shadow-sm focus:shadow-lg transition-all duration-200"
                />
                <div className="absolute inset-0 rounded-xl nyc-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
              </div>
              <Button type="submit" size="lg" className="nyc-gradient hover:opacity-90 px-6 sm:px-8 h-12 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white">
                Join Free
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
          </div>

          <div className="flex justify-center px-4">
            <Button size="lg" variant="outline" className="border-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm sm:text-base" asChild>
              <a href="https://nycb2b.beehiiv.com/subscribe" target="_blank" rel="noopener noreferrer">
                <Mail className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Weekly Newsletter
                <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
