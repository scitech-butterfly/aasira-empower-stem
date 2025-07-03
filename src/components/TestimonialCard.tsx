
interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

const TestimonialCard = ({ name, role, content, avatar }: TestimonialCardProps) => {
  return (
    <div className="glass-card p-6 transition-transform hover:-translate-y-2">
      <div className="flex items-center mb-4">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        )}
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-aasira-accent text-sm">{role}</p>
        </div>
      </div>
      <p className="text-white/80 italic">"{content}"</p>
    </div>
  );
};

export default TestimonialCard;
