
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Clock, BarChart, Clock3, Users, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

// Mock courses data
const mockCourses = [
  {
    id: "1",
    title: "Introduction to Python Programming",
    description: "A beginner-friendly course covering Python basics, data types, control flows, and simple applications.",
    level: "Beginner",
    duration: "6 weeks",
    price: 4999,
    instructor: "Anjali Mehta",
    instructorRole: "Senior Software Engineer",
    enrollments: 342,
    rating: 4.8,
    lessons: 24,
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["programming", "python", "beginner"],
    isPublished: true,
    comingSoon: false
  },
  {
    id: "2",
    title: "Data Analysis with R",
    description: "Learn to analyze and visualize data using R programming language and popular packages like ggplot2.",
    level: "Intermediate",
    duration: "8 weeks",
    price: 6999,
    instructor: "Dr. Rahul Kapoor",
    instructorRole: "Data Scientist",
    enrollments: 215,
    rating: 4.7,
    lessons: 32,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["data-science", "r-programming", "statistics"],
    isPublished: true,
    comingSoon: false
  },
  {
    id: "3",
    title: "Web Development Fundamentals",
    description: "Master the basics of HTML, CSS, and JavaScript to build responsive and interactive websites.",
    level: "Beginner",
    duration: "10 weeks",
    price: 5499,
    instructor: "Zara Ahmed",
    instructorRole: "Frontend Developer",
    enrollments: 427,
    rating: 4.9,
    lessons: 40,
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["web-development", "html", "css", "javascript"],
    isPublished: true,
    comingSoon: false
  },
  {
    id: "4",
    title: "Machine Learning Essentials",
    description: "An introduction to key machine learning concepts, algorithms, and practical applications.",
    level: "Advanced",
    duration: "12 weeks",
    price: 9999,
    instructor: "Dr. Priya Singh",
    instructorRole: "AI Researcher",
    enrollments: 189,
    rating: 4.6,
    lessons: 36,
    coverImage: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["machine-learning", "ai", "data-science"],
    isPublished: false,
    comingSoon: true
  },
  {
    id: "5",
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile applications for iOS and Android using Google's Flutter framework.",
    level: "Intermediate",
    duration: "8 weeks",
    price: 7499,
    instructor: "Vikram Reddy",
    instructorRole: "Mobile Developer",
    enrollments: 156,
    rating: 4.7,
    lessons: 30,
    coverImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    tags: ["mobile-development", "flutter", "dart"],
    isPublished: false,
    comingSoon: true
  }
];

const fetchCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
    
  if (error) throw error;
  return data || [];
};

const CourseCard = ({ course }: { course: any }) => {
  return (
    <Card className="glass-card h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={course.coverImage} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
        {course.comingSoon && (
          <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-xs font-semibold">
            Coming Soon
          </div>
        )}
        <Badge className="absolute top-2 left-2">
          {course.level}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">{course.title}</CardTitle>
        <div className="flex items-center mt-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-aasira-secondary text-white">
              {course.instructor.split(" ").map((n: string) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="text-sm font-medium text-white">{course.instructor}</p>
            <p className="text-xs text-white/60">{course.instructorRole}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-white/70 mb-4">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-aasira-accent" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1 text-aasira-accent" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-aasira-accent" />
            <span>{course.enrollments} enrolled</span>
          </div>
          <div className="flex items-center">
            <BarChart className="h-4 w-4 mr-1 text-aasira-accent" />
            <span>{course.level}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t border-white/10 pt-4">
        <div className="text-lg font-bold text-white">
          ₹{course.price}
        </div>
        
        {course.comingSoon ? (
          <Button disabled variant="outline" size="sm">
            Coming Soon
          </Button>
        ) : (
          <Button variant="default" size="sm" className="bg-aasira-accent hover:bg-aasira-accent/90">
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const { data: courses = mockCourses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => Promise.resolve(mockCourses) // For now using mock data
    // queryFn: fetchCourses // Will use this when we start using real data
  });

  // Filter courses based on search query and level
  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag: string) => tag.includes(searchQuery.toLowerCase()));
    
    const matchesLevel = selectedLevel === null || course.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  const levels = ["Beginner", "Intermediate", "Advanced"];

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
          {filteredCourses.map(course => (
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
