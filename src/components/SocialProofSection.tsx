import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Heart } from "lucide-react";
import { useState } from "react";

export const SocialProofSection = () => {
  const [showHearts, setShowHearts] = useState(false);

  const investors = [
    { name: "Andreessen Horowitz", shortName: "a16z", logo: "/lovable-uploads/c07dfda6-02ec-43ac-9795-8a5c60a7c26d.png" },
    { name: "Sequoia Capital", shortName: "Sequoia", logo: "/lovable-uploads/9cd946c6-8c29-426a-a83b-19ed3a9b3d32.png" },
    { name: "Union Square Ventures", shortName: "USV", logo: "/lovable-uploads/f4ee446c-746c-4daf-b48d-c203acf6aac2.png" },
    { name: "Lightspeed Venture Partners", shortName: "Lightspeed", logo: "/lovable-uploads/d5513b85-a8f8-4a40-995c-8bb012c5ed40.png" },
    { name: "Accel", shortName: "Accel", logo: "/lovable-uploads/933e8e9f-e858-4c2f-880c-f32fbc97d95f.png" },
    { name: "Insight Partners", shortName: "Insight Partners", logo: "/lovable-uploads/a3116963-3da8-4448-b95c-7f13981b3232.png" },
    { name: "Bessemer Venture Partners", shortName: "Bessemer", logo: "/lovable-uploads/f7e6d198-65e3-417a-8f28-db14ed8b761d.png" },
    { name: "FJ Labs", shortName: "FJ Labs", logo: "/lovable-uploads/15301ceb-d1bd-4b2c-a09c-842f37f8be01.png" },
    { name: "NEA", shortName: "NEA", logo: "/lovable-uploads/7b8efdde-0e0c-4ecf-88d8-c71778eba024.png" },
    { name: "RRE Ventures", shortName: "RRE" },
    { name: "FirstMark Capital", shortName: "FirstMark", logo: "/lovable-uploads/6b399693-2602-4ef3-8c21-5b3413a1b16d.png" },
    { name: "Lerer Hippeau", shortName: "Lerer Hippeau", logo: "/lovable-uploads/92c7be6d-607a-4121-8a90-3824891c5875.png" },
    { name: "Antler", shortName: "Antler", logo: "/lovable-uploads/f4d2292b-9cde-46b0-8bda-d2e749bc53fb.png" },
    { name: "Hustle Fund", shortName: "Hustle Fund", logo: "/lovable-uploads/1372bbf6-c158-4a58-b90e-906613c48a8c.png" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white to-green-50/30 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight relative cursor-pointer"
            onMouseEnter={() => setShowHearts(true)}
            onMouseLeave={() => setShowHearts(false)}
          >
            Loved by <span className="nyc-gradient-text">10X founders</span> in NYC
            {showHearts && (
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {/* Fountain burst hearts */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30) - 150; // Spread from -150° to +150°
                  const distance = 60 + (i % 3) * 20; // Varying distances
                  const delay = i * 50; // Staggered animation
                  
                  return (
                    <Heart
                      key={i}
                      className={`absolute w-5 h-5 text-green-500 fill-current opacity-90`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%)`,
                        animation: `heartFountain 1.5s ease-out ${delay}ms forwards`,
                        '--angle': `${angle}deg`,
                        '--distance': `${distance}px`,
                      } as React.CSSProperties & { [key: string]: string }}
                    />
                  );
                })}
              </div>
            )}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 sm:mb-16 max-w-4xl mx-auto font-light leading-relaxed">
            Trusted by nearly 10,000+ founders, operators, and investors as the premier B2B startup community in NYC.
          </p>
          
          <div className="mb-8">
            <p className="text-base sm:text-lg font-semibold text-gray-700 mb-6 sm:mb-8">Founders backed by</p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-white via-white/60 to-transparent z-10 pointer-events-none"></div>
              
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  slidesToScroll: 1,
                  dragFree: true,
                }}
                className="w-full max-w-6xl mx-auto"
              >
                <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
                  {investors.map((investor, index) => (
                    <CarouselItem key={index} className="pl-1 sm:pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                      <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:scale-105">
                        <div className="flex items-center justify-center h-12 sm:h-16">
                          {investor.logo ? (
                            <img 
                              src={investor.logo} 
                              alt={investor.name}
                              className="max-h-8 sm:max-h-10 max-w-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                            />
                          ) : (
                            <span className="text-sm sm:text-lg font-bold text-gray-700 group-hover:text-green-600 transition-colors duration-300 text-center">
                              {investor.shortName}
                            </span>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heartFountain {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-10px) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * -0.8)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--distance) * -1)) scale(0.4);
          }
        }
      `}</style>
    </section>
  );
};
