import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      
      // Fallback/local images to always include
      const fallbackImages = [
        {
          id: "local-1",
          src: "/images/pic 1.jpeg",
          alt: "Children participating in an educational workshop.",
          title: "Education Workshop",
          description: "Children participating in an educational workshop."
        },
        {
          id: "local-2",
          src: "/images/pic 2.jpeg",
          alt: "Women empowerment session in progress.",
          title: "Women Empowerment",
          description: "Women empowerment session in progress."
        },
        {
          id: "local-3",
          src: "/images/pic 3.jpeg",
          alt: "Community members at a health camp.",
          title: "Health Camp",
          description: "Community members at a health camp."
        },
        {
          id: "local-4",
          src: "/images/Food Distribution at MMuzaffarpur.JPG",
          alt: "Food distribution at Muzaffarpur during relief efforts.",
          title: "Food Distribution - Muzaffarpur",
          description: "Food distribution at Muzaffarpur during relief efforts."
        },
        {
          id: "local-5",
          src: "/images/pic 6.jpeg",
          alt: "Legal aid camp for rural families.",
          title: "Legal Aid Camp",
          description: "Legal aid camp for rural families."
        },
        {
          id: "local-6",
          src: "/images/pic 7.jpeg",
          alt: "Team Koshish celebrating a successful campaign.",
          title: "Successful Campaign",
          description: "Team Koshish celebrating a successful campaign."
        },
        {
          id: "local-7",
          src: "/images/pic 8.jpeg",
          alt: "Skill development training for youth.",
          title: "Skill Development",
          description: "Skill development training for youth."
        },
        {
          id: "local-8",
          src: "/images/pic 9.jpeg",
          alt: "Environmental awareness rally.",
          title: "Environment Rally",
          description: "Environmental awareness rally."
        },
        {
          id: "local-9",
          src: "/images/pic 10.jpeg",
          alt: "Volunteers planting trees for sustainability.",
          title: "Tree Plantation",
          description: "Volunteers planting trees for sustainability."
        },
        {
          id: "local-10",
          src: "/images/pic 11.jpeg",
          alt: "Community outreach and engagement activities.",
          title: "Community Outreach",
          description: "Community outreach and engagement activities."
        },
        {
          id: "local-11",
          src: "/images/Dignity kits distribution in Patna (4).jpg",
          alt: "Dignity kits distribution in Patna for women empowerment.",
          title: "Dignity Kits Distribution - Patna",
          description: "Dignity kits distribution in Patna for women empowerment."
        },
        {
          id: "local-12",
          src: "/images/DSC_8067.JPG",
          alt: "Community development program documentation.",
          title: "Community Development Program",
          description: "Community development program documentation."
        },
        {
          id: "local-13",
          src: "/images/DSC_8079.JPG",
          alt: "Field activities and community engagement.",
          title: "Field Activities",
          description: "Field activities and community engagement."
        }
      ];

      try {
        // Fetch database images
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        let databaseImages: any[] = [];
        
        if (!error && data) {
          databaseImages = data
            .filter((item: any) => {
              // Filter out invalid URLs
              const url = item.image_url;
              if (!url || url.length < 10) return false;
              if (url.startsWith('blob:')) return false;
              if (!url.startsWith('http') && !url.startsWith('/')) return false;
              return true;
            })
            .map((item: any) => ({
              id: `db-${item.id}`,
              src: item.image_url,
              alt: item.description || item.title,
              title: item.title,
              description: item.description || "",
              isFromDatabase: true
            }));

          // Temporary debug info for troubleshooting
          if (data.length > 0) {
            console.log('🔍 Admin Panel Debug Info:');
            console.log(`   Total database entries: ${data.length}`);
            console.log(`   Valid entries after filtering: ${databaseImages.length}`);
            data.forEach((item, index) => {
              console.log(`   ${index + 1}. "${item.title}" - ${item.image_url}`);
            });
          }
        }

        // Combine database images (first) with fallback images
        const allImages = [...databaseImages, ...fallbackImages];
        setGalleryItems(allImages);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // If there's an error, just show fallback images
        setGalleryItems(fallbackImages);
      }
      
      setLoading(false);
    };

    fetchGallery();

    // Set up real-time subscription for gallery updates
    const subscription = supabase
      .channel('gallery-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'gallery' },
        () => {
          console.log('Gallery updated, refreshing...');
          fetchGallery();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen font-poppins">
      <Helmet>
        <title>Koshish NGO - Gallery</title>
        <meta name="description" content="View the gallery of Koshish NGO's events, activities, and community work." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Gallery</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Witness the impact of our work through these moments captured from our programs and events.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedImage(item.src)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={item.src} 
                    alt={item.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Hide broken images completely
                      const parentDiv = e.currentTarget.closest('.group') as HTMLElement;
                      if (parentDiv) {
                        parentDiv.style.display = 'none';
                      }
                    }}
                  />
                  {item.isFromDatabase && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {galleryItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No images found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Achievements & Certificates Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-gold/10 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Recognition & Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our work has been recognized by various organizations and institutions for its impact and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-koshish-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-koshish-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-koshish-blue mb-2">BSDM Certificate</h3>
                <p className="text-gray-600">Certification for excellence in social development and community mobilization.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-koshish-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-koshish-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-koshish-blue mb-2">Namati Justice Prize</h3>
                <p className="text-gray-600">Recognition for outstanding work in legal empowerment and access to justice.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-koshish-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-koshish-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-koshish-blue mb-2">Credibility Alliance</h3>
                <p className="text-gray-600">Certified member of Credibility Alliance for transparency and accountability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Stories in Motion</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch the stories of transformation and hope through our video testimonials and welcome message.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <video 
                  controls
                  className="w-full h-full object-cover"
                  poster="/logo/logo.png"
                >
                  <source src="/video 2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-koshish-blue">Malnutrition Management</h3>
                <p className="text-gray-600">Our comprehensive programs addressing malnutrition and ensuring proper nutrition for vulnerable communities.</p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <video 
                  controls
                  className="w-full h-full object-cover"
                  poster="/logo/logo.png"
                >
                  <source src="/video 3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-koshish-blue">History of Koshish</h3>
                <p className="text-gray-600">Learn about our journey, milestones, and the evolution of our organization since 1997.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Gallery image"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;
