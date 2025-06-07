
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-aasira-primary border-t border-aasira-secondary/30 text-white/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dc4kbtlip/image/upload/v1749287755/Artboard_9_aiuqfa.png"
                  alt="Aasira Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="ml-2 font-bold text-xl text-white">Aasira</span>
            </div>
            <p className="text-sm mb-4">
              Empowering underrepresented individuals in STEM fields through education, community support, and outreach.
            </p>
            <div className="flex space-x-4">
              {/* Social icons */}
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-aasira-secondary flex items-center justify-center hover:bg-aasira-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full bg-aasira-secondary flex items-center justify-center hover:bg-aasira-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-aasira-secondary flex items-center justify-center hover:bg-aasira-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-aasira-secondary flex items-center justify-center hover:bg-aasira-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-aasira-accent transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-sm hover:text-aasira-accent transition-colors">Blogs</Link>
              </li>
              <li>
                <Link to="/events" className="text-sm hover:text-aasira-accent transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm hover:text-aasira-accent transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-aasira-accent transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 text-aasira-accent mt-0.5" />
                <span className="text-sm">Noida, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-aasira-accent" />
                <span className="text-sm">+91 9971614166, +91 7011525288</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-aasira-accent" />
                <span className="text-sm">teamaasira@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest news and events.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm bg-aasira-primary border border-aasira-secondary/40 rounded focus:outline-none focus:border-aasira-accent"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm bg-aasira-accent hover:bg-aasira-accent/80 transition-colors rounded font-medium text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-aasira-secondary/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/60 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Aasira. All rights reserved.
          </p>
          <p className="text-xs text-white/60 flex items-center">
            Made with <Heart size={12} className="mx-1 text-aasira-accent" /> for women in STEM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
