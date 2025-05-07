
import { LinkedinIcon } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  size?: "small" | "large";
}

const TeamMemberCard = ({ 
  name, 
  role, 
  bio, 
  image, 
  linkedin,
  size = "small" 
}: TeamMemberCardProps) => {
  return (
    <div className={`glass-card text-center h-full flex flex-col ${size === "large" ? "p-8" : "p-6"}`}>
      <div className={`relative mx-auto mb-6 rounded-full overflow-hidden border-4 border-aasira-accent/20 ${size === "large" ? "w-48 h-48" : "w-32 h-32"}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-0 right-0 bg-aasira-accent p-2 rounded-tl-md hover:bg-aasira-accent/80 transition-colors"
            aria-label={`${name}'s LinkedIn`}
          >
            <LinkedinIcon size={16} className="text-white" />
          </a>
        )}
      </div>
      
      <h3 className={`font-bold text-white mb-1 ${size === "large" ? "text-2xl" : "text-xl"}`}>{name}</h3>
      <p className="text-aasira-accent mb-4">{role}</p>
      <p className="text-white/70 text-sm flex-grow">{bio}</p>
    </div>
  );
};

export default TeamMemberCard;
