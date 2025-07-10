import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const galleryItems = [
    // Community Activities & Education
    {
      id: 1,
      src: "/images/pic 1.jpeg",
      alt: "Community education session",
      category: "education",
      title: "Community Learning Initiative",
      description: "Educational outreach program bringing learning opportunities directly to rural communities."
    },
    {
      id: 2,
      src: "/images/pic 2.jpeg",
      alt: "Children's education program",
      category: "education",
      title: "Empowering Young Minds",
      description: "Supporting children's education through innovative learning methods and community engagement."
    },
    {
      id: 3,
      src: "/images/pic 3.jpeg",
      alt: "Educational workshop in progress",
      category: "education",
      title: "Interactive Learning Workshop",
      description: "Hands-on educational sessions designed to make learning engaging and accessible for all."
    },
    {
      id: 5,
      src: "/images/pic 5.jpeg",
      alt: "Community gathering for awareness",
      category: "events",
      title: "Community Awareness Campaign",
      description: "Organizing awareness programs to educate communities about their rights and opportunities."
    },
    {
      id: 6,
      src: "/images/pic 6.jpeg",
      alt: "Relief distribution event",
      category: "relief",
      title: "Emergency Relief Distribution",
      description: "Providing essential supplies and support during times of crisis and natural disasters."
    },
    {
      id: 7,
      src: "/images/pic 7.jpeg",
      alt: "Women empowerment session",
      category: "empowerment",
      title: "Women's Empowerment Program",
      description: "Training and empowering women with skills and knowledge for economic independence."
    },
    {
      id: 8,
      src: "/images/pic 8.jpeg",
      alt: "Legal aid consultation",
      category: "legal",
      title: "Legal Aid & Consultation",
      description: "Providing free legal consultation and support to marginalized communities."
    },
    {
      id: 9,
      src: "/images/pic 9.jpeg",
      alt: "Youth engagement activity",
      category: "events",
      title: "Youth Leadership Development",
      description: "Engaging youth in leadership activities and community development initiatives."
    },
    {
      id: 10,
      src: "/images/pic 10.jpeg",
      alt: "Rural development program",
      category: "education",
      title: "Rural Development Initiative",
      description: "Comprehensive rural development programs focusing on education and skill building."
    },
    {
      id: 11,
      src: "/images/pic 11.jpeg",
      alt: "Community celebration event",
      category: "events",
      title: "Community Unity Celebration",
      description: "Celebrating achievements and fostering unity within the communities we serve."
    }
  ];

  const categories = [
    { value: "all", label: "All", count: galleryItems.length },
    { value: "education", label: "Education", count: galleryItems.filter(item => item.category === "education").length },
    { value: "empowerment", label: "Women Empowerment", count: galleryItems.filter(item => item.category === "empowerment").length },
    { value: "legal", label: "Legal Aid", count: galleryItems.filter(item => item.category === "legal").length },
    { value: "relief", label: "Emergency Relief", count: galleryItems.filter(item => item.category === "relief").length },
    { value: "events", label: "Events & Campaigns", count: galleryItems.filter(item => item.category === "events").length },
    { value: "team", label: "Our Team", count: galleryItems.filter(item => item.category === "team").length }
  ];

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);

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
                  poster="/images/pic 1.jpeg"
                >
                  <source src="/Welcome video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-koshish-blue">Welcome to Koshish</h3>
                <p className="text-gray-600">An introduction to our mission, vision, and the communities we serve.</p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="/images/pic 5.jpeg" 
                  alt="Community impact story"
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
                <h3 className="text-xl font-semibold text-koshish-blue">Community Impact Stories</h3>
                <p className="text-gray-600">Real stories of transformation from the communities we work with.</p>
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
