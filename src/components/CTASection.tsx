
import { Button } from "@/components/ui/button";
import { Mail, ChevronRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 nyc-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center text-white relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 tracking-tight">
          Ready to Level Up Your B2B Journey?
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 font-light leading-relaxed max-w-3xl mx-auto">
          Join NYC's most connected B2B community. Get exclusive access to events and resources 
          that accelerate your career and business growth.
        </p>
        <div className="flex justify-center">
          <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 rounded-xl px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-sm hover:scale-105 transition-all duration-200 text-sm sm:text-base" asChild>
            <a href="https://nycb2b.beehiiv.com/subscribe" target="_blank" rel="noopener noreferrer">
              <Mail className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              Subscribe to Newsletter
              <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
