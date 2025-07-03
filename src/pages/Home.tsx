
import HeroSection from "@/components/HeroSection";
import BlogCard from "@/components/BlogCard";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import ImpactMetrics from "@/components/ImpactMetrics";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fetchFeaturedBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      blog_categories!category_id(name),
      profiles!author_id(full_name)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);
  
  if (error) throw error;
  return data || [];
};

const fetchUpcomingEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("date", new Date().toISOString().split('T')[0])
    .order("date", { ascending: true })
    .limit(2);
    
  if (error) throw error;
  return data || [];
};

const testimonials = [
  {
    content: "मुझे कंप्यूटर का समर कैंप करके बहुत अच्छा लगा और कई ऐसी चीज़े जानी जो मुझे पता ही नहीं थी|",
    name: "Chandni",
    title: "Student at GoodWorks Trust"
  },
  {
    content: "कंप्यूटर चलाने में मुझे बहुत मज़ा आने  लगा है | जो भी पढ़ाया जाता है वे विषय मुझे अच्छे से समझ आ जाते हैं | जब हमारी परीक्षा ली गई मेरे बहुत अच्छे अंक आए और मुझे बहुत खुशी हुई |",
    name: "Nishu",
    title: "Student at GoodWorks Trust"
  },
  {
    content: "A great initiative by the team to reform the lives of the kids. Congratulations for the effort to bring the change in the society. We really appreciate you for doing  selfless service of imparting computer and AI classes to the children of GoodWorks Trust. Keep doing GoodWorks.",
    name: "Ms. Smriti Mishra",
    title: "Co-Founder, GoodWorks Trust"
  }
];

const Home = () => {
  const { data: featuredBlogs = [] } = useQuery({
    queryKey: ["featuredBlogs"],
    queryFn: fetchFeaturedBlogs
  });

  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: fetchUpcomingEvents
  });

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title={
          <div className="space-y-4">
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text">
              Debugging Tech's Diversity Problem
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              Empowering Women in STEM
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              Breaking Barriers, Building Futures
            </div>
          </div>
        }
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
                  src="https://vuygwpfhzvwkczuzpzga.supabase.co/storage/v1/object/public/gallery//WhatsApp%20Image%202023-06-30%20at%202.37.08%20PM.jpg" 
                  alt="Empowering Students in STEM" 
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
            {featuredBlogs.map((blog: any) => (
              <BlogCard 
                key={blog.id}
                id={blog.id}
                title={blog.title}
                excerpt={blog.content.substring(0, 150) + "..."}
                coverImage={blog.cover_image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                author={blog.profiles?.full_name || "Anonymous"}
                date={new Date(blog.created_at).toLocaleDateString()}
                category={blog.blog_categories?.name || "General"}
                likes={0}
                comments={0}
                tags={[]}
              />
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
            {upcomingEvents.map((event: any) => (
              <EventCard 
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                date={new Date(event.date).toLocaleDateString()}
                time={event.time}
                location={event.location}
                image={event.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"}
                type={event.type as "online" | "offline"}
                rsvpLink={event.rsvp_link || "#"}
              />
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
