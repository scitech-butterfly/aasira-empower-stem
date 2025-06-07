
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import TeamMemberCard from "@/components/TeamMemberCard";

// Team data
const founders = [
  {
    name: "Kashvi Singh",
    role: "Co-Founder",
    bio: "Hi! I am an AIML undergraduate who's obsessed with exploring all aspects of any new technology she comes across. Having had a keen inclination towards STEM fields since the early stages, I noticed the gender gap right at the onset of middle school. Over the years as I started observing a bias, I felt a rage I couldn't express.  Aasira is an attempt to extend a hand to the community that faces this every day and work towards inclusiona and diversity in STEM fields.",
    image: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1749287264/Kashvi_Singh_kn0m7x.png",
    linkedin: "https://www.linkedin.com/in/kashviisingh/"
  },
  {
    name: "Samriddhi Bisht",
    role: "Co-Founder",
    bio: "Being a undergraduate student, pursuing Computer Science, I have always felt great affection for technology and its applications. I believe that technology assorted with social good is the key to modernisation and development. When I decided to explore Science, later did I realize the major STEM gender gap- despite decades of progress towards equality, women are still underrepresented in the tech workforce, figures speaking for themselves. Having said that, I am of the opinion that women need to be empowered and get themselves equipped with digital skills to shape the future. Through Aasira, we aim to develop a women-centered atmosphere where we rise and learn together. We focus towards providing wings of courage to women as they prepare their flight towards change-making.",
    image: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1749286846/Samriddhi_1_pz567s.jpg",
    linkedin: "https://www.linkedin.com/in/samriddhi-bisht/"
  }
];

const coreTeam = [
  {
    name: "Gauri Singh",
    role: "Educational Outreach Training Lead",
    bio: "Gauri manages community partnerships and event planning to expand Aasira's impact across India.",
    image: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1749287033/IMG_6463_obt9z2.heic",
    linkedin: "https://www.linkedin.com/in/gauri-singh-754787285/"
  },
  {
    name: "Khushi Kashyap",
    role: "Educational Outreach Trainer",
    bio: "Khushi conducts technical training classes for Aasira's collaborations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    linkedin: "https://www.linkedin.com/in/khushikashyap8605/"
  },
  {
    name: "Deepa Krishnan",
    role: "Research Director",
    bio: "Deepa leads research initiatives to identify barriers and develop evidence-based solutions for women in STEM.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Sanjay Mehta",
    role: "Corporate Partnership Manager",
    bio: "Sanjay builds strategic relationships with industry partners to create opportunities for women in STEM careers.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    linkedin: "https://linkedin.com"
  }
];

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="About Aasira"
        subtitle="Learn about our mission, vision, and the team behind Aasira - STEM Beyond Labels"
        backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      />
      
      {/* Mission and Vision */}
      <section className="py-16 bg-gradient-to-b from-aasira-primary to-aasira-primary/95">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="Our Mission" />
              <p className="text-white/80 mb-8">
                Aasira is dedicated to creating a more inclusive STEM ecosystem in India by empowering women and other underrepresented groups through targeted education, mentorship, and community support. We work to break down barriers and create pathways to success in science, technology, engineering, and mathematics fields.
              </p>
              
              <SectionHeading title="Our Vision" />
              <p className="text-white/80 mb-4">
                We envision a future where the STEM community in India reflects the diverse talent and potential of its population, where innovation thrives through inclusive participation, and where everyone has equal opportunity to contribute to scientific and technological advancement.
              </p>
              
              <div className="mt-8">
                <h3 className="text-2xl font-semibold text-white mb-4">Our Core Values</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card">
                    <h4 className="text-lg font-semibold text-white mb-2">Inclusion</h4>
                    <p className="text-sm text-white/70">Creating spaces where everyone belongs and can thrive</p>
                  </div>
                  <div className="glass-card">
                    <h4 className="text-lg font-semibold text-white mb-2">Innovation</h4>
                    <p className="text-sm text-white/70">Embracing new ideas and approaches to complex challenges</p>
                  </div>
                  <div className="glass-card">
                    <h4 className="text-lg font-semibold text-white mb-2">Empowerment</h4>
                    <p className="text-sm text-white/70">Building confidence and capability through knowledge sharing</p>
                  </div>
                  <div className="glass-card">
                    <h4 className="text-lg font-semibold text-white mb-2">Collaboration</h4>
                    <p className="text-sm text-white/70">Working together across disciplines and backgrounds</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-lg relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                  alt="Women in STEM collaboration" 
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-aasira-accent blur-lg z-0 opacity-30"></div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full bg-aasira-secondary blur-xl z-0 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-gradient-to-b from-aasira-primary/95 to-aasira-primary">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Story" 
            subtitle="The journey that led to the creation of Aasira - STEM Beyond Labels"
            centered
          />
          
          <div className="max-w-4xl mx-auto glass-card">
            <p className="text-white/80 mb-4">
              Aasira was born from the personal experiences of our founders, Dr. Priya Sharma and Anjali Patel, who navigated the challenges of being women in male-dominated STEM fields. Despite their success, they recognized the systemic barriers that prevented many talented women from pursuing or advancing in STEM careers.
            </p>
            <p className="text-white/80 mb-4">
              In 2020, they joined forces to create an organization that would address these barriers through a comprehensive approach: providing educational resources, building supportive communities, offering mentorship, and advocating for systemic change.
            </p>
            <p className="text-white/80">
              Starting with a small cohort of 20 women from universities across Bangalore, Aasira has grown to impact hundreds of women and other underrepresented individuals in STEM fields across India. What began as a grassroots mentorship program has evolved into a multifaceted initiative that partners with universities, corporations, and government agencies to create lasting change in the STEM ecosystem.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-aasira-primary to-aasira-primary/95">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Meet Our Team" 
            subtitle="The dedicated individuals working to empower women in STEM"
            centered
          />
          
          {/* Founders */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Founders</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {founders.map((founder, index) => (
                <TeamMemberCard 
                  key={index} 
                  {...founder} 
                  size="large"
                />
              ))}
            </div>
          </div>
          
          {/* Core Team */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Core Team</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreTeam.map((member, index) => (
                <TeamMemberCard 
                  key={index} 
                  {...member}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 bg-aasira-primary">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Partners" 
            subtitle="Organizations that support our mission to empower women in STEM"
            centered
          />
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* Partner logos would go here - using placeholders */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="w-32 h-20 bg-white/10 rounded flex items-center justify-center">
                <div className="text-white/50 font-bold">Partner {item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
