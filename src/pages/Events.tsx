
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarIcon, MapPin, Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";

const fetchEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });
    
  if (error) throw error;
  return data || [];
};

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState<"all" | "online" | "offline">("all");
  const [showPastEvents, setShowPastEvents] = useState(false);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents
  });

  // Get current date for filtering past events
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  // Filter events based on search query, event type, and whether to show past events
  const filteredEvents = events.filter((event: any) => {
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by event type
    const matchesType = eventType === "all" || event.type === eventType;
    
    // Filter by past/upcoming
    const eventDate = new Date(event.date);
    const isPast = eventDate < currentDate;
    const matchesPastFilter = showPastEvents || !isPast;
    
    return matchesSearch && matchesType && matchesPastFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-aasira-primary flex items-center justify-center">
        <Loader2 className="animate-spin text-aasira-accent" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aasira-primary">
      <div className="container py-16 md:py-24">
        <SectionHeading
          subtitle="Join Our Community"
          title="Upcoming Events"
          description="Discover workshops, conferences, webinars, and networking opportunities organized by Aasira."
          centered={true}
        />
        
        {/* Search and Filter */}
        <div className="my-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            <Input
              type="search"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-aasira-secondary/10"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-white/60" />
              <span className="text-white/80 text-sm">Filter:</span>
            </div>
            
            <div className="flex gap-2">
              <Badge 
                variant={eventType === "all" ? "secondary" : "outline"}
                className="cursor-pointer"
                onClick={() => setEventType("all")}
              >
                All Events
              </Badge>
              <Badge 
                variant={eventType === "online" ? "secondary" : "outline"}
                className="cursor-pointer"
                onClick={() => setEventType("online")}
              >
                Online
              </Badge>
              <Badge 
                variant={eventType === "offline" ? "secondary" : "outline"}
                className="cursor-pointer"
                onClick={() => setEventType("offline")}
              >
                In-Person
              </Badge>
            </div>
            
            <Badge 
              variant={showPastEvents ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => setShowPastEvents(!showPastEvents)}
            >
              {showPastEvents ? "Showing Past Events" : "Show Past Events"}
            </Badge>
          </div>
        </div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event: any) => {
            const eventDate = new Date(event.date);
            const isPast = eventDate < currentDate;
            
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                date={eventDate.toLocaleDateString()}
                time={event.time}
                location={event.location}
                image={event.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"}
                type={event.type as "online" | "offline"}
                rsvpLink={event.rsvp_link || "#"}
                isPast={isPast}
              />
            );
          })}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-white">No events found</h3>
            <p className="text-white/60 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
