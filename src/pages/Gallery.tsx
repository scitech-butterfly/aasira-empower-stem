
import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: number;
  url: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('id, url')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching gallery images:', error);
        } else {
          setGalleryImages(data || []);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <div className="min-h-screen bg-aasira-primary">
      <div className="container py-16 md:py-24">
        <SectionHeading
          subtitle="Our Journey"
          title="Collaboration Gallery"
          description="Explore moments from our workshops, mentorship programs, events, and community collaborations."
          centered={true}
        />

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aasira-accent mx-auto"></div>
            <p className="text-white/70 mt-4">Loading gallery...</p>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-white">No images found</h3>
            <p className="text-white/60 mt-2">Upload some images to get started</p>
          </div>
        ) : (
          /* Gallery Grid */
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-aasira-accent/50 transition-all duration-300"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={`Gallery image ${image.id}`}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-sm mb-1">Gallery Image</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Instructions */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Want to Add Your Photos?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            To add your collaboration photos to this gallery, you can upload them to your Supabase storage bucket and update the gallery data. 
            Here's how to integrate lots of photos:
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-aasira-accent mb-2">1. Supabase Storage</h4>
              <p className="text-white/70 text-sm">
                Create a storage bucket in Supabase, upload your images, and get their public URLs to add to the gallery_images table.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-aasira-accent mb-2">2. Database Integration</h4>
              <p className="text-white/70 text-sm">
                Add image URLs to the 'gallery_images' table in your database to dynamically display photos in the gallery.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-aasira-accent mb-2">3. Bulk Upload</h4>
              <p className="text-white/70 text-sm">
                Use Supabase's bulk upload feature or create an admin interface to easily add multiple photos at once.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold text-aasira-accent mb-2">4. Image Optimization</h4>
              <p className="text-white/70 text-sm">
                Consider using Supabase's image transformations to automatically resize and optimize images for better performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={selectedImage.url}
              alt={`Gallery image ${selectedImage.id}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-medium mb-2">Gallery Image</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
