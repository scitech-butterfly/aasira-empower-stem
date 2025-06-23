
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
    image: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1749287789/IMG_6463_ip8jbh.jpg",
    linkedin: "https://www.linkedin.com/in/gauri-singh-754787285/"
  },
  {
    name: "Khushi Kashyap",
    role: "Educational Outreach Trainer",
    image: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1749287649/IMG-20250412-WA0199_sm6qzu.jpg",
    linkedin: "https://www.linkedin.com/in/khushikashyap8605/"
  },
  {
    name: "Manjari Pandey",
    role: "Content Strategist",
    image: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1750691782/manjari_iuulyt.jpg",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Tamanna Atreya",
    role: "Content Strategist",
    image: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1750691774/tamanna_wxqgox.jpg",
    linkedin: "https://www.linkedin.com/in/tamanna-mamlakatoi-atreya-390751277/"
  },
  {
    name: "Manya Bhargava",
    role: "Educational Trainer and Content Creator",
    image: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1750692242/manya_pnjiwi.jpg",
    linkedin: "https://www.linkedin.com/in/ananya-poundrik-95b40a2aa/"
  },
  {
    name: "Ananya Poundrik",
    role: "Educational Trainer and Content Creator",
    image: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1750691774/ananya_cnzvqw.jpg",
    linkedin: "https://www.linkedin.com/in/manya-bhargava-692407280/"
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
              Aasira is a movement dedicated to cementing a better future for all genders in STEM fields. Founded in 2023, we fight for equal recognition of women everywhere- from schools to workplaces. We strive to hold our leaders accountable and to educate and empower others to take action.
            </p>
            <p className="text-white/80 mb-4">
              As much as it is a people empowerment movement, it is equally an education movement. We work to ensure that our voices are heard for generations to come. But we can’t do it without your help. Get in touch to see how you can get involved and increase our impact.
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
            subtitle="Organizations that support our mission to promote diversity in STEM"
            centered
          />
      
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              {
                name: "GoodWorks Trust",
                logo: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1750690720/goodworks_aih6pr.jpg"
              },
              {
                name: "Chhanv Foundation",
                logo: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1750690557/chhanv_vstgyr.png"
              },
              {
                name: "Care NGO",
                logo: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1750690630/carengo_h25h3l.jpg"
              },
              {
                name: "Kalaragini Trust",
                logo: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1750690514/kalaraginitrust_btswtb.jpg"
              },
              {
                name: "Kendriya Vidyalaya",
                logo: "https://res.cloudinary.com/dc4kbtlip/image/upload/v1750690682/kv_mmdh3u.jpg"
              }
            ].map((partner, index) => (
              <a
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="w-32 h-20 bg-white/10 rounded flex items-center justify-center hover:bg-white/20 transition"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-16 max-w-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
