import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Heart, MessageSquare, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

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

const fetchBlogComments = async (blogId: string) => {
  const { data, error } = await supabase
    .from('blog_comments')
    .select(`
      *,
      profiles(full_name, avatar_url)
    `)
    .eq('blog_id', blogId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

const fetchBlogStats = async (blogId: string) => {
  const [likesData, commentsCount] = await Promise.all([
    supabase.from("blog_likes").select("user_id").eq('blog_id', blogId),
    supabase.from("blog_comments").select("id", { count: 'exact' }).eq('blog_id', blogId)
  ]);

  return {
    likes: likesData.data?.length || 0,
    comments: commentsCount.count || 0,
    likedBy: likesData.data?.map(like => like.user_id) || []
  };
};

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

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

  const { data: comments = [] } = useQuery({
    queryKey: ['blog-comments', id],
    queryFn: () => fetchBlogComments(id!),
    enabled: !!id,
  });

  const { data: stats } = useQuery({
    queryKey: ['blog-stats', id],
    queryFn: () => fetchBlogStats(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (user && stats) {
      setLiked(stats.likedBy.includes(user.id));
    }
  }, [user, stats]);

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

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "destructive"
      });
      return;
    }

    if (liked) {
      // Remove like
      const { error } = await supabase
        .from('blog_likes')
        .delete()
        .eq('blog_id', id)
        .eq('user_id', user.id);
      
      if (!error) {
        setLiked(false);
        queryClient.invalidateQueries({ queryKey: ['blog-stats', id] });
      }
    } else {
      // Add like
      const { error } = await supabase
        .from('blog_likes')
        .insert({ blog_id: id, user_id: user.id });
      
      if (!error) {
        setLiked(true);
        queryClient.invalidateQueries({ queryKey: ['blog-stats', id] });
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment",
        variant: "destructive"
      });
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    
    const { error } = await supabase
      .from('blog_comments')
      .insert({
        blog_id: id,
        user_id: user.id,
        content: newComment.trim()
      });

    if (!error) {
      setNewComment("");
      queryClient.invalidateQueries({ queryKey: ['blog-comments', id] });
      queryClient.invalidateQueries({ queryKey: ['blog-stats', id] });
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive"
      });
    }
    
    setIsSubmittingComment(false);
  };

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
            <div className="flex items-center gap-6 mb-6">
              <button 
                onClick={handleLike}
                className="flex items-center text-white/70 hover:text-aasira-accent transition-colors"
              >
                <Heart 
                  size={20} 
                  className="mr-2" 
                  fill={liked ? "currentColor" : "none"}
                  color={liked ? "#9E72C3" : "currentColor"}
                />
                <span>{stats?.likes || 0} {liked ? 'Liked' : 'Like'}</span>
              </button>
              <div className="flex items-center text-white/70">
                <MessageSquare size={20} className="mr-2" />
                <span>{stats?.comments || 0} Comments</span>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Comments</h3>
              
              {/* Add Comment Form */}
              {user ? (
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    rows={3}
                  />
                  <Button 
                    type="submit" 
                    disabled={!newComment.trim() || isSubmittingComment}
                    className="bg-aasira-accent hover:bg-aasira-accent/80"
                  >
                    <Send size={16} className="mr-2" />
                    {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4 text-white/60">
                  <p>Please sign in to leave a comment</p>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment: any) => (
                  <div key={comment.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-aasira-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {comment.profiles?.full_name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-white">
                            {comment.profiles?.full_name || 'Anonymous'}
                          </h4>
                          <span className="text-xs text-white/50">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {comments.length === 0 && (
                  <div className="text-center py-8 text-white/50">
                    <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;