
import { useState } from "react";
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
    location: ""
  });

  const opportunities = [
    {
      icon: GraduationCap,
      title: "Education Volunteer",
      description: "Teach children in our mobile classrooms and learning centers",
      commitment: "4-6 hours/week",
      location: "Delhi, Mumbai, Kolkata",
      requirements: "Basic education, patience with children",
      benefits: ["Teaching experience", "Impact measurement", "Certificate"]
    },
    {
      icon: Heart,
      title: "Counseling Support",
      description: "Provide emotional support and counseling to women in our shelters",
      commitment: "6-8 hours/week",
      location: "Delhi, Gurgaon",
      requirements: "Psychology background preferred, empathy",
      benefits: ["Professional development", "Mentorship", "Training provided"]
    },
    {
      icon: Scale,
      title: "Legal Aid Assistant",
      description: "Help with documentation and basic legal procedures",
      commitment: "3-5 hours/week",
      location: "NCR Region",
      requirements: "Legal knowledge, document handling skills",
      benefits: ["Legal experience", "Network building", "Skill development"]
    },
    {
      icon: Truck,
      title: "Field Coordinator",
      description: "Coordinate relief operations and community outreach programs",
      commitment: "8-10 hours/week",
      location: "Multiple locations",
      requirements: "Organizational skills, physical fitness",
      benefits: ["Leadership experience", "Travel opportunities", "Impact measurement"]
    }
  ];

  const volunteerTestimonials = [
    {
      name: "Priya Mehta",
      role: "Education Volunteer (2 years)",
      content: "Volunteering at Koshish has been the most rewarding experience. Seeing children's faces light up when they learn something new is priceless.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Rohit Kumar",
      role: "Field Coordinator (1.5 years)",
      content: "The experience has taught me so much about community work and leadership. I've grown both personally and professionally.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Anita Singh",
      role: "Counseling Support (3 years)",
      content: "Being able to support women in their journey to independence and safety gives my life purpose. It's changed my perspective completely.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!volunteerForm.name || !volunteerForm.email || !volunteerForm.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Thank you for your interest! We'll contact you within 48 hours.");
    console.log("Volunteer application:", volunteerForm);
    
    // Reset form
    setVolunteerForm({
      name: "", email: "", phone: "", age: "", skills: "", availability: "",
      interests: [], experience: "", why: "", location: ""
    });
  };

  return (
    <div className="min-h-screen font-poppins">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Join Our Mission</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
            Become a volunteer and make a direct impact in the lives of those who need it most.
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

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Volunteer Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect role that matches your skills and passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-koshish-blue to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <opportunity.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-koshish-blue mb-2">{opportunity.title}</h3>
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

                  <Button className="w-full bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold">
                    Apply for This Role
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Testimonials */}
      <section className="py-20 bg-koshish-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Hear from Our Volunteers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stories from our dedicated volunteer community.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="flex items-center mb-6">
                <img 
                  src={volunteerTestimonials[currentTestimonial].image} 
                  alt={volunteerTestimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4"
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
          </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out this form and we'll get back to you within 48 hours to discuss opportunities.
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Areas of Interest */}
                <div>
                  <Label className="text-base font-medium mb-4 block">Areas of Interest (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Education Support', 'Women Empowerment', 'Legal Aid', 'Emergency Relief', 'Event Coordination', 'Fundraising'].map((interest) => (
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

                <Button type="submit" className="w-full bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold text-lg py-4">
                  Submit Application
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
