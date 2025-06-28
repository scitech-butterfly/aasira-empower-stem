import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Clock, BarChart, Users, Search, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const fetchCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      course_enrollments(count)
    `)
    .eq("is_published", true)
    .order("created_at", { ascending: false });
    
  if (error) throw error;
  return data || [];
};

const CourseCard = ({ course }: { course: any }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { toast } = useToast();

  const handleEnrollment = async () => {
    try {
      setIsEnrolling(true);
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to enroll in courses.",
          variant: "destructive",
        });
        return;
      }

      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from("course_enrollments")
        .select("id")
        .eq("course_id", course.id)
        .eq("user_id", user.id)
        .single();

      if (existingEnrollment) {
        toast({
          title: "Already Enrolled",
          description: "You are already enrolled in this course.",
          variant: "default",
        });
        return;
      }

      // Create enrollment record
      const { error } = await supabase
        .from("course_enrollments")
        .insert({
          course_id: course.id,
          user_id: user.id,
          payment_status: course.price > 0 ? "pending" : "completed"
        });

      if (error) throw error;

      if (course.price > 0) {
        toast({
          title: "Enrollment Started",
          description: "Please complete payment to finalize enrollment.",
          variant: "default",
        });
        // Here you would integrate with your payment system
        // For now, we'll just show a message
      } else {
        toast({
          title: "Enrollment Successful",
          description: "You have been enrolled in the course!",
          variant: "default",
        });
      }

    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling in the course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <Card className="glass-card h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={course.cover_image || "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 left-2">
          {course.level}
        </Badge>
        {course.price === 0 && (
          <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700">
            Free
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">{course.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-white/70 mb-4">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-aasira-accent" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-aasira-accent" />
            <span>{course.course_enrollments?.length || 0} enrolled</span>
          </div>
          <div className="flex items-center">
            <BarChart className="h-4 w-4 mr-1 text-aasira-accent" />
            <span>{course.level}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t border-white/10 pt-4">
        <div className="text-lg font-bold text-white">
          {course.price > 0 ? `₹${course.price}` : "Free"}
        </div>
        
        <Button 
          variant="default" 
          size="sm" 
          className="bg-aasira-accent hover:bg-aasira-accent/90"
          onClick={handleEnrollment}
          disabled={isEnrolling}
        >
          {isEnrolling ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enrolling...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Enroll Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses
  });

  // Filter courses based on search query and level
  const filteredCourses = courses.filter((course: any) => {
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevel === null || course.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const levels = ["Beginner", "Intermediate", "Advanced"];

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
          subtitle="Learn with Aasira"
          title="Our Courses"
          description="Master new skills and advance your career with our specialized STEM courses."
          centered={true}
        />
        
        {/* Search and Filter */}
        <div className="my-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            <Input
              type="search"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-aasira-secondary/10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedLevel === null ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedLevel(null)}
            >
              All Levels
            </Badge>
            
            {levels.map((level) => (
              <Badge
                key={level}
                variant={selectedLevel === level ? "secondary" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-white">No courses found</h3>
            <p className="text-white/60 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
