import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  Users, 
  Heart, 
  Building2, 
  Leaf, 
  Shield, 
  Sprout, 
  GraduationCap,
  Gavel
} from "lucide-react";

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const themes = [
    {
      id: 1,
      title: "Youth Empowerment",
      summary: "Empowering youth through education, skill-building, and leadership opportunities.",
      image: "/theme/youth 1.jpeg",
      fallbackImage: "/theme/youth 2.jpeg",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: GraduationCap,
      quote: "The youth are the hope of our future.",
      source: "Jose Rizal",
      activities: [
        "Career guidance workshops",
        "Skill development programs",
        "Leadership training",
        "Youth engagement campaigns"
      ],
      whyMatters: "Empowering youth is essential for building a progressive and dynamic society.",
      successStory: "Many young individuals have found new opportunities and confidence through our youth programs.",
      getInvolved: "Mentor, volunteer, or support our youth initiatives to help shape future leaders.",
    },
    {
      id: 2,
      title: "Women & Children",
      summary: "Supporting women and children for a brighter, safer, and healthier future.",
      image: "/theme/women and children 1.jpeg",
      fallbackImage: "/theme/women and children 2.jpeg",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      icon: Users,
      quote: "Every woman and child deserves a life of dignity and opportunity.",
      source: "Unknown",
      activities: [
        "Health and nutrition camps",
        "Education support",
        "Protection and advocacy",
        "Empowerment workshops"
      ],
      whyMatters: "Women and children are the foundation of a healthy and prosperous society.",
      successStory: "Our programs have helped women and children access vital resources and opportunities.",
      getInvolved: "Volunteer or donate to support women and children in need.",
    },
    {
      id: 3,
      title: "Relief Work & Disaster Response",
      summary: "Providing timely relief and building resilience in disaster-affected communities.",
      image: "/theme/relief work and drr 1.jpeg",
      fallbackImage: "/theme/relief work and drr 2.jpeg",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: Shield,
      quote: "In times of crisis, every helping hand counts.",
      source: "Unknown",
      activities: [
        "Emergency relief distribution",
        "Disaster preparedness training",
        "Community resilience building",
        "Psychosocial support"
      ],
      whyMatters: "Disaster response saves lives and helps communities recover faster.",
      successStory: "Thousands have received timely aid and support during disasters.",
      getInvolved: "Join our relief efforts or contribute resources for disaster response.",
    },
    {
      id: 4,
      title: "Environment & Sustainable Agriculture",
      summary: "Promoting eco-friendly practices and sustainable agriculture for a greener tomorrow.",
      image: "/theme/enviroment and sustainable agriculture.jpeg",
      fallbackImage: "/theme/protection and conservation of enviromnt 1.jpeg",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: Leaf,
      quote: "Protecting the environment is protecting our future.",
      source: "Unknown",
      activities: [
        "Tree plantation drives",
        "Organic farming workshops",
        "Clean-up campaigns",
        "Sustainability awareness"
      ],
      whyMatters: "Sustainable agriculture and environment care are vital for future generations.",
      successStory: "Our green initiatives have led to cleaner, greener communities.",
      getInvolved: "Participate in eco-friendly events or support our sustainability projects.",
    },
    {
      id: 5,
      title: "Human Rights",
      summary: "Advocating for justice, equality, and protection of human rights for all.",
      image: "/theme/human rights 1.jpeg",
      fallbackImage: "/theme/human rights 2.jpeg",
      color: "text-red-600",
      bgColor: "bg-red-50",
      icon: Scale,
      quote: "Human rights are for everyone, everywhere.",
      source: "Unknown",
      activities: [
        "Legal aid camps",
        "Rights awareness workshops",
        "Advocacy campaigns",
        "Community mobilization"
      ],
      whyMatters: "Human rights advocacy ensures dignity and justice for all.",
      successStory: "Many have found justice and support through our human rights programs.",
      getInvolved: "Support our advocacy or volunteer for rights awareness.",
    },
    {
      id: 6,
      title: "Peace & Harmony",
      summary: "Fostering peace, harmony, and social cohesion within communities.",
      image: "/theme/peace and harmony 1.jpeg",
      fallbackImage: "/theme/peace and harmony 2.jpeg",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: Heart,
      quote: "Peace begins with understanding and respect.",
      source: "Unknown",
      activities: [
        "Interfaith dialogues",
        "Community peace events",
        "Conflict resolution workshops",
        "Social harmony campaigns"
      ],
      whyMatters: "Peace and harmony are the foundation of a thriving society.",
      successStory: "Our peace initiatives have brought communities together in understanding.",
      getInvolved: "Join our peace-building activities or support harmony campaigns.",
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string) => {
    const target = e.target as HTMLImageElement;
    target.src = fallback;
  };

  const handleFallbackError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop";
  };

  return (
    <div className="min-h-screen font-poppins">
      <Helmet>
        <title>Koshish NGO - Our Themes & Focus Areas</title>
        <meta name="description" content="Explore the key focus areas and themes of Koshish NGO's work in human rights, women empowerment, environment, and social justice." />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Themes & Focus Areas</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Discover the diverse areas where Koshish works to create lasting social change and empower communities across Bihar and Jharkhand.
          </p>
        </div>
      </section>

      {/* Themes Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => (
              <Card 
                key={theme.id} 
                className={`group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border-2 ${theme.color} ${theme.bgColor} bg-white`}
                onClick={() => {
                  setSelectedTheme(selectedTheme === theme.id ? null : theme.id);
                  setTimeout(() => {
                    if (!selectedTheme && detailRef.current) {
                      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => handleImageError(e, theme.fallbackImage)}
                    onErrorCapture={(e) => handleFallbackError(e)}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                      <theme.icon className="w-6 h-6 text-koshish-blue" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-koshish-blue transition-colors">
                    {theme.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {theme.summary.substring(0, 140)}...
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-koshish-blue hover:text-white hover:border-koshish-blue transition-all duration-300"
                  >
                    {selectedTheme === theme.id ? 'Hide Details' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed View */}
      {selectedTheme && (
        <section ref={detailRef} className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {themes
              .filter(theme => theme.id === selectedTheme)
              .map(theme => (
                <div key={theme.id} className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-koshish-blue rounded-lg shadow-lg mb-6">
                      <theme.icon className="w-8 h-8 text-koshish-blue" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                      {theme.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-koshish-blue shadow-sm">
                        <blockquote className="text-lg italic text-gray-700 mb-3 leading-relaxed">
                          "{theme.quote}"
                        </blockquote>
                        <cite className="text-sm font-semibold text-koshish-blue">
                          — {theme.source}
                        </cite>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Approach</h3>
                        <p className="text-gray-600 leading-relaxed text-base">
                          {theme.summary}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={theme.image}
                          alt={theme.title}
                          className="w-full h-full object-cover"
                          onError={(e) => handleImageError(e, theme.fallbackImage)}
                          onErrorCapture={(e) => handleFallbackError(e)}
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Activities</h3>
                        <div className="space-y-3">
                          {theme.activities.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-koshish-blue rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm leading-relaxed">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why This Matters */}
                  {theme.whyMatters && (
                    <div className="bg-blue-50 border-l-4 border-blue-300 p-6 rounded-lg shadow-sm mb-6">
                      <h4 className="text-xl font-semibold text-blue-800 mb-2">Why This Matters</h4>
                      <p className="text-gray-700 text-base">{theme.whyMatters}</p>
                    </div>
                  )}

                  {/* Success Story */}
                  {theme.successStory && (
                    <div className="bg-green-50 border-l-4 border-green-300 p-6 rounded-lg shadow-sm mb-6">
                      <h4 className="text-xl font-semibold text-green-800 mb-2">Success Story</h4>
                      <p className="text-gray-700 text-base">{theme.successStory}</p>
                    </div>
                  )}

                  {/* Get Involved */}
                  {theme.getInvolved && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-300 p-6 rounded-lg shadow-sm mb-6">
                      <h4 className="text-xl font-semibold text-yellow-800 mb-2">Get Involved</h4>
                      <p className="text-gray-700 text-base">{theme.getInvolved}</p>
                    </div>
                  )}

                  <div className="text-center pt-8">
                    <Button 
                      onClick={() => setSelectedTheme(null)}
                      variant="outline"
                      className="border-koshish-blue text-koshish-blue hover:bg-koshish-blue hover:text-white px-8 py-3 font-semibold"
                    >
                      Close Details
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 leading-relaxed">
            Together, we can create meaningful change across all these focus areas. 
            Your support helps us continue our vital work in communities that need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold px-8 py-3"
            >
              Support Our Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-koshish-blue font-semibold px-8 py-3"
            >
              Volunteer With Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Theme;
