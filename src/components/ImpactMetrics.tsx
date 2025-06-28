
const metrics = [
  {
    number: "100+",
    label: "Students Empowered",
    description: "Through mentorship and educational programs"
  },
  {
    number: "10+",
    label: "Events Organized",
    description: "Including workshops, seminars, and networking sessions"
  },
  {
    number: "5",
    label: "Corporate Partners",
    description: "Supporting our mission and initiatives"
  }
];

const ImpactMetrics = () => {
  return (
    <div className="bg-aasira-primary relative overflow-hidden py-16">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-aasira-accent/20 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-aasira-secondary/20 rounded-full filter blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="glass-card text-center transition-transform hover:-translate-y-2 w-full max-w-sm"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3 animate-pulse-gentle">
                {metric.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{metric.label}</h3>
              <p className="text-white/70 text-sm">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactMetrics;
