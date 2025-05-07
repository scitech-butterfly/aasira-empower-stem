
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const fetchBlogCategories = async () => {
  const { data, error } = await supabase.from("blog_categories").select("*");
  if (error) throw error;
  return data;
};

const fetchBlogTags = async () => {
  const { data, error } = await supabase.from("blog_tags").select("*");
  if (error) throw error;
  return data;
};

// Mock data for now since we don't have real blogs yet
const mockBlogs = [
  {
    id: "1",
    title: "Breaking the Glass Ceiling in Tech",
    excerpt: "Strategies and stories from women who have overcome barriers in the technology sector.",
    coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Dr. Priya Sharma",
    date: "May 15, 2023",
    category: "Women in STEM",
    likes: 42,
    comments: 8,
    tags: ["leadership", "career-development", "technology"]
  },
  {
    id: "2",
    title: "The Future of AI Research in India",
    excerpt: "Exploring how Indian institutions are contributing to global advancements in artificial intelligence.",
    coverImage: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Anika Patel",
    date: "April 28, 2023",
    category: "Industry Insights",
    likes: 37,
    comments: 12,
    tags: ["artificial-intelligence", "research", "innovation"]
  },
  {
    id: "3",
    title: "Mentorship Programs for Young Women in STEM",
    excerpt: "How guidance from experienced professionals can shape careers and break stereotypes.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Meera Desai",
    date: "March 12, 2023",
    category: "Diversity & Inclusion",
    likes: 54,
    comments: 9,
    tags: ["mentorship", "education", "career-development"]
  },
  {
    id: "4",
    title: "Coding Bootcamps vs. Traditional CS Degrees",
    excerpt: "Analyzing different paths to tech careers and which might be right for you.",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Sanjay Kumar",
    date: "February 20, 2023",
    category: "Tech Education",
    likes: 28,
    comments: 15,
    tags: ["education", "programming", "career-development"]
  },
  {
    id: "5",
    title: "Women Pioneers in Mathematics: Untold Stories",
    excerpt: "Celebrating the achievements and contributions of women mathematicians throughout history.",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Dr. Lakshmi Iyer",
    date: "January 30, 2023",
    category: "Women in STEM",
    likes: 61,
    comments: 7,
    tags: ["research", "education", "leadership"]
  },
  {
    id: "6",
    title: "Building Inclusive Engineering Teams",
    excerpt: "Best practices for creating diverse and supportive work environments in STEM fields.",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Rajan Malhotra",
    date: "December 5, 2022",
    category: "Diversity & Inclusion",
    likes: 49,
    comments: 13,
    tags: ["leadership", "mentorship", "engineering"]
  }
];

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: fetchBlogCategories
  });

  const { data: tags = [], isLoading: isTagsLoading } = useQuery({
    queryKey: ["blogTags"],
    queryFn: fetchBlogTags
  });

  // Filter blogs based on selected category, tag, and search query
  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    const matchesSearch = !searchQuery || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesCategory && matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-aasira-primary">
      <div className="container py-16 md:py-24">
        <SectionHeading
          subtitle="Knowledge Center"
          title="Our Blogs"
          description="Explore articles on STEM education, career development, diversity, and innovation."
          centered={true}
        />

        {/* Search and Filter */}
        <div className="mb-8 mt-10 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <Input
              type="search"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-aasira-secondary/10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-4">
            <Badge 
              variant={selectedCategory === null ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Badge>
            
            {isCategoriesLoading ? (
              <Loader2 className="animate-spin text-aasira-accent" size={16} />
            ) : (
              categories.map((category: any) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.name ? "secondary" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Badge>
              ))
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Badge 
            variant={selectedTag === null ? "secondary" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedTag(null)}
          >
            All Tags
          </Badge>
          
          {isTagsLoading ? (
            <Loader2 className="animate-spin text-aasira-accent" size={16} />
          ) : (
            tags.map((tag: any) => (
              <Badge
                key={tag.id}
                variant={selectedTag === tag.slug ? "secondary" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(tag.slug)}
              >
                #{tag.name}
              </Badge>
            ))
          )}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredBlogs.map(blog => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              coverImage={blog.coverImage}
              author={blog.author}
              date={blog.date}
              category={blog.category}
              likes={blog.likes}
              comments={blog.comments}
              tags={blog.tags}
            />
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-white">No blogs found</h3>
            <p className="text-white/60 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
