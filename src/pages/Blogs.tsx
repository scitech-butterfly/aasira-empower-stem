
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

const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      blog_categories!category_id(name),
      profiles!author_id(full_name)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

const fetchBlogPostsTags = async () => {
  const { data, error } = await supabase
    .from("blog_posts_tags")
    .select(`
      blog_id,
      blog_tags!tag_id(name, slug)
    `);
  
  if (error) throw error;
  return data;
};

const fetchBlogStats = async () => {
  const [likesData, commentsData] = await Promise.all([
    supabase.from("blog_likes").select("blog_id"),
    supabase.from("blog_comments").select("blog_id")
  ]);

  const likesCount = likesData.data?.reduce((acc: Record<string, number>, like) => {
    acc[like.blog_id] = (acc[like.blog_id] || 0) + 1;
    return acc;
  }, {}) || {};

  const commentsCount = commentsData.data?.reduce((acc: Record<string, number>, comment) => {
    acc[comment.blog_id] = (acc[comment.blog_id] || 0) + 1;
    return acc;
  }, {}) || {};

  return { likesCount, commentsCount };
};

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

  const { data: blogs = [], isLoading: isBlogsLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs
  });

  const { data: blogPostsTags = [] } = useQuery({
    queryKey: ["blogPostsTags"],
    queryFn: fetchBlogPostsTags
  });

  const { data: blogStats } = useQuery({
    queryKey: ["blogStats"],
    queryFn: fetchBlogStats
  });

  // Create a map of blog IDs to their tags
  const blogTagsMap = blogPostsTags.reduce((acc: Record<string, any[]>, item) => {
    if (!acc[item.blog_id]) {
      acc[item.blog_id] = [];
    }
    if (item.blog_tags) {
      acc[item.blog_id].push(item.blog_tags);
    }
    return acc;
  }, {});

  // Filter blogs based on selected category, tag, and search query
  const filteredBlogs = blogs.filter((blog: any) => {
    const matchesCategory = !selectedCategory || blog.blog_categories?.name === selectedCategory;
    const matchesTag = !selectedTag || blogTagsMap[blog.id]?.some((tag: any) => tag.slug === selectedTag);
    const matchesSearch = !searchQuery || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesCategory && matchesTag && matchesSearch;
  });

  if (isBlogsLoading) {
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
          {filteredBlogs.map((blog: any) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              excerpt={blog.content.substring(0, 150) + "..."}
              coverImage={blog.cover_image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
              author={blog.profiles?.full_name || "Anonymous"}
              date={new Date(blog.created_at).toLocaleDateString()}
              category={blog.blog_categories?.name || "General"}
              likes={blogStats?.likesCount[blog.id] || 0}
              comments={blogStats?.commentsCount[blog.id] || 0}
              tags={blogTagsMap[blog.id]?.map((tag: any) => tag.slug) || []}
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
