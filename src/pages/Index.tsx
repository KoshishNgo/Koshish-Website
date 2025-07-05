
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import { 
  Users, 
  Heart, 
  GraduationCap, 
  Scale, 
  Shield, 
  Truck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const stats = [
    { number: 5000, label: "Lives Touched", suffix: "+" },
    { number: 150, label: "Volunteers", suffix: "" },
    { number: 25, label: "Active Projects", suffix: "" },
    { number: 8, label: "Years of Service", suffix: "" },
  ];

  const causes = [
    {
      icon: GraduationCap,
      title: "Education Support",
      description: "Providing quality education and learning resources to underprivileged children in urban slums and rural areas.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Heart,
      title: "Women Empowerment",
      description: "Empowering women through skill development, entrepreneurship programs, and awareness campaigns.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: Scale,
      title: "Legal Assistance",
      description: "Free legal aid and counseling for migrant workers, women, and marginalized communities.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Truck,
      title: "Emergency Relief",
      description: "Immediate support during natural disasters, health emergencies, and community crises.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      color: "from-green-500 to-teal-600"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Beneficiary - Education Program",
      content: "Thanks to Koshish NGO, my daughter now attends school regularly. The support they provided changed our family's future.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Rajesh Kumar",
      role: "Volunteer",
      content: "Being part of Koshish has been incredibly rewarding. Seeing the direct impact we make in people's lives motivates me every day.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Anita Devi",
      role: "Women Empowerment Program",
      content: "The skill training program helped me start my own tailoring business. Now I can support my family independently.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen font-poppins">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-koshish-blue via-blue-700 to-koshish-blue min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=1920&h=1080&fit=crop')"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Koshish NGO
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-koshish-gold font-semibold">
              A Ray of Hope for the Hopeless
            </p>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Together for a Better Tomorrow - Supporting displaced, vulnerable, and marginalized communities through education, empowerment, and care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/donate">
                <Button size="lg" className="bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
                  Donate Now
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-koshish-blue font-semibold text-lg px-8 py-4">
                  Join Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Causes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our Core Causes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We focus on four key areas to create lasting impact in the lives of those who need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {causes.map((cause, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={cause.image} 
                    alt={cause.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cause.color} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <cause.icon className="w-16 h-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-koshish-blue mb-2">{cause.title}</h3>
                  <p className="text-gray-600 mb-4">{cause.description}</p>
                  <Link to="/programs">
                    <Button variant="outline" className="w-full group-hover:bg-koshish-blue group-hover:text-white transition-colors">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-koshish-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Stories of Hope</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from the people whose lives have been touched by our work.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-xl font-semibold">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-koshish-gold">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed italic">
                "{testimonials[currentTestimonial].content}"
              </p>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-koshish-gold' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-koshish-gold to-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-6">
            Be the Change You Want to See
          </h2>
          <p className="text-xl text-koshish-blue mb-8 max-w-3xl mx-auto">
            Your support can transform lives. Join us in our mission to create a better tomorrow for those who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <Button size="lg" className="bg-koshish-blue text-white hover:bg-blue-800 font-semibold text-lg px-8 py-4">
                Make a Donation
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button size="lg" variant="outline" className="border-koshish-blue text-koshish-blue hover:bg-koshish-blue hover:text-white font-semibold text-lg px-8 py-4">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
