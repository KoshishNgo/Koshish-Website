
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, Target, Users } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Dr. Rahul Sharma",
      role: "Founder & Director",
      bio: "With over 15 years of experience in social work, Dr. Sharma established Koshish to bridge the gap between resources and those in need.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Sunita Patel",
      role: "Program Coordinator",
      bio: "Sunita leads our women empowerment programs and has helped over 500 women become financially independent.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Amit Kumar",
      role: "Education Director",
      bio: "A former teacher with a passion for child education, Amit oversees all our educational initiatives and programs.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Meera Singh",
      role: "Legal Advisor",
      bio: "Meera provides legal support to vulnerable communities and has successfully handled over 200 cases pro bono.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every situation with empathy and understanding, treating each person with dignity and respect."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We maintain complete transparency in our operations, ensuring every donation is used effectively."
    },
    {
      icon: Target,
      title: "Impact",
      description: "We focus on creating measurable, lasting change that transforms lives and communities."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of community and work together to create sustainable solutions."
    }
  ];

  return (
    <div className="min-h-screen font-poppins">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Koshish NGO</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Founded in 2016, Koshish NGO has been a beacon of hope for displaced, vulnerable, and marginalized communities across India.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-koshish-blue mb-8">Our Mission & Vision</h2>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-koshish-blue mb-4">Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To empower marginalized communities through education, skill development, legal aid, and emergency support, 
                  creating sustainable pathways out of poverty and vulnerability.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-koshish-blue mb-4">Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  A world where every individual, regardless of their background or circumstances, has access to opportunities 
                  for growth, dignity, and a better tomorrow.
                </p>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&h=400&fit=crop"
                alt="Our mission in action"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to impacting thousands of lives across India.
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-koshish-blue mb-4">2016 - The Beginning</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Koshish NGO was founded by Dr. Rahul Sharma after witnessing the struggles of migrant families in Delhi. 
                  Starting with just 5 volunteers and a small community center, we focused on providing basic education 
                  and healthcare to underprivileged children.
                </p>
              </div>
              <div className="bg-koshish-light-blue p-8 rounded-lg">
                <div className="text-4xl font-bold text-koshish-blue">50</div>
                <div className="text-gray-600">Families Helped</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1 bg-koshish-light-blue p-8 rounded-lg">
                <div className="text-4xl font-bold text-koshish-blue">500</div>
                <div className="text-gray-600">Lives Transformed</div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-koshish-blue mb-4">2018 - Expanding Horizons</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We expanded our services to include women empowerment programs and legal aid services. 
                  Our rehabilitation shelter for women opened, providing safe haven for those escaping domestic violence 
                  and human trafficking.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-koshish-blue mb-4">2020 - Rising to Challenges</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  During the COVID-19 pandemic, we pivoted quickly to provide emergency relief, food distribution, 
                  and healthcare support. We helped over 2,000 families during the lockdown period, proving our 
                  commitment to being there when communities need us most.
                </p>
              </div>
              <div className="bg-koshish-light-blue p-8 rounded-lg">
                <div className="text-4xl font-bold text-koshish-blue">2000</div>
                <div className="text-gray-600">Families Supported</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1 bg-koshish-light-blue p-8 rounded-lg">
                <div className="text-4xl font-bold text-koshish-blue">5000+</div>
                <div className="text-gray-600">Lives Touched</div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-koshish-blue mb-4">2024 - Today</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Today, Koshish NGO operates across multiple states in India with over 150 volunteers and 25 active projects. 
                  We continue to grow our impact while staying true to our core mission of providing hope and opportunity 
                  to those who need it most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-koshish-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-koshish-blue mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The dedicated individuals who make our mission possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform"
                  />
                  <h3 className="text-xl font-bold text-koshish-blue mb-2">{member.name}</h3>
                  <p className="text-koshish-gold font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
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

export default About;
