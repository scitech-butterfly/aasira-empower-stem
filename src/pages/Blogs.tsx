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
  console.log("🔍 Fetching blogs...");
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      blog_categories!blogs_category_id_fkey(name),
      profiles!fk_blogs_author(full_name)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false });

  console.log("📊 Raw blogs data:", data);
  console.log("❌ Blogs error:", error);
  
  if (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
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

  const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: fetchBlogCategories
  });

  const { data: tags = [], isLoading: isTagsLoading, error: tagsError } = useQuery({
    queryKey: ["blogTags"],
    queryFn: fetchBlogTags
  });

  const { data: blogs = [], isLoading: isBlogsLoading, error: blogsError } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs
  });

  const { data: blogPostsTags = [], error: blogPostsTagsError } = useQuery({
    queryKey: ["blogPostsTags"],
    queryFn: fetchBlogPostsTags
  });

  const { data: blogStats, error: blogStatsError } = useQuery({
    queryKey: ["blogStats"],
    queryFn: fetchBlogStats
  });

  /* Debug logging
  useEffect(() => {
    console.log("🐛 Debug Info:");
    console.log("- Categories:", categories);
    console.log("- Tags:", tags);
    console.log("- Blogs:", blogs);
    console.log("- Blog Posts Tags:", blogPostsTags);
    console.log("- Blog Stats:", blogStats);
    console.log("- Errors:", {
      categoriesError,
      tagsError,
      blogsError,
      blogPostsTagsError,
      blogStatsError
    });
  }, [categories, tags, blogs, blogPostsTags, blogStats, categoriesError, tagsError, blogsError, blogPostsTagsError, blogStatsError]); */

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

  console.log("🔍 Filtered blogs:", filteredBlogs);

  // Show error states
  if (blogsError) {
    return (
      <div className="min-h-screen bg-aasira-primary flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl font-bold mb-2">Error Loading Blogs</h2>
          <p className="text-red-400">{blogsError.message}</p>
          <pre className="mt-4 p-4 bg-black/20 rounded text-left text-sm overflow-auto">
            {JSON.stringify(blogsError, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (isBlogsLoading) {
    return (
      <div className="min-h-screen bg-aasira-primary flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="animate-spin text-aasira-accent mx-auto mb-4" size={32} />
          <p>Loading blogs...</p>
        </div>
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

        {/* Debug Info Panel - Remove this in production */}
        <div className="mb-8 p-4 bg-black/20 rounded text-white text-sm">
          <h4 className="font-bold mb-2">Debug Info:</h4>
          <p>Total blogs fetched: {blogs.length}</p>
          <p>Filtered blogs: {filteredBlogs.length}</p>
          <p>Selected category: {selectedCategory || "None"}</p>
          <p>Selected tag: {selectedTag || "None"}</p>
          <p>Search query: "{searchQuery}"</p>
          {blogs.length > 0 && (
            <details className="mt-2">
              <summary className="cursor-pointer">View first blog data</summary>
              <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify(blogs[0], null, 2)}
              </pre>
            </details>
          )}
        </div>

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

        {filteredBlogs.length === 0 && blogs.length > 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-white">No blogs match your filters</h3>
            <p className="text-white/60 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {blogs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-white">No blogs found</h3>
            <p className="text-white/60 mt-2">No published blogs are available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
