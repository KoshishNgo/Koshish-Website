
import { useState, useEffect } from "react";
import { MapPin, Users, GraduationCap, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BiharMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [animatedDistricts, setAnimatedDistricts] = useState<Set<string>>(new Set());

  const districts = [
    {
      name: "Patna",
      position: { top: "52%", left: "32%" },
      programs: ["Education Support", "Women Empowerment", "Legal Aid"],
      beneficiaries: 1200,
      description: "Our main headquarters coordinating all major programs across Bihar.",
      path: "M 315 260 L 340 250 L 360 255 L 375 270 L 370 285 L 350 295 L 325 290 L 310 275 Z"
    },
    {
      name: "Gaya",
      position: { top: "70%", left: "35%" },
      programs: ["Women Empowerment", "Skill Development"],
      beneficiaries: 800,
      description: "Focus on women's entrepreneurship and skill development programs.",
      path: "M 320 350 L 345 340 L 365 345 L 375 360 L 365 375 L 340 380 L 320 370 Z"
    },
    {
      name: "Muzaffarpur",
      position: { top: "32%", left: "30%" },
      programs: ["Education Support", "Child Protection"],
      beneficiaries: 650,
      description: "Primary education initiatives and child welfare programs.",
      path: "M 285 160 L 315 150 L 335 155 L 340 175 L 325 185 L 300 180 L 280 170 Z"
    },
    {
      name: "Darbhanga",
      position: { top: "35%", left: "45%" },
      programs: ["Emergency Relief", "Health Awareness"],
      beneficiaries: 450,
      description: "Emergency response and community health programs.",
      path: "M 430 175 L 455 165 L 475 170 L 480 190 L 465 200 L 440 195 L 425 185 Z"
    },
    {
      name: "Bhagalpur",
      position: { top: "50%", left: "70%" },
      programs: ["Legal Aid", "Community Development"],
      beneficiaries: 320,
      description: "Legal assistance and community development initiatives.",
      path: "M 670 250 L 695 240 L 715 245 L 720 265 L 705 275 L 680 270 L 665 260 Z"
    },
    {
      name: "Purnia",
      position: { top: "20%", left: "75%" },
      programs: ["Education Support", "Rural Development"],
      beneficiaries: 280,
      description: "Rural education and development programs in remote areas.",
      path: "M 715 100 L 740 90 L 760 95 L 765 115 L 750 125 L 725 120 L 710 110 Z"
    },
    {
      name: "Araria",
      position: { top: "18%", left: "85%" },
      programs: ["Health Care", "Education Support"],
      beneficiaries: 200,
      description: "Healthcare initiatives and educational support in border areas.",
      path: "M 810 90 L 830 85 L 845 90 L 850 105 L 835 115 L 815 110 L 805 100 Z"
    },
    {
      name: "Siwan",
      position: { top: "40%", left: "18%" },
      programs: ["Women Empowerment", "Agriculture Support"],
      beneficiaries: 350,
      description: "Agricultural development and women empowerment programs.",
      path: "M 170 200 L 190 190 L 210 195 L 215 215 L 200 225 L 175 220 L 165 210 Z"
    },
    {
      name: "Begusarai",
      position: { top: "45%", left: "50%" },
      programs: ["Industrial Development", "Education"],
      beneficiaries: 420,
      description: "Supporting industrial workers and educational programs.",
      path: "M 480 225 L 505 215 L 525 220 L 530 240 L 515 250 L 490 245 L 475 235 Z"
    },
    {
      name: "Madhubani",
      position: { top: "25%", left: "60%" },
      programs: ["Art & Culture", "Women Empowerment"],
      beneficiaries: 380,
      description: "Preserving local art culture and empowering women artisans.",
      path: "M 570 125 L 595 115 L 615 120 L 620 140 L 605 150 L 580 145 L 565 135 Z"
    }
  ];

  const totalBeneficiaries = districts.reduce((sum, district) => sum + district.beneficiaries, 0);

  // Sequential animation effect
  useEffect(() => {
    const animateDistricts = async () => {
      for (let i = 0; i < districts.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setAnimatedDistricts(prev => new Set([...prev, districts[i].name]));
      }
    };

    const timer = setTimeout(animateDistricts, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our Reach Across Bihar</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serving communities across {districts.length} districts with {totalBeneficiaries.toLocaleString()}+ beneficiaries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Political Map Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 h-96 md:h-[500px]">
                  {/* Bihar State Political Map */}
                  <svg 
                    viewBox="0 0 900 500" 
                    className="absolute inset-0 w-full h-full"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                  >
                    {/* State Boundary */}
                    <path 
                      d="M 50 150 L 100 80 L 200 70 L 300 60 L 400 65 L 500 70 L 600 75 L 700 85 L 780 95 L 850 110 L 870 150 L 875 200 L 870 250 L 860 300 L 840 350 L 800 380 L 750 390 L 700 395 L 650 390 L 600 385 L 550 380 L 500 385 L 450 390 L 400 385 L 350 380 L 300 385 L 250 390 L 200 385 L 150 375 L 100 350 L 70 300 L 50 250 L 45 200 Z"
                      fill="rgba(255, 255, 255, 0.9)"
                      stroke="#1e40af"
                      strokeWidth="3"
                      className="transition-all duration-1000"
                    />

                    {/* District Boundaries and Animations */}
                    {districts.map((district, index) => (
                      <g key={district.name}>
                        {/* District Area */}
                        <path
                          d={district.path}
                          fill={animatedDistricts.has(district.name) ? "rgba(255, 215, 0, 0.3)" : "rgba(255, 255, 255, 0.8)"}
                          stroke={animatedDistricts.has(district.name) ? "#FFD700" : "#cbd5e1"}
                          strokeWidth={animatedDistricts.has(district.name) ? "3" : "1"}
                          className={`cursor-pointer transition-all duration-1000 ${
                            animatedDistricts.has(district.name) 
                              ? 'animate-pulse drop-shadow-lg' 
                              : ''
                          } ${
                            selectedDistrict === district.name 
                              ? 'fill-koshish-gold' 
                              : ''
                          }`}
                          style={{
                            filter: animatedDistricts.has(district.name) 
                              ? 'drop-shadow(0 0 10px #FFD700)' 
                              : 'none',
                            animationDelay: `${index * 0.8}s`
                          }}
                          onClick={() => setSelectedDistrict(selectedDistrict === district.name ? null : district.name)}
                        />
                        
                        {/* District Label with Fade-in Effect */}
                        <text
                          x={district.path.includes('M 170') ? 180 : district.path.includes('M 810') ? 825 : parseInt(district.path.split(' ')[1]) + 15}
                          y={district.path.includes('M 170') ? 210 : district.path.includes('M 810') ? 100 : parseInt(district.path.split(' ')[2]) + 5}
                          textAnchor="middle"
                          className={`text-sm font-bold transition-all duration-1000 ${
                            animatedDistricts.has(district.name) 
                              ? 'fill-koshish-blue opacity-100 animate-fade-in' 
                              : 'fill-gray-400 opacity-0'
                          }`}
                          style={{
                            animationDelay: `${index * 0.8 + 0.5}s`,
                            fontSize: '14px',
                            fontWeight: 'bold'
                          }}
                        >
                          {district.name}
                        </text>

                        {/* Glowing Marker */}
                        {animatedDistricts.has(district.name) && (
                          <circle
                            cx={parseInt(district.path.split(' ')[1]) + 15}
                            cy={parseInt(district.path.split(' ')[2]) + 5}
                            r="4"
                            fill="#FFD700"
                            className="animate-ping"
                            style={{
                              animationDelay: `${index * 0.8}s`,
                              filter: 'drop-shadow(0 0 6px #FFD700)'
                            }}
                          />
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* Title overlay */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <h3 className="font-bold text-koshish-blue flex items-center text-lg">
                      <MapPin className="w-5 h-5 mr-2 text-koshish-gold" />
                      Bihar State
                    </h3>
                    <p className="text-sm text-gray-600">Watch districts light up!</p>
                    <div className="mt-2 text-xs text-koshish-blue font-medium">
                      🌟 Active in {animatedDistricts.size}/{districts.length} districts
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-koshish-gold rounded-full animate-pulse"></div>
                        <span className="text-gray-600">Active Centers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="text-gray-600">Future Expansion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            {selectedDistrict ? (
              districts
                .filter(d => d.name === selectedDistrict)
                .map(district => (
                  <Card key={district.name} className="border-l-4 border-koshish-gold animate-fade-in">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-koshish-blue mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-koshish-gold" />
                        {district.name} District
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                          <Users className="w-4 h-4 mr-2 text-koshish-blue" />
                          <span className="font-semibold text-koshish-blue">
                            {district.beneficiaries.toLocaleString()} beneficiaries served
                          </span>
                        </div>
                        
                        <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">
                          {district.description}
                        </p>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                            <GraduationCap className="w-4 h-4 mr-1" />
                            Active Programs:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {district.programs.map((program, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-koshish-blue text-koshish-blue">
                                {program}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Watch the Animation</h3>
                  <p className="text-sm text-gray-500">
                    Districts are lighting up one by one! Click on any highlighted district to see our work there.
                  </p>
                  <div className="mt-4">
                    <div className="text-sm text-koshish-blue font-medium">
                      ✨ {animatedDistricts.size} of {districts.length} districts activated
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Summary Stats */}
            <Card className="bg-gradient-to-r from-koshish-blue to-blue-600 text-white overflow-hidden">
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-koshish-gold" />
                  Our Impact in Bihar
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-koshish-gold">
                      {districts.length}
                    </div>
                    <div className="text-xs opacity-90">Districts Covered</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-koshish-gold">
                      {totalBeneficiaries.toLocaleString()}+
                    </div>
                    <div className="text-xs opacity-90">Lives Impacted</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm opacity-90">
                    🎯 Expanding to more districts soon
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiharMap;
