
import { useEffect, useRef, useState } from "react";
import { Award, Trophy, Star, FileText, Medal, Shield } from "lucide-react";

const AchievementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      title: "Best NGO Award 2023",
      description: "Recognized for outstanding community service and impact",
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      year: "2023"
    },
    {
      title: "Education Excellence Certificate",
      description: "For innovative street education programs",
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      year: "2023"
    },
    {
      title: "Women Empowerment Recognition",
      description: "Outstanding contribution to women's skill development",
      icon: <Award className="w-8 h-8 text-purple-500" />,
      year: "2022"
    },
    {
      title: "Community Impact Award",
      description: "Significant positive change in underserved communities",
      icon: <Star className="w-8 h-8 text-green-500" />,
      year: "2022"
    },
    {
      title: "Legal Aid Excellence",
      description: "Exceptional legal support for marginalized groups",
      icon: <Shield className="w-8 h-8 text-red-500" />,
      year: "2022"
    },
    {
      title: "Volunteer Management Award",
      description: "Excellence in volunteer coordination and training",
      icon: <Medal className="w-8 h-8 text-indigo-500" />,
      year: "2021"
    },
    {
      title: "Social Innovation Certificate",
      description: "Creative solutions for social challenges",
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
      year: "2021"
    },
    {
      title: "Healthcare Initiative Recognition",
      description: "Significant contribution to community health programs",
      icon: <Star className="w-8 h-8 text-teal-500" />,
      year: "2021"
    }
  ];

  return (
    <section 
      id="achievements" 
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-koshish-blue mb-4">
            Achievements & Certificates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Recognitions, milestones, and the journey of impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 ${
                isVisible 
                  ? `animate-fade-in-up opacity-100` 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gray-50 rounded-full">
                  {achievement.icon}
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {achievement.year}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 leading-tight">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
                
                <button className="mt-4 px-4 py-2 bg-koshish-blue text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            These recognitions motivate us to continue our mission of serving communities with dedication and excellence.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>8+ Awards</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Multiple Certifications</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-green-500" />
              <span>4+ Years of Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
