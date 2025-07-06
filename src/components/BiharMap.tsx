
import { useState } from "react";
import { MapPin, Users, GraduationCap, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BiharMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = [
    {
      name: "Patna",
      position: { top: "50%", left: "45%" },
      programs: ["Education Support", "Women Empowerment", "Legal Aid"],
      beneficiaries: 1200,
      description: "Our main headquarters coordinating all major programs across Bihar."
    },
    {
      name: "Gaya",
      position: { top: "65%", left: "50%" },
      programs: ["Women Empowerment", "Skill Development"],
      beneficiaries: 800,
      description: "Focus on women's entrepreneurship and skill development programs."
    },
    {
      name: "Muzaffarpur",
      position: { top: "25%", left: "35%" },
      programs: ["Education Support", "Child Protection"],
      beneficiaries: 650,
      description: "Primary education initiatives and child welfare programs."
    },
    {
      name: "Darbhanga",
      position: { top: "30%", left: "55%" },
      programs: ["Emergency Relief", "Health Awareness"],
      beneficiaries: 450,
      description: "Emergency response and community health programs."
    },
    {
      name: "Bhagalpur",
      position: { top: "45%", left: "75%" },
      programs: ["Legal Aid", "Community Development"],
      beneficiaries: 320,
      description: "Legal assistance and community development initiatives."
    },
    {
      name: "Purnia",
      position: { top: "15%", left: "75%" },
      programs: ["Education Support", "Rural Development"],
      beneficiaries: 280,
      description: "Rural education and development programs in remote areas."
    },
    {
      name: "Araria",
      position: { top: "12%", left: "85%" },
      programs: ["Health Care", "Education Support"],
      beneficiaries: 200,
      description: "Healthcare initiatives and educational support in border areas."
    },
    {
      name: "Siwan",
      position: { top: "35%", left: "20%" },
      programs: ["Women Empowerment", "Agriculture Support"],
      beneficiaries: 350,
      description: "Agricultural development and women empowerment programs."
    }
  ];

  const totalBeneficiaries = districts.reduce((sum, district) => sum + district.beneficiaries, 0);

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our Reach Across Bihar</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serving communities across {districts.length} districts with {totalBeneficiaries.toLocaleString()}+ beneficiaries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-green-100 to-blue-100 h-96 md:h-[500px]">
                  {/* Bihar State Outline - More accurate shape */}
                  <svg 
                    viewBox="0 0 400 300" 
                    className="absolute inset-0 w-full h-full opacity-30"
                    fill="currentColor"
                  >
                    <path 
                      d="M80 60 L120 45 L160 50 L200 45 L240 50 L280 45 L320 55 L350 70 L370 90 L380 120 L375 150 L370 180 L360 200 L340 220 L320 235 L290 245 L260 250 L230 248 L200 245 L170 250 L140 245 L110 235 L85 220 L65 200 L50 180 L45 150 L50 120 L60 90 Z" 
                      className="text-koshish-blue"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="rgba(59, 130, 246, 0.15)"
                    />
                    {/* Internal district boundaries */}
                    <path 
                      d="M80 60 L200 80 M120 100 L280 120 M150 140 L320 160 M100 180 L300 200" 
                      className="text-gray-400"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  </svg>

                  {/* District Markers */}
                  {districts.map((district, index) => (
                    <div
                      key={district.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={district.position}
                      onClick={() => setSelectedDistrict(selectedDistrict === district.name ? null : district.name)}
                    >
                      <div className={`relative group ${selectedDistrict === district.name ? 'z-20' : 'z-10'}`}>
                        <div 
                          className={`w-5 h-5 rounded-full border-3 border-white shadow-lg transition-all duration-500 ${
                            selectedDistrict === district.name 
                              ? 'bg-koshish-gold scale-150 animate-pulse' 
                              : 'bg-koshish-blue hover:bg-koshish-gold hover:scale-125 animate-bounce'
                          }`}
                          style={{ 
                            animationDelay: `${index * 0.3}s`,
                            animationDuration: selectedDistrict === district.name ? '1s' : '2s'
                          }}
                        />
                        
                        {/* District Label */}
                        <div className="absolute top-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <Badge 
                            className={`text-xs font-medium transition-all duration-300 ${
                              selectedDistrict === district.name 
                                ? 'bg-koshish-gold text-koshish-blue scale-110 shadow-lg' 
                                : 'bg-koshish-blue text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0'
                            }`}
                          >
                            {district.name}
                          </Badge>
                        </div>

                        {/* Ripple effect for selected district */}
                        {selectedDistrict === district.name && (
                          <div className="absolute inset-0 w-5 h-5 rounded-full bg-koshish-gold opacity-30 animate-ping"></div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Title overlay */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <h3 className="font-bold text-koshish-blue flex items-center text-lg">
                      <MapPin className="w-5 h-5 mr-2 text-koshish-gold" />
                      Bihar State
                    </h3>
                    <p className="text-sm text-gray-600">Click on markers to see details</p>
                    <div className="mt-2 text-xs text-koshish-blue font-medium">
                      🌟 Active in {districts.length} districts
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-koshish-blue rounded-full"></div>
                      <span className="text-gray-600">Our Centers</span>
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
              <Card className="border-dashed border-2 border-gray-300 animate-pulse">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Explore Our Presence</h3>
                  <p className="text-sm text-gray-500">
                    Click on any marker on the Bihar map to see detailed information about our programs and impact in that district.
                  </p>
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
