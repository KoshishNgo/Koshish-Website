
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Medal, Trophy, Shield, Star, Heart, Users, Globe } from "lucide-react";

const AchievementsSection = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "Best NGO Award 2023",
      description: "Recognized for outstanding community service and social impact across Bihar.",
      color: "from-yellow-400 to-orange-500",
      year: "2023"
    },
    {
      icon: Medal,
      title: "Education Excellence Certificate",
      description: "Certified for exceptional work in promoting education in rural areas.",
      color: "from-blue-500 to-cyan-600",
      year: "2022"
    },
    {
      icon: Shield,
      title: "Women Empowerment Recognition",
      description: "Honored for empowering women through skill development programs.",
      color: "from-pink-500 to-rose-600",
      year: "2023"
    },
    {
      icon: Star,
      title: "Community Impact Award",
      description: "Acknowledged for creating lasting positive change in local communities.",
      color: "from-purple-500 to-indigo-600",
      year: "2022"
    },
    {
      icon: Heart,
      title: "Humanitarian Service Medal",
      description: "Awarded for compassionate service during natural disasters and emergencies.",
      color: "from-red-500 to-pink-600",
      year: "2021"
    },
    {
      icon: Users,
      title: "Volunteer Excellence Award",
      description: "Recognized for building and maintaining an exceptional volunteer network.",
      color: "from-green-500 to-teal-600",
      year: "2023"
    },
    {
      icon: Award,
      title: "Legal Aid Service Certificate",
      description: "Certified for providing quality legal assistance to marginalized communities.",
      color: "from-gray-600 to-gray-800",
      year: "2022"
    },
    {
      icon: Globe,
      title: "Sustainable Development Goals Recognition",
      description: "Honored for significant contribution towards UN Sustainable Development Goals.",
      color: "from-emerald-500 to-green-600",
      year: "2023"
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4 animate-fade-in">
            Achievements & Certificates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Recognitions, milestones, and the journey of impact that defines our commitment to social change.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-scale-in border-0 shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="bg-white/90 text-koshish-blue font-semibold">
                    {achievement.year}
                  </Badge>
                </div>

                <CardContent className="p-6 relative z-10">
                  {/* Icon */}
                  <div className="mb-4 relative">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300`}></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-koshish-blue group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-koshish-blue group-hover:text-white group-hover:border-koshish-blue transition-all duration-300"
                    >
                      View Certificate
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="text-3xl font-bold text-koshish-blue mb-2">8+</div>
              <div className="text-gray-600 font-medium">Awards Received</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-3xl font-bold text-koshish-blue mb-2">5</div>
              <div className="text-gray-600 font-medium">Years Recognized</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="text-3xl font-bold text-koshish-blue mb-2">15+</div>
              <div className="text-gray-600 font-medium">Certifications</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-3xl font-bold text-koshish-blue mb-2">100%</div>
              <div className="text-gray-600 font-medium">Transparency</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
