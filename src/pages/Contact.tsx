
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LocateIcon, Mail, Phone, Send, Loader2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      ]);
      
      if (error) throw error;
      
      toast.success("Your message has been sent successfully!");
      form.reset();
    } catch (error: any) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error submitting contact form:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-aasira-primary">
      <div className="container py-16 md:py-24">
        <SectionHeading
          subtitle="Get in Touch"
          title="Contact Us"
          description="Have questions or want to collaborate? Reach out to our team!"
          centered={true}
        />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 h-full">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-aasira-secondary/20 p-2 rounded-md mr-4">
                    <LocateIcon className="h-5 w-5 text-aasira-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Our Location</h4>
                    <p className="text-white/70 mt-1">
                      123 Innovation Hub, Koramangala<br />
                      Bengaluru, Karnataka 560034<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-aasira-secondary/20 p-2 rounded-md mr-4">
                    <Mail className="h-5 w-5 text-aasira-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Email Us</h4>
                    <p className="text-white/70 mt-1">
                      contact@aasira.org<br />
                      support@aasira.org
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-aasira-secondary/20 p-2 rounded-md mr-4">
                    <Phone className="h-5 w-5 text-aasira-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Call Us</h4>
                    <p className="text-white/70 mt-1">
                      +91 98765 43210<br />
                      +91 88888 99999
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="font-medium text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="bg-aasira-secondary/20 p-2 rounded-full hover:bg-aasira-accent/20 transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      {/* Replace with actual social icons */}
                      <div className="h-5 w-5 rounded-full bg-aasira-accent/40" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Send us a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} className="bg-aasira-secondary/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" type="email" {...field} className="bg-aasira-secondary/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject of your message" {...field} className="bg-aasira-secondary/10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your message here..." 
                            className="min-h-[150px] bg-aasira-secondary/10"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Map Placeholder */}
            <div className="mt-6 glass-card p-0 overflow-hidden">
              <div className="h-[300px] bg-aasira-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white/60">Map will be displayed here</div>
                  <div className="mt-2 text-xs text-white/40">Interactive map integration coming soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
