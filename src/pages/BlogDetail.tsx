import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Heart, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const fetchBlogById = async (id: string) => {
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      blog_categories(name),
      profiles(full_name)
    `)
    .eq('id', id)
    .eq('published', true)
    .single();

  if (error) throw error;
  return data;
};

const fetchBlogTags = async (blogId: string) => {
  const { data, error } = await supabase
    .from('blog_posts_tags')
    .select(`
      blog_tags(name)
    `)
    .eq('blog_id', blogId);

  if (error) throw error;
  return data;
};

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  const { data: blogTags } = useQuery({
    queryKey: ['blog-tags', id],
    queryFn: () => fetchBlogTags(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aasira-primary via-aasira-primary/90 to-aasira-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-white/20 rounded mb-8"></div>
            <div className="h-6 bg-white/20 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-white/20 rounded w-1/2 mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aasira-primary via-aasira-primary/90 to-aasira-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Blog post not found</h1>
          <Button onClick={() => navigate('/blogs')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </div>
      </div>
    );
  }

  const tags = blogTags?.map(item => item.blog_tags?.name).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-aasira-primary via-aasira-primary/90 to-aasira-secondary py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          onClick={() => navigate('/blogs')} 
          variant="outline" 
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>

        <article className="glass-card p-8">
          {blog.cover_image && (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
            />
          )}

          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-4">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{blog.profiles?.full_name || 'Anonymous'}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
              {blog.blog_categories && (
                <Badge className="bg-aasira-accent hover:bg-aasira-accent text-white">
                  {blog.blog_categories.name}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {blog.title}
            </h1>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-block text-sm py-1 px-3 rounded-full bg-aasira-secondary/30 text-white/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <div 
              className="text-white/90 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center gap-6">
              <button className="flex items-center text-white/70 hover:text-aasira-accent transition-colors">
                <Heart size={20} className="mr-2" />
                <span>Like</span>
              </button>
              <button className="flex items-center text-white/70 hover:text-aasira-accent transition-colors">
                <MessageSquare size={20} className="mr-2" />
                <span>Comment</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;