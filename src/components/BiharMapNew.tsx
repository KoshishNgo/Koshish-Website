import React, { useState, useEffect } from "react";
import { MapPin, Users, GraduationCap, Heart, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface District {
  id: string;
  name: string;
  path: string;
  programs: string[];
  beneficiaries: number;
  description: string;
  activeProjects: number;
  workDetails: string;
}

const BiharMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [animatedDistricts, setAnimatedDistricts] = useState<Set<string>>(new Set());

  // Sample districts data (simplified for now)
  const districts: District[] = [
    {
      id: "patna",
      name: "Patna",
      path: "M300,280 L320,270 L350,275 L370,290 L365,310 L340,320 L310,315 L295,300 Z",
      programs: ["Education Support", "Women Empowerment", "Legal Aid", "Healthcare"],
      beneficiaries: 1200,
      description: "Our main headquarters coordinating all major programs across Bihar. We run multiple education centers, women's self-help groups, and provide legal aid services to vulnerable communities.",
      activeProjects: 8,
      workDetails: "Running 15 education centers, 25 self-help groups, mobile health clinics, and legal aid camps."
    },
    {
      id: "gaya",
      name: "Gaya",
      path: "M320,350 L340,340 L365,345 L385,360 L375,380 L350,390 L325,385 L315,370 Z",
      programs: ["Women Empowerment", "Skill Development", "Microfinance"],
      beneficiaries: 800,
      description: "Focus on women's entrepreneurship and skill development programs. We provide vocational training and microfinance support to rural women.",
      activeProjects: 6,
      workDetails: "Operating 12 skill centers, 30 microfinance groups, and vocational training programs for 500+ women."
    },
    {
      id: "muzaffarpur",
      name: "Muzaffarpur",
      path: "M280,180 L300,170 L325,175 L335,195 L325,210 L300,215 L275,210 L270,190 Z",
      programs: ["Education Support", "Child Protection", "Nutrition"],
      beneficiaries: 650,
      description: "Primary education initiatives and child welfare programs. We focus on preventing child labor and ensuring nutrition for underprivileged children.",
      activeProjects: 5,
      workDetails: "Running 8 schools, 20 nutrition centers, and child protection programs covering 1000+ children."
    },
    {
      id: "darbhanga",
      name: "Darbhanga",
      path: "M420,200 L440,190 L465,195 L475,215 L465,230 L440,235 L415,230 L410,210 Z",
      programs: ["Emergency Relief", "Health Awareness", "Agriculture Support"],
      beneficiaries: 450,
      description: "Emergency response and community health programs. We provide disaster relief and promote sustainable farming practices.",
      activeProjects: 4,
      workDetails: "Disaster response teams, 15 health camps monthly, and organic farming training for 300+ farmers."
    },
    {
      id: "bhagalpur",
      name: "Bhagalpur",
      path: "M520,280 L540,270 L565,275 L575,295 L565,310 L540,315 L515,310 L510,290 Z",
      programs: ["Legal Aid", "Community Development", "Livelihood"],
      beneficiaries: 320,
      description: "Legal assistance and community development initiatives. We help people access government schemes and provide livelihood support.",
      activeProjects: 4,
      workDetails: "Legal aid clinics, community centers, and livelihood programs for 400+ families."
    }
  ];

  const totalBeneficiaries = districts.reduce((sum, district) => sum + district.beneficiaries, 0);

  // Sequential animation effect
  useEffect(() => {
    const animateDistricts = async () => {
      for (let i = 0; i < districts.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setAnimatedDistricts(prev => new Set([...prev, districts[i].id]));
      }
    };

    const timer = setTimeout(animateDistricts, 1000);
    return () => clearTimeout(timer);
  }, [districts]);

  const handleDistrictClick = (district: District) => {
    setSelectedDistrict(district);
    setShowModal(true);
  };

  const handleDistrictHover = (districtId: string | null) => {
    setHoveredDistrict(districtId);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDistrict(null);
  };

  return (
    <div className="bihar-map-wrapper">
      <div className="text-center mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-koshish-blue mb-4">
          Interactive District Map
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Click on any district to see our work and impact across all {districts.length} districts of Bihar
        </p>
      </div>

      {/* Interactive SVG Map */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
        <div className="relative">
          <svg
            viewBox="0 0 700 500"
            className="w-full h-auto max-h-[600px] cursor-pointer"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
            role="img"
            aria-label="Interactive map of Bihar showing districts where Koshish Charitable Trust operates"
          >
            {/* Bihar State Boundary */}
            <defs>
              <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#bfdbfe" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* State Background */}
            <rect x="0" y="0" width="700" height="500" fill="url(#stateGradient)" />

            {/* Districts */}
            {districts.map((district, index) => (
              <g key={district.id}>
                <path
                  d={district.path}
                  fill={
                    hoveredDistrict === district.id
                      ? "#fbbf24"
                      : animatedDistricts.has(district.id)
                      ? "#3b82f6"
                      : "#e5e7eb"
                  }
                  stroke={
                    hoveredDistrict === district.id
                      ? "#f59e0b"
                      : "#374151"
                  }
                  strokeWidth={hoveredDistrict === district.id ? "3" : "1.5"}
                  className="transition-all duration-300 ease-in-out cursor-pointer"
                  style={{
                    filter: hoveredDistrict === district.id ? 'url(#glow)' : 'none',
                    transformOrigin: 'center',
                    transform: hoveredDistrict === district.id ? 'scale(1.02)' : 'scale(1)',
                  }}
                  onClick={() => handleDistrictClick(district)}
                  onMouseEnter={() => handleDistrictHover(district.id)}
                  onMouseLeave={() => handleDistrictHover(null)}
                  tabIndex={animatedDistricts.has(district.id) ? 0 : -1}
                  role="button"
                  aria-label={`${district.name} district - ${district.beneficiaries} beneficiaries, ${district.programs.length} programs. Click for details.`}
                />
                
                {/* District Labels */}
                {animatedDistricts.has(district.id) && (
                  <text
                    x={parseInt(district.path.split(' ')[1].replace('M', '')) + 25}
                    y={parseInt(district.path.split(' ')[2].replace(',', '')) + 5}
                    textAnchor="middle"
                    className={`text-xs font-semibold pointer-events-none transition-all duration-300 ${
                      hoveredDistrict === district.id ? 'fill-white' : 'fill-gray-700'
                    }`}
                    style={{ fontSize: '11px', fontWeight: '600' }}
                  >
                    {district.name}
                  </text>
                )}

                {/* Activity Indicators */}
                {animatedDistricts.has(district.id) && (
                  <circle
                    cx={parseInt(district.path.split(' ')[1].replace('M', '')) + 15}
                    cy={parseInt(district.path.split(' ')[2].replace(',', '')) - 10}
                    r="3"
                    fill="#10b981"
                    className="animate-pulse pointer-events-none"
                  />
                )}
              </g>
            ))}

            {/* Legend */}
            <g transform="translate(20, 420)">
              <rect x="0" y="0" width="200" height="70" fill="white" fillOpacity="0.95" rx="8" stroke="#d1d5db" strokeWidth="1"/>
              <text x="10" y="20" className="text-sm font-bold fill-gray-800">Legend</text>
              <circle cx="20" cy="35" r="6" fill="#3b82f6"/>
              <text x="35" y="40" className="text-xs fill-gray-600">Active Districts</text>
              <circle cx="20" cy="55" r="6" fill="#e5e7eb"/>
              <text x="35" y="60" className="text-xs fill-gray-600">Loading...</text>
            </g>

            {/* Stats Box */}
            <g transform="translate(480, 420)">
              <rect x="0" y="0" width="200" height="70" fill="white" fillOpacity="0.95" rx="8" stroke="#d1d5db" strokeWidth="1"/>
              <text x="10" y="20" className="text-sm font-bold fill-blue-600">Our Reach</text>
              <text x="10" y="40" className="text-xs fill-gray-600">{districts.length} Districts</text>
              <text x="10" y="55" className="text-xs fill-gray-600">{totalBeneficiaries.toLocaleString()}+ Beneficiaries</text>
            </g>
          </svg>

          {/* Hover Tooltip */}
          {hoveredDistrict && (
            <div className="absolute top-4 left-4 bg-black/80 text-white p-3 rounded-lg text-sm max-w-xs z-10 pointer-events-none">
              <div className="font-bold">
                {districts.find(d => d.id === hoveredDistrict)?.name}
              </div>
              <div className="text-xs mt-1">
                Click to see our work details
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal/Popup for District Details */}
      {showModal && selectedDistrict && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-600 flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-yellow-500" />
                    {selectedDistrict.name} District
                  </h3>
                  <p className="text-gray-600 mt-1">Our impact and programs</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedDistrict.beneficiaries.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-600">Beneficiaries</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {selectedDistrict.activeProjects}
                    </div>
                    <div className="text-sm text-green-600">Active Projects</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">
                      {selectedDistrict.programs.length}
                    </div>
                    <div className="text-sm text-yellow-600">Programs</div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">About Our Work</h4>
                <p className="text-gray-600 leading-relaxed">{selectedDistrict.description}</p>
              </div>

              {/* Work Details */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Current Initiatives</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">{selectedDistrict.workDetails}</p>
                </div>
              </div>

              {/* Programs */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Active Programs</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDistrict.programs.map((program, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="border-blue-600 text-blue-600"
                    >
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Want to Support Our Work?</h4>
                <p className="text-sm opacity-90 mb-3">
                  Join us in making a difference in {selectedDistrict.name} district
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    Donate Now
                  </button>
                  <button className="bg-yellow-500 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors">
                    Volunteer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-200" />
            <div className="text-3xl font-bold mb-1">{districts.length}</div>
            <div className="text-blue-200">Districts Covered</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-3 text-green-200" />
            <div className="text-3xl font-bold mb-1">{totalBeneficiaries.toLocaleString()}+</div>
            <div className="text-green-200">Lives Impacted</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6 text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-3 text-yellow-200" />
            <div className="text-3xl font-bold mb-1">{districts.reduce((sum, d) => sum + d.activeProjects, 0)}</div>
            <div className="text-yellow-200">Active Projects</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 mx-auto mb-3 text-pink-200" />
            <div className="text-3xl font-bold mb-1">10+</div>
            <div className="text-pink-200">Program Types</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BiharMap;
