
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  image: string;
  type: "online" | "offline";
  rsvpLink: string;
  isPast?: boolean;
}

const EventCard = ({
  id,
  title,
  description,
  date,
  endDate,
  time,
  location,
  image,
  type,
  rsvpLink,
  isPast = false,
}: EventCardProps) => {
  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    if (!end || start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString();
    }
    
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  return (
    <div className="glass-card group h-full flex flex-col">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <Link to={`/events/${id}`}>
          <img
            src={image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-2 left-2">
          <Badge className={`${type === "online" ? "bg-green-600" : "bg-blue-600"} hover:${type === "online" ? "bg-green-700" : "bg-blue-700"}`}>
            {type === "online" ? "Online" : "Offline"}
          </Badge>
        </div>
        {isPast && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg py-1 px-3">Past Event</Badge>
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col">
        <Link to={`/events/${id}`} className="mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-aasira-accent transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <div className="space-y-2 mb-4 text-sm text-white/80">
          <div className="flex items-start">
            <Calendar size={16} className="mr-2 mt-0.5 text-aasira-accent" />
            <span>{formatDateRange(date, endDate)}</span>
          </div>
          <div className="flex items-start">
            <Clock size={16} className="mr-2 mt-0.5 text-aasira-accent" />
            <span>{time}</span>
          </div>
          <div className="flex items-start">
            <MapPin size={16} className="mr-2 mt-0.5 text-aasira-accent" />
            <span>{location}</span>
          </div>
        </div>
        
        <p className="text-sm text-white/70 mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        
        <div className="flex justify-between items-center gap-2 mt-auto">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/events/${id}`}>Details</Link>
          </Button>
          
          {!isPast ? (
            <Button asChild className="flex-1 bg-aasira-accent hover:bg-aasira-accent/90">
              <a href={rsvpLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                RSVP <ExternalLink size={14} />
              </a>
            </Button>
          ) : (
            <Button disabled className="flex-1" variant="outline">
              Event Ended
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
