
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-aasira-primary px-4 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-aasira-secondary/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-aasira-accent/20 rounded-full blur-[100px]"></div>
      
      <div className="glass-card max-w-lg w-full text-center py-12 px-6 relative z-10">
        <h1 className="text-8xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-2xl text-white mb-6">Oops! Page not found</p>
        <p className="text-white/70 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild className="bg-aasira-accent hover:bg-aasira-accent/90">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
