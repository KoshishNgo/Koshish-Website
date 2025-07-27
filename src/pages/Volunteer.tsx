import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  Heart, 
  Users, 
  Clock, 
  MapPin, 
  Star,
  GraduationCap,
  Scale,
  Truck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Volunteer = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    skills: "",
    availability: "",
    interests: [] as string[],
    experience: "",
    why: "",
    location: "",
    type: "volunteer"
  });

  const opportunities = [
    {
      title: "Community Kitchen Volunteer",
      type: "volunteer",
      description: "Help us prepare and serve meals to those in need at our community kitchen.",
      commitment: "3 hours/week",
      location: "Delhi",
      requirements: "Passion for cooking and helping others.",
      benefits: ["Make a difference in the community", "Gain cooking experience", "Volunteer certificate"],
      icon: Heart
    },
    {
      title: "Digital Marketing Intern",
      type: "internship",
      description: "Assist in managing our social media platforms and creating online marketing campaigns.",
      commitment: "10 hours/week",
      location: "Remote",
      requirements: "Knowledge of social media platforms, basic graphic design skills.",
      benefits: ["Learn about digital marketing", "Flexible working hours", "Stipend available"],
      icon: Users
    },
    {
      title: "Event Coordination Volunteer",
      type: "volunteer",
      description: "Join our team in planning and executing community events and fundraisers.",
      commitment: "Varies",
      location: "Mumbai",
      requirements: "Organizational skills, ability to work in a team.",
      benefits: ["Gain event management experience", "Network with professionals", "Volunteer certificate"],
      icon: GraduationCap
    },
    {
      title: "Research Intern",
      type: "internship",
      description: "Conduct research and assist in the development of project proposals and reports.",
      commitment: "15 hours/week",
      location: "Kolkata",
      requirements: "Strong analytical skills, proficiency in MS Office.",
      benefits: ["Enhance research skills", "Work on impactful projects", "Stipend available"],
      icon: Scale
    }
  ];

  const volunteerTestimonials = [
    {
      name: "SRIJAN MANI TRIPATHI",
      role: "Web Developer Volunteer",
      content: "Being part of Koshish as a web developer has been incredibly fulfilling. I had the opportunity to design and develop the complete Koshish NGO website, creating a digital platform that helps connect donors, volunteers, and beneficiaries. It's amazing to see how technology can amplify the impact of social work and help reach more people in need.",
      image: "/images/srijan 2.jpeg"
    },
    {
      name: "ADITYA RAMAN",
      role: "Web Developer Volunteer", 
      content: "Contributing to Koshish's digital transformation has been a rewarding journey. Working alongside the team to build and enhance the website allowed me to use my technical skills for a meaningful cause. Every line of code written helps the organization reach more people and create greater social impact in our communities.",
      image: "/images/adi.jpeg"
    }
  ];

  // Auto-change testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % volunteerTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [volunteerTestimonials.length]);

  // Navigation functions for manual control
  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % volunteerTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => prev === 0 ? volunteerTestimonials.length - 1 : prev - 1);
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setVolunteerForm(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    } else {
      setVolunteerForm(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email || !volunteerForm.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const applicationType = volunteerForm.type === 'internship' ? 'internship application' : 'volunteer application';
    
    try {
      // Save to Supabase
      const { error } = await supabase.from("volunteer_applications").insert([
        { ...volunteerForm }
      ]);
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      // Send email notification to admin
      const emailBody = `
New ${applicationType.toUpperCase()} Received:

Personal Information:
Name: ${volunteerForm.name}
Email: ${volunteerForm.email}
Phone: ${volunteerForm.phone}
Age: ${volunteerForm.age || 'Not provided'}

Application Details:
Type: ${volunteerForm.type}
Availability: ${volunteerForm.availability || 'Not provided'}
Location: ${volunteerForm.location || 'Not provided'}

Areas of Interest:
${volunteerForm.interests.length > 0 ? volunteerForm.interests.join(', ') : 'None specified'}

Skills & Qualifications:
${volunteerForm.skills || 'Not provided'}

Previous Experience:
${volunteerForm.experience || 'Not provided'}

Why they want to volunteer:
${volunteerForm.why || 'Not provided'}

---
This application was submitted through the Koshish NGO website.
`;

      // Open default email client
      const mailtoLink = `mailto:koshishngopatna@gmail.com?subject=New ${applicationType} from ${volunteerForm.name}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);

      toast.success(`Thank you for your ${applicationType}! We'll contact you within 48 hours.`);
      setVolunteerForm({
        name: "", email: "", phone: "", age: "", skills: "", availability: "",
        interests: [], experience: "", why: "", location: "", type: "volunteer"
      });
      
    } catch (error) {
      console.error("Error submitting application:", error);
      
      // Fallback to email only if Supabase fails
      const emailBody = `
New ${applicationType.toUpperCase()} (Backup):

Personal Information:
Name: ${volunteerForm.name}
Email: ${volunteerForm.email}
Phone: ${volunteerForm.phone}
Age: ${volunteerForm.age || 'Not provided'}

Application Details:
Type: ${volunteerForm.type}
Availability: ${volunteerForm.availability || 'Not provided'}
Location: ${volunteerForm.location || 'Not provided'}

Areas of Interest:
${volunteerForm.interests.length > 0 ? volunteerForm.interests.join(', ') : 'None specified'}

Skills & Qualifications:
${volunteerForm.skills || 'Not provided'}

Previous Experience:
${volunteerForm.experience || 'Not provided'}

Why they want to volunteer:
${volunteerForm.why || 'Not provided'}

---
This application was submitted through the Koshish NGO website.
Note: There was an issue saving to database, this is a backup email.
`;

      const mailtoLink = `mailto:koshishngopatna@gmail.com?subject=New ${applicationType} from ${volunteerForm.name}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);
      
      toast.success("Your application has been prepared for email. An email client will open to send your application.");
      setVolunteerForm({
        name: "", email: "", phone: "", age: "", skills: "", availability: "",
        interests: [], experience: "", why: "", location: "", type: "volunteer"
      });
    }
  };

  const [selectedType, setSelectedType] = useState<"all" | "volunteer" | "internship">("all");
  
  const filteredOpportunities = opportunities.filter(opp => 
    selectedType === "all" || opp.type === selectedType
  );

  return (
    <div className="min-h-screen font-poppins">
      <Helmet>
        <title>Koshish NGO - Volunteer</title>
        <meta name="description" content="Join Koshish NGO as a volunteer and make a difference in the community." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Join Our Mission</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
            Become a volunteer or intern and make a direct impact in the lives of those who need it most.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-koshish-gold">150+</div>
              <div className="text-lg">Active Volunteers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-koshish-gold">25</div>
              <div className="text-lg">Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-koshish-gold">15</div>
              <div className="text-lg">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-koshish-gold">5000+</div>
              <div className="text-lg">Lives Impacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Why Volunteer with Koshish?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a community of changemakers and experience the joy of giving back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Heart className="w-16 h-16 text-koshish-blue mx-auto mb-6" />
                <h3 className="text-xl font-bold text-koshish-blue mb-4">Make Real Impact</h3>
                <p className="text-gray-600">
                  See the direct results of your efforts and know that you're truly making a difference in people's lives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users className="w-16 h-16 text-koshish-blue mx-auto mb-6" />
                <h3 className="text-xl font-bold text-koshish-blue mb-4">Build Community</h3>
                <p className="text-gray-600">
                  Connect with like-minded individuals and build lasting friendships while working towards a common goal.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Star className="w-16 h-16 text-koshish-blue mx-auto mb-6" />
                <h3 className="text-xl font-bold text-koshish-blue mb-4">Develop Skills</h3>
                <p className="text-gray-600">
                  Gain valuable experience, develop new skills, and enhance your resume while contributing to society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Volunteer & Internship Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find the perfect role that matches your skills and passion - whether as a volunteer or intern.
            </p>
            
            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedType === "all" 
                    ? "bg-koshish-blue text-white" 
                    : "bg-white text-koshish-blue border border-koshish-blue hover:bg-koshish-blue hover:text-white"
                }`}
              >
                All Opportunities
              </button>
              <button
                onClick={() => setSelectedType("volunteer")}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedType === "volunteer" 
                    ? "bg-koshish-blue text-white" 
                    : "bg-white text-koshish-blue border border-koshish-blue hover:bg-koshish-blue hover:text-white"
                }`}
              >
                Volunteer Roles
              </button>
              <button
                onClick={() => setSelectedType("internship")}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedType === "internship" 
                    ? "bg-koshish-blue text-white" 
                    : "bg-white text-koshish-blue border border-koshish-blue hover:bg-koshish-blue hover:text-white"
                }`}
              >
                Internships
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredOpportunities.length === 0 ? (
              <div className="col-span-2 text-center py-10">
                <p className="text-lg text-gray-500">No opportunities found for the selected type.</p>
              </div>
            ) : (
              filteredOpportunities.map((opportunity, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        opportunity.type === 'internship' 
                          ? 'bg-gradient-to-br from-green-500 to-teal-600' 
                          : 'bg-gradient-to-br from-koshish-blue to-blue-600'
                      }`}>
                        <opportunity.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-koshish-blue">{opportunity.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            opportunity.type === 'internship' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {opportunity.type}
                          </span>
                        </div>
                        <p className="text-gray-600">{opportunity.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Commitment: {opportunity.commitment}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Location: {opportunity.location}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Requirements:</strong> {opportunity.requirements}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-koshish-blue mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {opportunity.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-koshish-gold rounded-full mr-2"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className={`w-full font-semibold ${
                        opportunity.type === 'internship'
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-koshish-gold text-koshish-blue hover:bg-yellow-400'
                      }`}
                      onClick={() => {
                        document.getElementById('volunteer-form-section')?.scrollIntoView({ behavior: 'smooth' });
                        setVolunteerForm({ ...volunteerForm, type: opportunity.type });
                      }}
                    >
                      Apply for This {opportunity.type === 'internship' ? 'Internship' : 'Role'}
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Volunteer Testimonials */}
      <section className="py-20 bg-koshish-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Web Development Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dedicated volunteers who built this digital platform to amplify Koshish's mission.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="flex items-center mb-6">
                <img 
                  src={volunteerTestimonials[currentTestimonial].image} 
                  alt={volunteerTestimonials[currentTestimonial].name}
                  className="w-28 h-28 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold">{volunteerTestimonials[currentTestimonial].name}</h4>
                  <p className="text-koshish-gold">{volunteerTestimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed italic">
                "{volunteerTestimonials[currentTestimonial].content}"
              </p>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {volunteerTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-koshish-gold' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-105 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-105 shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section className="py-20 bg-white">
        <div id="volunteer-form-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out this form and we'll get back to you within 48 hours to discuss opportunities.
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Application Type Selection */}
                <div>
                  <Label className="text-base font-medium mb-4 block">I'm applying for *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="volunteer"
                        name="type"
                        value="volunteer"
                        checked={volunteerForm.type === "volunteer"}
                        onChange={(e) => setVolunteerForm({...volunteerForm, type: e.target.value})}
                        className="w-4 h-4 text-koshish-blue"
                      />
                      <label htmlFor="volunteer" className="text-sm font-medium">
                        Volunteer Position
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="internship"
                        name="type"
                        value="internship"
                        checked={volunteerForm.type === "internship"}
                        onChange={(e) => setVolunteerForm({...volunteerForm, type: e.target.value})}
                        className="w-4 h-4 text-green-600"
                      />
                      <label htmlFor="internship" className="text-sm font-medium">
                        Internship Program
                      </label>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={volunteerForm.phone}
                      onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={volunteerForm.age}
                      onChange={(e) => setVolunteerForm({...volunteerForm, age: e.target.value})}
                    />
                  </div>
                </div>

                {/* Location and Availability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">Preferred Location</Label>
                    <Select value={volunteerForm.location} onValueChange={(value) => setVolunteerForm({...volunteerForm, location: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="kolkata">Kolkata</SelectItem>
                        <SelectItem value="gurgaon">Gurgaon</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select value={volunteerForm.availability} onValueChange={(value) => setVolunteerForm({...volunteerForm, availability: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Updated Areas of Interest */}
                <div>
                  <Label className="text-base font-medium mb-4 block">Areas of Interest (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Education Support', 
                      'Women Empowerment', 
                      'Legal Aid', 
                      'Emergency Relief', 
                      'Event Coordination', 
                      'Fundraising',
                      'Social Work Field Experience',
                      'Digital Marketing',
                      'Research & Documentation',
                      'Legal Research'
                    ].map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox 
                          id={interest}
                          checked={volunteerForm.interests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        />
                        <label htmlFor={interest} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills and Experience */}
                <div>
                  <Label htmlFor="skills">Skills & Qualifications</Label>
                  <Textarea
                    id="skills"
                    value={volunteerForm.skills}
                    onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                    placeholder="List your relevant skills, qualifications, and any special abilities"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Previous Volunteer Experience</Label>
                  <Textarea
                    id="experience"
                    value={volunteerForm.experience}
                    onChange={(e) => setVolunteerForm({...volunteerForm, experience: e.target.value})}
                    placeholder="Describe any previous volunteer work or community involvement"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="why">Why do you want to volunteer with Koshish?</Label>
                  <Textarea
                    id="why"
                    value={volunteerForm.why}
                    onChange={(e) => setVolunteerForm({...volunteerForm, why: e.target.value})}
                    placeholder="Tell us what motivates you to volunteer and what you hope to achieve"
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className={`w-full font-semibold text-lg py-4 ${
                    volunteerForm.type === 'internship'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-koshish-gold text-koshish-blue hover:bg-yellow-400'
                  }`}
                >
                  Submit {volunteerForm.type === 'internship' ? 'Internship' : 'Volunteer'} Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Volunteer;
