
interface TestimonialCardProps {
  content: string;
  name: string;
  title: string;
}

const TestimonialCard = ({ content, name, role}: TestimonialCardProps) => {
  return (
    <div className="glass-card h-full flex flex-col relative">
      {/* Quotation mark */}
      <div className="absolute top-4 right-4 text-5xl leading-none text-aasira-accent/20 font-serif">
        "
      </div>
      
      <p className="text-white/80 mb-8">
        {content}
      </p>
      
      <div className="flex items-center mt-auto">
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-aasira-accent">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
