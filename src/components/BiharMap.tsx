
import { useState } from "react";
import { MapPin, Users, GraduationCap, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BiharMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = [
    {
      name: "Patna",
      position: { top: "45%", left: "35%" },
      programs: ["Education Support", "Women Empowerment", "Legal Aid"],
      beneficiaries: 1200,
      description: "Our main headquarters coordinating all major programs across Bihar."
    },
    {
      name: "Gaya",
      position: { top: "55%", left: "40%" },
      programs: ["Women Empowerment", "Skill Development"],
      beneficiaries: 800,
      description: "Focus on women's entrepreneurship and skill development programs."
    },
    {
      name: "Muzaffarpur",
      position: { top: "25%", left: "30%" },
      programs: ["Education Support", "Child Protection"],
      beneficiaries: 650,
      description: "Primary education initiatives and child welfare programs."
    },
    {
      name: "Darbhanga",
      position: { top: "30%", left: "45%" },
      programs: ["Emergency Relief", "Health Awareness"],
      beneficiaries: 450,
      description: "Emergency response and community health programs."
    },
    {
      name: "Bhagalpur",
      position: { top: "35%", left: "55%" },
      programs: ["Legal Aid", "Community Development"],
      beneficiaries: 320,
      description: "Legal assistance and community development initiatives."
    },
    {
      name: "Purnia",
      position: { top: "15%", left: "55%" },
      programs: ["Education Support", "Rural Development"],
      beneficiaries: 280,
      description: "Rural education and development programs in remote areas."
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
                  {/* Bihar outline - simplified SVG representation */}
                  <svg 
                    viewBox="0 0 400 300" 
                    className="absolute inset-0 w-full h-full opacity-20"
                    fill="currentColor"
                  >
                    <path 
                      d="M50 80 L350 80 L350 220 L300 240 L250 250 L200 245 L150 250 L100 240 L50 220 Z" 
                      className="text-koshish-blue"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="rgba(59, 130, 246, 0.1)"
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
                          className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 animate-pulse ${
                            selectedDistrict === district.name 
                              ? 'bg-koshish-gold scale-150' 
                              : 'bg-koshish-blue hover:bg-koshish-gold hover:scale-125'
                          }`}
                          style={{ animationDelay: `${index * 0.2}s` }}
                        />
                        
                        {/* District Label */}
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <Badge 
                            className={`text-xs font-medium transition-all duration-300 ${
                              selectedDistrict === district.name 
                                ? 'bg-koshish-gold text-koshish-blue scale-110' 
                                : 'bg-koshish-blue text-white opacity-0 group-hover:opacity-100'
                            }`}
                          >
                            {district.name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Title overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="font-bold text-koshish-blue flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Bihar State Map
                    </h3>
                    <p className="text-xs text-gray-600">Click on markers to see details</p>
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
                  <Card key={district.name} className="border-l-4 border-koshish-gold">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-koshish-blue mb-3 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-koshish-gold" />
                        {district.name} District
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          <span className="font-semibold text-koshish-blue">
                            {district.beneficiaries.toLocaleString()} beneficiaries
                          </span>
                        </div>
                        
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {district.description}
                        </p>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Active Programs:</p>
                          <div className="flex flex-wrap gap-2">
                            {district.programs.map((program, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
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
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Select a District</h3>
                  <p className="text-sm text-gray-500">
                    Click on any marker on the map to see detailed information about our programs in that district.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Summary Stats */}
            <Card className="bg-gradient-to-r from-koshish-blue to-blue-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Our Impact in Bihar
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-koshish-gold">
                      {districts.length}
                    </div>
                    <div className="text-xs opacity-90">Districts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-koshish-gold">
                      {totalBeneficiaries.toLocaleString()}+
                    </div>
                    <div className="text-xs opacity-90">Beneficiaries</div>
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
