import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Heart, 
  Scale, 
  Truck, 
  Users, 
  Calendar,
  MapPin,
  Target
} from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from "react";

const Programs = () => {
  const programs = [
    {
      id: 1,
      icon: GraduationCap,
      title: "Street Education Campaign",
      description: "Providing quality education to children living on the streets and in slums through mobile classrooms and learning centers.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      goal: 1000,
      achieved: 750,
      location: "Delhi, Mumbai, Kolkata",
      duration: "Ongoing since 2016",
      beneficiaries: "750+ children",
      details: [
        "Mobile education units reaching remote areas",
        "Free learning materials and uniforms",
        "Nutritious meal programs",
        "Career guidance and skill development"
      ],
      testimonial: {
        name: "Ravi, Age 12",
        content: "I love going to the mobile school. The teachers are kind and now I can read and write!"
      }
    },
    {
      id: 2,
      icon: Heart,
      title: "Rehabilitation Shelter for Women",
      description: "Safe haven and rehabilitation programs for women escaping domestic violence, trafficking, and abuse.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop",
      goal: 200,
      achieved: 150,
      location: "Delhi, Gurgaon",
      duration: "24/7 Operation since 2018",
      beneficiaries: "150+ women rehabilitated",
      details: [
        "Safe accommodation for up to 50 women",
        "Counseling and psychological support",
        "Skill training and employment assistance",
        "Legal aid and court support"
      ],
      testimonial: {
        name: "Sunita, Age 28",
        content: "This shelter gave me a new life. I now run my own tailoring business and am independent."
      }
    },
    {
      id: 3,
      icon: Scale,
      title: "Legal Aid for Migrant Workers",
      description: "Free legal assistance and advocacy for migrant workers facing exploitation and rights violations.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
      goal: 500,
      achieved: 380,
      location: "NCR Region, Maharashtra",
      duration: "Active since 2017",
      beneficiaries: "380+ cases resolved",
      details: [
        "Free legal consultation services",
        "Court representation and documentation",
        "Rights awareness workshops",
        "Employer negotiation and dispute resolution"
      ],
      testimonial: {
        name: "Mohan Singh, Construction Worker",
        content: "When my employer refused to pay my wages, Koshish helped me get justice and my money back."
      }
    },
    {
      id: 4,
      icon: Truck,
      title: "Food Drives & Emergency Support",
      description: "Immediate relief during natural disasters, health emergencies, and community crises with food and essential supplies.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop",
      goal: 5000,
      achieved: 4200,
      location: "Pan-India Response",
      duration: "24/7 Emergency Response",
      beneficiaries: "4200+ families supported",
      details: [
        "Emergency food distribution during crises",
        "Medical aid and health checkups",
        "Temporary shelter arrangements",
        "Disaster preparedness training"
      ],
      testimonial: {
        name: "Kamala Devi, Flood Victim",
        content: "During the floods, Koshish was the first to reach us with food and medicine. They saved our lives."
      }
    }
  ];

  return (
    <div className="min-h-screen font-poppins">
      <Helmet>
        <title>Koshish NGO - Programs</title>
        <meta name="description" content="Explore the programs and initiatives by Koshish NGO for community empowerment." />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Comprehensive support programs designed to create lasting change in the lives of vulnerable communities.
          </p>
        </div>
      </section>

      {/* Programs Overview Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-koshish-blue">4</div>
              <div className="text-gray-600 mt-2">Active Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-koshish-blue">25</div>
              <div className="text-gray-600 mt-2">Ongoing Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-koshish-blue">5000+</div>
              <div className="text-gray-600 mt-2">Beneficiaries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-koshish-blue">15</div>
              <div className="text-gray-600 mt-2">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {programs.map((program, index) => (
              <div key={program.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-koshish-blue to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-koshish-blue">{program.title}</h2>
                  </div>
                  
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-gray-700">
                        {program.achieved} / {program.goal} {program.id === 4 ? 'families' : program.id === 3 ? 'cases' : 'beneficiaries'}
                      </span>
                    </div>
                    <Progress value={(program.achieved / program.goal) * 100} className="h-3" />
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-koshish-blue mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Location</div>
                        <div className="text-sm text-gray-600">{program.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-koshish-blue mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Duration</div>
                        <div className="text-sm text-gray-600">{program.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-koshish-blue mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">Impact</div>
                        <div className="text-sm text-gray-600">{program.beneficiaries}</div>
                      </div>
                    </div>
                  </div>

                  {/* Program Details */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-koshish-blue mb-3">What We Do:</h4>
                    <ul className="space-y-2">
                      {program.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <Target className="w-4 h-4 text-koshish-gold mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-koshish-light-blue p-6 rounded-lg mb-6">
                    <p className="text-gray-700 italic mb-2">"{program.testimonial.content}"</p>
                    <p className="text-koshish-blue font-semibold">- {program.testimonial.name}</p>
                  </div>

                  <Link to="/donate">
                    <Button className="bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold">
                      Support This Program
                    </Button>
                  </Link>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-96 object-cover rounded-lg shadow-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-koshish-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Help Us Expand Our Impact
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Every contribution helps us reach more people and create lasting change in their lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <Button size="lg" className="bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold text-lg px-8 py-4">
                Donate to Programs
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-koshish-blue font-semibold text-lg px-8 py-4">
                Volunteer With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
