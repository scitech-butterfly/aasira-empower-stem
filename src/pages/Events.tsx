
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CalendarIcon, MapPin, Search, Filter } from "lucide-react";
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

// Mock events for now
const mockEvents = [
  {
    id: "1",
    title: "Women in Tech Conference 2023",
    description: "Join us for a day of inspiration, learning, and networking with leading women in the technology sector.",
    date: "June 15, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "Bengaluru International Convention Center",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "offline",
    rsvpLink: "https://example.com/rsvp",
    isPast: true
  },
  {
    id: "2",
    title: "Coding Workshop for Beginners",
    description: "Learn the basics of programming in this hands-on workshop designed for absolute beginners.",
    date: "July 8, 2023",
    time: "2:00 PM - 6:00 PM",
    location: "Virtual Zoom Session",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "online",
    rsvpLink: "https://example.com/rsvp",
    isPast: false
  },
  {
    id: "3",
    title: "STEM Career Fair",
    description: "Connect with top employers in STEM fields and explore career opportunities across various industries.",
    date: "August 20, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Chennai Trade Center",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "offline",
    rsvpLink: "https://example.com/rsvp",
    isPast: false
  },
  {
    id: "4",
    title: "Data Science Fundamentals Webinar",
    description: "An introduction to data analysis, visualization, and the basics of machine learning for beginners.",
    date: "September 5, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Online - Microsoft Teams",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "online",
    rsvpLink: "https://example.com/rsvp",
    isPast: false
  },
  {
    id: "5",
    title: "Women in Engineering Panel Discussion",
    description: "Hear from accomplished women engineers about their journeys, challenges, and advice for aspiring engineers.",
    date: "October 12, 2023",
    time: "5:00 PM - 7:30 PM",
    location: "Delhi Technology Hub",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "offline",
    rsvpLink: "https://example.com/rsvp",
    isPast: false
  },
  {
    id: "6",
    title: "Hackathon: Tech for Social Good",
    description: "A 48-hour hackathon to develop innovative solutions for pressing social and environmental challenges.",
    date: "November 18-20, 2023",
    time: "Starts at 9:00 AM",
    location: "Mumbai Innovation Center",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "offline",
    rsvpLink: "https://example.com/rsvp",
    isPast: false
  }
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState<"all" | "online" | "offline">("all");
  const [showPastEvents, setShowPastEvents] = useState(false);

  const { data: events = mockEvents, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => Promise.resolve(mockEvents) // For now using mock data
    // queryFn: fetchEvents // Will use this when we start using real data
  });

  // Get current date for filtering past events
  const currentDate = new Date();
  
  // Filter events based on search query, event type, and whether to show past events
  const filteredEvents = events.filter(event => {
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by event type
    const matchesType = eventType === "all" || event.type === eventType;
    
    // Filter by past/upcoming
    const matchesPastFilter = showPastEvents || !event.isPast;
    
    return matchesSearch && matchesType && matchesPastFilter;
  });

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
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              location={event.location}
              image={event.image}
              type={event.type as "online" | "offline"}
              rsvpLink={event.rsvpLink}
              isPast={event.isPast}
            />
          ))}
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
