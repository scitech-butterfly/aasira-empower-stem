
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  description,
  centered = false,
  className = "" 
}: SectionHeadingProps) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 h-1 bg-aasira-accent w-full"></span>
      </h2>
      {subtitle && (
        <p className="text-lg text-white/80 mt-4 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-md text-white/70 mt-2 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
