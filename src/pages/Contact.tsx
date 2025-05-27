
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
                      Noida, Uttar Pradesh<br />
                      Pune, Maharashtra<br />
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
                      teamaasira@gmail.com
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
                      +91 99716 14166<br />
                      +91 93150 32497
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="font-medium text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "instagram",
                      href: "https://www.instagram.com/aasira.official/",
                      svg: (
                        <svg
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="currentColor"
                        >
                          <title>Instagram</title>
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.797 2.163 15.418 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.735 0 8.332.013 7.052.072 5.775.13 4.63.435 3.68 1.385 2.73 2.335 2.425 3.48 2.367 4.758.012 8.735 0 8.132 0 12c0 3.868.012 3.265.072 4.548.058 1.278.363 2.423 1.313 3.373.95.95 2.095 1.255 3.373 1.313C8.132 23.987 8.735 24 12 24s3.265-.012 4.548-.072c1.278-.058 2.423-.363 3.373-1.313.95-.95 1.255-2.095 1.313-3.373.06-1.283.072-1.886.072-4.548s-.012-3.265-.072-4.548c-.058-1.278-.363-2.423-1.313-3.373-.95-.95-2.095-1.255-3.373-1.313C15.265.013 15.132 0 12 0zM12 5.838a6.162 6.162 0 1 0 6.162 6.162A6.156 6.156 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 3.999-3.999A3.996 3.996 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0 1.44 1.44 1.439 1.439 0 0 0-1.44-1.44z"/>
                        </svg>
                      ),
                    },
                    {
                      name: "linkedin",
                      href: "https://www.linkedin.com/company/aasira-stem-beyond-labels/",
                      svg: (
                        <svg
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="currentColor"
                        >
                          <title>LinkedIn</title>
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.599 0 4.264 2.368 4.264 5.448v6.295zM5.337 7.433a2.07 2.07 0 1 1 .001-4.14 2.07 2.07 0 0 1-.001 4.14zm1.777 13.019H3.561V9h3.553v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.723v20.554C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.277V1.723C24 .774 23.2 0 22.222 0z" />
                        </svg>
                      ),
                    },
                  ].map(({ name, svg, href }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-aasira-secondary/20 p-2 rounded-full hover:bg-aasira-accent/20 transition-colors text-white"
                    >
                      <span className="sr-only">{name}</span>
                      <div className="h-5 w-5 text-white">{svg}</div>
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
