
import HeroSection from "@/components/HeroSection";
import BlogCard from "@/components/BlogCard";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import ImpactMetrics from "@/components/ImpactMetrics";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Sample data
const featuredBlogs = [
  {
    id: "1",
    title: "Breaking Barriers: Women in Quantum Computing",
    excerpt: "Exploring the groundbreaking work of women pioneers in the field of quantum computing and their impact on the future of technology.",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    author: "Dr. Priya Sharma",
    date: "May 2, 2025",
    category: "Technology",
    likes: 45,
    comments: 12,
    tags: ["quantum", "women-in-tech", "computing"]
  },
  {
    id: "2",
    title: "The Path to Inclusion: Strategies for Diverse STEM Workplaces",
    excerpt: "Practical approaches to creating more inclusive STEM environments that welcome and nurture talent from all backgrounds.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    author: "Anjali Patel",
    date: "Apr 28, 2025",
    category: "Diversity",
    likes: 32,
    comments: 8,
    tags: ["diversity", "inclusion", "workplace"]
  },
  {
    id: "3",
    title: "Mentorship Matters: Building Support Networks for STEM Students",
    excerpt: "How effective mentorship programs are changing the game for underrepresented students pursuing STEM education and careers.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    author: "Neha Gupta",
    date: "Apr 20, 2025",
    category: "Education",
    likes: 28,
    comments: 6,
    tags: ["mentorship", "education", "support"]
  }
];

const upcomingEvents = [
  {
    id: "1",
    title: "Women in Data Science Conference",
    description: "Join us for a day of inspiring talks, workshops, and networking opportunities with women leaders in data science.",
    date: "June 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Virtual Event",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    type: "online" as const,
    rsvpLink: "#"
  },
  {
    id: "2",
    title: "STEM Career Workshop for College Students",
    description: "Explore career paths in STEM fields and learn from professionals about job opportunities and skill requirements.",
    date: "June 22, 2025",
    time: "10:00 AM - 2:00 PM",
    location: "Bangalore Tech Hub",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    type: "offline" as const,
    rsvpLink: "#"
  }
];

const testimonials = [
  {
    content: "Aasira's mentorship program completely transformed my career path. The guidance I received helped me overcome barriers and pursue my passion in biotechnology with confidence.",
    name: "Sneha Reddy",
    title: "Biotech Researcher",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
  },
  {
    content: "The community and support I found through Aasira has been invaluable. Their workshops gave me the technical skills and network I needed to succeed in a male-dominated industry.",
    name: "Meera Singh",
    title: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
  },
  {
    content: "As someone from a rural background, I never thought a career in technology was possible for me. Aasira's educational resources and encouragement changed everything.",
    name: "Lakshmi Devi",
    title: "Data Scientist",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
  }
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title={<>Empowering <span className="gradient-text">Women in STEM</span><br />Breaking Barriers, Building Futures</>}
        subtitle="Aasira is an Indian initiative dedicated to supporting underrepresented individuals in STEM fields through education, community, and outreach programs."
        ctaText="Explore Our Programs"
        ctaLink="/about"
        secondaryCtaText="Join Our Community"
        secondaryCtaLink="/contact"
      />
      
      {/* About Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-white/80 mb-6">
                Aasira – STEM Beyond Labels is dedicated to creating a more inclusive STEM ecosystem in India by empowering women and other underrepresented groups through targeted education, mentorship, and community support.
              </p>
              <p className="text-white/80 mb-6">
                We believe that diversity drives innovation, and our goal is to break down the barriers that prevent talented individuals from pursuing and thriving in STEM careers.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-card h-full">
                  <h3 className="text-lg font-semibold text-white mb-2">Education</h3>
                  <p className="text-sm text-white/70">Providing accessible learning resources and opportunities</p>
                </div>
                <div className="glass-card h-full">
                  <h3 className="text-lg font-semibold text-white mb-2">Mentorship</h3>
                  <p className="text-sm text-white/70">Connecting aspiring professionals with experienced mentors</p>
                </div>
                <div className="glass-card h-full">
                  <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
                  <p className="text-sm text-white/70">Building supportive networks for collaboration and growth</p>
                </div>
                <div className="glass-card h-full">
                  <h3 className="text-lg font-semibold text-white mb-2">Advocacy</h3>
                  <p className="text-sm text-white/70">Working towards systemic change and equal opportunities</p>
                </div>
              </div>
              <Button asChild size="lg">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="rounded-xl overflow-hidden border-4 border-aasira-accent/20 shadow-lg relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Women in STEM" 
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 -left-10 w-32 h-32 rounded-full bg-aasira-accent/20 blur-lg"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-aasira-secondary/30 blur-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border-4 border-aasira-accent/20 rounded-xl -rotate-6 z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Metrics */}
      <ImpactMetrics />
      
      {/* Featured Blogs */}
      <section className="py-16 bg-gradient-to-b from-aasira-primary to-aasira-primary/95">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Featured Articles" 
            subtitle="Explore our collection of articles on women in STEM, diversity in tech, and educational resources"
            centered
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/blogs">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="py-16 bg-gradient-to-b from-aasira-primary/95 to-aasira-primary">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Upcoming Events" 
            subtitle="Join us for workshops, seminars, and networking opportunities"
            centered
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-aasira-primary to-aasira-primary/95 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-aasira-secondary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-aasira-accent/20 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
            title="Success Stories" 
            subtitle="Hear from women who have been empowered through our programs and community"
            centered
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-aasira-secondary to-aasira-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a student, professional, or ally, there's a place for you in our mission to empower women in STEM.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="default" className="bg-white text-aasira-secondary hover:bg-white/90">
              <Link to="/contact">Get Involved</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
