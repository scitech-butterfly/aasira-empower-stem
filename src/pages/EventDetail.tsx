
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, MapPin, Clock, ExternalLink, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const fetchEvent = async (id: string) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
    
  if (error) throw error;
  return data;
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: event, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id!),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-aasira-primary flex items-center justify-center">
        <Loader2 className="animate-spin text-aasira-accent" size={32} />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-aasira-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-white/60 mb-6">The event you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();

  return (
    <div className="min-h-screen bg-aasira-primary">
      <div className="container py-16 md:py-24">
        <div className="mb-6">
          <Button asChild variant="outline" size="sm">
            <Link to="/events" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Events
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="glass-card mb-8">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={event.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${event.type === "online" ? "bg-green-600" : "bg-blue-600"} hover:${event.type === "online" ? "bg-green-700" : "bg-blue-700"}`}>
                    {event.type === "online" ? "Online" : "In-Person"}
                  </Badge>
                </div>
                {isPast && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg py-2 px-4">Past Event</Badge>
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{event.title}</h1>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card sticky top-8">
              <h3 className="text-xl font-semibold text-white mb-6">Event Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Calendar size={20} className="mr-3 mt-1 text-aasira-accent" />
                  <div>
                    <p className="text-white font-medium">Date</p>
                    <p className="text-white/70">{eventDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={20} className="mr-3 mt-1 text-aasira-accent" />
                  <div>
                    <p className="text-white font-medium">Time</p>
                    <p className="text-white/70">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin size={20} className="mr-3 mt-1 text-aasira-accent" />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-white/70">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users size={20} className="mr-3 mt-1 text-aasira-accent" />
                  <div>
                    <p className="text-white font-medium">Event Type</p>
                    <p className="text-white/70 capitalize">{event.type}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                {!isPast ? (
                  <>
                    <p className="text-sm text-white/60 mb-4">
                      Ready to join us? Click below to RSVP for this event.
                    </p>
                    <Button asChild className="w-full bg-aasira-accent hover:bg-aasira-accent/90">
                      <a 
                        href={event.rsvp_link || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2"
                      >
                        RSVP Now <ExternalLink size={16} />
                      </a>
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-white/60 mb-4">This event has ended.</p>
                    <Button disabled variant="outline" className="w-full">
                      Event Ended
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
