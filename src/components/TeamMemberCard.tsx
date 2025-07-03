
interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
}

const TeamMemberCard = ({ name, role, image, bio, linkedin }: TeamMemberCardProps) => {
  return (
    <div className="glass-card text-center group transition-transform hover:-translate-y-2">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover object-center transition-transform group-hover:scale-105"
        />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-aasira-accent font-medium mb-3">{role}</p>
      <p className="text-white/70 text-sm mb-4">{bio}</p>
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-aasira-accent hover:text-white transition-colors"
        >
          Connect on LinkedIn
        </a>
      )}
    </div>
  );
};

export default TeamMemberCard;
