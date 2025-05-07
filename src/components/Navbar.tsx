
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Nav links configuration
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Events", path: "/events" },
    { name: "Courses", path: "/courses" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-aasira-primary/90 backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-aasira-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="ml-2 font-bold text-xl md:text-2xl text-white">Aasira</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-aasira-accent ${
                  location.pathname === link.path 
                    ? "text-aasira-accent" 
                    : "text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Button asChild variant="secondary" size="sm" className="ml-4">
              <Link to="/login" className="flex items-center gap-2">
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 absolute top-full left-0 right-0 bg-aasira-primary/95 backdrop-blur-md shadow-lg border-t border-aasira-secondary/20">
            <nav className="flex flex-col space-y-4 px-4 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-medium transition-colors p-2 rounded-md ${
                    location.pathname === link.path 
                      ? "text-aasira-accent bg-aasira-secondary/10" 
                      : "text-white/80 hover:bg-aasira-secondary/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Button asChild variant="secondary" className="w-full mt-4">
                <Link to="/login" className="flex items-center justify-center gap-2">
                  <LogIn size={16} />
                  <span>Sign In</span>
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
