
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight, Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { OptimizedImage } from "@/components/ui/optimized-image";

export const EventsSection = () => {
  // Events functionality has been disabled
  const events: any[] = [];
  const loading = false;

  const communityImages = [
    {
      src: "/lovable-uploads/f82fd6b5-0adc-4821-b6ef-8e916e338872.png",
      alt: "NYC B2B Community Event Panel Discussion"
    },
    {
      src: "/lovable-uploads/8b97f66d-cf71-45a4-aa34-a4a0a47d6512.png", 
      alt: "NYC B2B Founders Networking Event"
    },
    {
      src: "/lovable-uploads/869b893b-cd8a-43f2-a2fd-931d8465dd47.png",
      alt: "Pre-Seed and Seed Founders Mixer Panel"
    },
    {
      src: "/lovable-uploads/95f0e7bb-d022-430b-b63c-d9e545a744f7.png",
      alt: "NYC B2B Community Audience Engagement"
    },
    {
      src: "/lovable-uploads/6cb02953-a4e4-4452-b5d9-e547c63eabbf.png",
      alt: "NYC B2B Networking and Conversations"
    },
    {
      src: "/lovable-uploads/b6001725-cfda-49a7-9a37-31277a327cf5.png",
      alt: "NYC B2B Community Members Network ing"
    }
  ];

  return (
    <section id="events" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex justify-center items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg sm:rounded-xl">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">Community Events</h2>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed mb-4">
            Connect with NYC's most innovative B2B minds at exclusive networking events and workshops. 
            Build meaningful relationships that drive your career forward.
          </p>
        </div>

        {/* Event submission disabled message */}
        <div className="text-center py-12 mb-16">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Submissions Currently Disabled</h3>
              <p className="text-gray-600">Event submission functionality has been temporarily disabled. Please check back later or contact us directly for event inquiries.</p>
            </CardContent>
          </Card>
        </div>

        {/* Inside NYC B2B Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            Inside <span className="nyc-gradient-text">NYC B2B</span>
          </h3>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-8 sm:mb-12">
            Get a behind-the-scenes look at our vibrant community events and the amazing founders who make it all happen.
          </p>
          
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 sm:-ml-4">
                {communityImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] hover:shadow-xl transition-all duration-300">
                      <OptimizedImage
                        src={image.src}
                        alt={image.alt}
                        aspectRatio="landscape"
                        className="group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};
