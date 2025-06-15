
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  sizes?: string;
  priority?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  aspectRatio = "landscape",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate optimized URLs for different sizes
  const getOptimizedUrl = (url: string, width: number) => {
    if (url.includes('unsplash.com')) {
      return `${url}?w=${width}&h=${Math.round(width * (aspectRatio === 'square' ? 1 : aspectRatio === 'portrait' ? 1.4 : 0.6))}&fit=crop&crop=center&auto=format&q=80`;
    }
    if (url.includes('images.')) {
      return `${url}?w=${width}&auto=format&q=80`;
    }
    return url;
  };

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video", 
    portrait: "aspect-[3/4]",
    landscape: "aspect-[2/1]"
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={cn(
        "bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center",
        aspectRatioClasses[aspectRatio],
        className
      )}>
        <div className="text-gray-400 text-center">
          <div className="text-2xl mb-2">📷</div>
          <div className="text-sm">Image unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio], className)}>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        src={getOptimizedUrl(src, 800)}
        srcSet={`
          ${getOptimizedUrl(src, 400)} 400w,
          ${getOptimizedUrl(src, 800)} 800w,
          ${getOptimizedUrl(src, 1200)} 1200w
        `}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
};
