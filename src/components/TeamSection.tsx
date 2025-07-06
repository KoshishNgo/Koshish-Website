
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Founder & Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Leading our education initiatives across rural Bihar with 15+ years of social work experience.",
      specialization: "Education & Community Development",
      location: "Patna, Bihar"
    },
    {
      name: "Priya Sharma",
      role: "Women Empowerment Head",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Spearheading women's skill development programs and entrepreneurship initiatives.",
      specialization: "Women's Rights & Skill Development",
      location: "Gaya, Bihar"
    },
    {
      name: "Amit Singh",
      role: "Legal Aid Coordinator",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Providing free legal assistance to marginalized communities and migrant workers.",
      specialization: "Legal Aid & Human Rights",
      location: "Muzaffarpur, Bihar"
    },
    {
      name: "Sunita Devi",
      role: "Field Operations Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Coordinating ground-level operations and emergency relief activities across districts.",
      specialization: "Emergency Relief & Operations",
      location: "Darbhanga, Bihar"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our Dedicated Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate individuals who are making a difference in Bihar's communities every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-koshish-gold shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-koshish-blue text-white text-xs px-3 py-1">
                      {member.location}
                    </Badge>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-koshish-blue mb-2">{member.name}</h3>
                <p className="text-koshish-gold font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.description}</p>
                
                <div className="border-t pt-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Specialization</p>
                  <p className="text-sm text-koshish-blue font-medium">{member.specialization}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
