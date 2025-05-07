
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  title: ReactNode;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
}

const HeroSection = ({
  title,
  subtitle,
  ctaText,
  ctaLink = "/",
  secondaryCtaText,
  secondaryCtaLink = "/",
  backgroundImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
}: HeroProps) => {
  return (
    <div 
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 5, 41, 0.85), rgba(15, 5, 41, 0.9)), url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-aasira-primary bg-opacity-60" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-aasira-accent rounded-full filter blur-[100px] opacity-20" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-aasira-secondary rounded-full filter blur-[120px] opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-wrap gap-4 justify-center">
              {ctaText && (
                <Button asChild size="lg" className="bg-aasira-accent hover:bg-aasira-accent/90">
                  <Link to={ctaLink}>{ctaText}</Link>
                </Button>
              )}
              
              {secondaryCtaText && (
                <Button asChild variant="outline" size="lg">
                  <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative bottom divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 text-background"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V94.67C57.71,98.86,124.46,85.34,171.29,74.34Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
