import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, User, Calendar } from "lucide-react";

const Profile = () => {
  const { user, profile } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/70">Manage your account information</p>
        </div>

        <Card className="glass-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-aasira-accent text-white text-xl">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-white">
              {profile?.full_name || "User"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <Mail className="h-5 w-5 text-aasira-accent" />
              <div>
                <p className="text-sm text-white/70">Email</p>
                <p className="text-white">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <User className="h-5 w-5 text-aasira-accent" />
              <div>
                <p className="text-sm text-white/70">Full Name</p>
                <p className="text-white">{profile?.full_name || "Not set"}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
              <Calendar className="h-5 w-5 text-aasira-accent" />
              <div>
                <p className="text-sm text-white/70">Member since</p>
                <p className="text-white">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;