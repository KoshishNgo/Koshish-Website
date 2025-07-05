
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const galleryItems = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      alt: "Children in classroom",
      category: "education",
      title: "Mobile Education Unit in Action",
      description: "Teaching children in a remote village through our mobile classroom program."
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop",
      alt: "Women empowerment workshop",
      category: "empowerment",
      title: "Skill Development Workshop",
      description: "Women learning tailoring skills as part of our empowerment program."
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
      alt: "Legal aid session",
      category: "legal",
      title: "Legal Aid Consultation",
      description: "Providing free legal consultation to migrant workers."
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop",
      alt: "Food distribution",
      category: "relief",
      title: "Emergency Food Distribution",
      description: "Distributing food packets during the COVID-19 lockdown."
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&h=400&fit=crop",
      alt: "Community gathering",
      category: "events",
      title: "Community Awareness Program",
      description: "Conducting awareness session about women's rights in rural areas."
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      alt: "Children studying",
      category: "education",
      title: "Street Children Education",
      description: "Teaching street children basic literacy and numeracy skills."
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop",
      alt: "Women's shelter",
      category: "empowerment",
      title: "Women's Rehabilitation Center",
      description: "Safe shelter providing support to women escaping domestic violence."
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
      alt: "Volunteer training",
      category: "events",
      title: "Volunteer Training Session",
      description: "Training new volunteers on community outreach programs."
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop",
      alt: "Disaster relief",
      category: "relief",
      title: "Flood Relief Operations",
      description: "Providing immediate relief to flood-affected families in Bihar."
    }
  ];

  const categories = [
    { value: "all", label: "All", count: galleryItems.length },
    { value: "education", label: "Education", count: galleryItems.filter(item => item.category === "education").length },
    { value: "empowerment", label: "Women Empowerment", count: galleryItems.filter(item => item.category === "empowerment").length },
    { value: "legal", label: "Legal Aid", count: galleryItems.filter(item => item.category === "legal").length },
    { value: "relief", label: "Emergency Relief", count: galleryItems.filter(item => item.category === "relief").length },
    { value: "events", label: "Events & Campaigns", count: galleryItems.filter(item => item.category === "events").length }
  ];

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen font-poppins">
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

      {/* Filter Buttons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                onClick={() => setFilter(category.value)}
                variant={filter === category.value ? "default" : "outline"}
                className={`${
                  filter === category.value 
                    ? "bg-koshish-blue text-white" 
                    : "border-koshish-blue text-koshish-blue hover:bg-koshish-blue hover:text-white"
                }`}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
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
                  />
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

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No images found for the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Stories in Motion</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch the stories of transformation and hope through our video testimonials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" 
                  alt="Educational success story"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-koshish-gold rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-koshish-blue ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-koshish-blue">From Streets to Success</h3>
                <p className="text-gray-600">Watch Ravi's journey from a street child to a successful student.</p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop" 
                  alt="Women empowerment story"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-koshish-gold rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-koshish-blue ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-koshish-blue">Empowered and Independent</h3>
                <p className="text-gray-600">Sunita's transformation from victim to successful entrepreneur.</p>
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
