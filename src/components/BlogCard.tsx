
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
  tags: string[];
}

const BlogCard = ({
  id,
  title,
  excerpt,
  coverImage,
  author,
  date,
  category,
  likes,
  comments,
  tags,
}: BlogCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      checkIfLiked();
    }
  }, [user, id]);

  const checkIfLiked = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('blog_id', id)
      .eq('user_id', user.id)
      .single();
    
    setLiked(!!data);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
        setLikeCount(likeCount - 1);
      }
    } else {
      // Add like
      const { error } = await supabase
        .from('blog_likes')
        .insert({ blog_id: id, user_id: user.id });
      
      if (!error) {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    }
  };

  return (
    <div className="glass-card group overflow-hidden h-full flex flex-col">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <Link to={`/blogs/${id}`}>
          <img
            src={coverImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-2 left-2">
          <Badge className="bg-aasira-accent hover:bg-aasira-accent text-white">{category}</Badge>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="mb-2 flex gap-3 text-xs text-white/60">
          <div className="flex items-center">
            <User size={12} className="mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            <span>{date}</span>
          </div>
        </div>
        
        <Link to={`/blogs/${id}`} className="mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-aasira-accent transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-white/70 mb-4 flex-grow line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="inline-block text-xs py-1 px-2 rounded-full bg-aasira-secondary/30 text-white/80"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className="flex items-center text-sm text-white/70 hover:text-aasira-accent transition-colors"
              aria-label={liked ? "Unlike" : "Like"}
            >
              <Heart 
                size={16} 
                className="mr-1" 
                fill={liked ? "currentColor" : "none"} 
                color={liked ? "#9E72C3" : "currentColor"}
              />
              <span>{likeCount}</span>
            </button>
            
            <Link 
              to={`/blogs/${id}#comments`}
              className="flex items-center text-sm text-white/70 hover:text-aasira-accent transition-colors"
            >
              <MessageSquare size={16} className="mr-1" />
              <span>{comments}</span>
            </Link>
          </div>
          
          <Button asChild variant="link" size="sm" className="text-aasira-accent p-0">
            <Link to={`/blogs/${id}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
