import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Instagram, Facebook, Clock, Users } from "lucide-react";

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Thank you for your message! We'll get back to you within 24 hours.");
    console.log("Contact form submission:", contactForm);
    
    // Reset form
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: [
        "Koshish Charitable Trust",
        "Abdin House, Fraser Rd, Lodipur",
        "Patna, Bihar"
      ]
    },
    {
      icon: Phone,
      title: "Contact Number",
      details: [
        "+91 94310 21035"
      ]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed (Emergency only)"
      ]
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/share/19V1DM2kYg/",
      handle: "@KoshishTrust"
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://www.instagram.com/koshishtrust?igsh=MW9oYjlnaGh1enJj",
      handle: "@koshishtrust"
    },
    {
      icon: Users, // Use Youtube icon if available, else fallback
      name: "YouTube",
      url: "https://youtube.com/@koshishcharitabletrust560?feature=shared",
      handle: "YouTube"
    }
  ];

  const officeLocations = [
    {
      city: "KOSHISH CHARITABLE TRUST PATNA",
      address: "Abdin House, Fraser Rd, Lodipur, Patna, Bihar",
      phone: "+91 94310 21035",
      programs: ["Education Support", "Women Empowerment", "Legal Aid", "Healthcare Support"]
    }
  ];

  return (
    <div className="min-h-screen font-poppins">
      <Helmet>
        <title>Koshish NGO - Contact</title>
        <meta name="description" content="Contact Koshish NGO for support, queries, or partnership opportunities." />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out to us for partnerships, volunteering, or any questions about our work.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-koshish-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-koshish-blue mb-4">{info.title}</h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-koshish-blue mb-6">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-koshish-blue hover:text-blue-600 transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                  <span className="font-medium">{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-koshish-blue mb-8">Send Us a Message</h2>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold text-lg py-3">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Map Placeholder */}
            <div>
              <h2 className="text-3xl font-bold text-koshish-blue mb-8">Find Us</h2>
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <a
                  href="https://maps.app.goo.gl/FVxeiJnzXWS8J6eWA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label="Open in Google Maps"
                  style={{ cursor: 'pointer' }}
                >
                  <span className="sr-only">Open in Google Maps</span>
                </a>
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop"
                  alt="Office location map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-koshish-blue/20 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <MapPin className="w-8 h-8 text-koshish-blue mx-auto mb-2" />
                    <h3 className="font-bold text-koshish-blue">Main Office</h3>
                    <p className="text-sm text-gray-600">Abdin House, Fraser Rd, Lodipur</p>
                    <p className="text-sm text-gray-600">Patna, Bihar</p>
                    <Button
                      asChild
                      className="mt-3 bg-koshish-gold text-koshish-blue hover:bg-yellow-400 text-sm"
                    >
                      <a
                        href="https://maps.app.goo.gl/FVxeiJnzXWS8J6eWA"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our Location</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We operate from Patna, Bihar to serve communities across the state.
            </p>
          </div>

          <div className="grid grid-cols-1 justify-center">
            <div className="max-w-md mx-auto">
              {officeLocations.map((location, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-koshish-blue mb-4">{location.city}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-koshish-blue mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{location.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-koshish-blue mr-2" />
                        <span className="text-gray-600 text-sm">{location.phone}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-koshish-blue mb-2">Programs:</h4>
                      <div className="flex flex-wrap gap-2">
                        {location.programs.map((program, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-koshish-light-blue text-koshish-blue text-xs rounded-full"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How can I donate to Koshish Charitable Trust?",
                answer: "You can donate through our secure online donation portal, by bank transfer, or by visiting our office. We accept one-time and recurring donations."
              },
              {
                question: "What documents do I need to volunteer?",
                answer: "You'll need a government-issued ID, recent photograph, and any relevant educational/professional certificates. Background verification may be required for certain roles."
              },
              {
                question: "Do you provide tax receipts for donations?",
                answer: "Yes, we provide 80G receipts for all donations. You'll receive your receipt via email within 48 hours of donation."
              },
              {
                question: "How can I get help from your programs?",
                answer: "Contact our helpline or visit any of our offices. Our team will assess your situation and guide you to the appropriate program."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-koshish-blue mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
