
import React from "react";

// This is a placeholder component to prevent TypeScript errors
// The actual Bihar map functionality is implemented directly in Index.tsx
// using a static image approach for better performance and reliability

const BiharMap: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="text-gray-600 text-center">
        Bihar Map functionality is implemented in the home page.
      </p>
    </div>
  );
};

export default BiharMap;
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
    },
    {
      id: "purnia",
      name: "Purnia",
      path: "M580,140 L600,130 L625,135 L635,155 L625,170 L600,175 L575,170 L570,150 Z",
      programs: ["Education Support", "Rural Development", "Water & Sanitation"],
      beneficiaries: 280,
      description: "Rural education and development programs in remote areas. We focus on improving literacy rates and basic infrastructure.",
      activeProjects: 3,
      workDetails: "6 rural schools, water purification units, and sanitation programs in 25 villages."
    },
    {
      id: "araria",
      name: "Araria",
      path: "M640,120 L660,110 L680,115 L690,135 L680,150 L660,155 L635,150 L630,130 Z",
      programs: ["Health Care", "Education Support", "Border Area Development"],
      beneficiaries: 200,
      description: "Healthcare initiatives and educational support in border areas. Special focus on maternal health and literacy programs.",
      activeProjects: 3,
      workDetails: "Mobile health units, maternal health programs, and literacy centers serving border communities."
    },
    {
      id: "siwan",
      name: "Siwan",
      path: "M180,220 L200,210 L220,215 L230,235 L220,250 L200,255 L175,250 L170,230 Z",
      programs: ["Women Empowerment", "Agriculture Support", "Organic Farming"],
      beneficiaries: 350,
      description: "Agricultural development and women empowerment programs. We promote organic farming and women's cooperatives.",
      activeProjects: 4,
      workDetails: "Organic farming training, women's cooperatives, and sustainable agriculture programs."
    },
    {
      id: "begusarai",
      name: "Begusarai",
      path: "M380,240 L400,230 L425,235 L435,255 L425,270 L400,275 L375,270 L370,250 Z",
      programs: ["Industrial Development", "Education", "Skill Training"],
      beneficiaries: 420,
      description: "Supporting industrial workers and educational programs. We provide skill training for industrial employment.",
      activeProjects: 5,
      workDetails: "Industrial skill training centers, worker welfare programs, and educational support."
    },
    {
      id: "madhubani",
      name: "Madhubani",
      path: "M440,160 L460,150 L485,155 L495,175 L485,190 L460,195 L435,190 L430,170 Z",
      programs: ["Art & Culture", "Women Empowerment", "Traditional Crafts"],
      beneficiaries: 380,
      description: "Preserving local art culture and empowering women artisans. We support Madhubani painting artists and traditional crafts.",
      activeProjects: 4,
      workDetails: "Art training centers, craft cooperatives, and cultural preservation programs for 200+ artisans."
    },
    {
      id: "nalanda",
      name: "Nalanda",
      path: "M340,320 L360,310 L385,315 L395,335 L385,350 L360,355 L335,350 L330,330 Z",
      programs: ["Education", "Historical Preservation", "Tourism Development"],
      beneficiaries: 300,
      description: "Educational programs and historical site preservation. We promote education tourism and skill development.",
      activeProjects: 3,
      workDetails: "Educational tours, skill development programs, and community awareness about historical heritage."
    },
    {
      id: "jehanabad",
      name: "Jehanabad",
      path: "M300,340 L320,330 L340,335 L350,355 L340,370 L320,375 L295,370 L290,350 Z",
      programs: ["Rural Development", "Women's Health", "Agriculture"],
      beneficiaries: 250,
      description: "Rural development programs focusing on women's health and agricultural improvements.",
      activeProjects: 3,
      workDetails: "Women's health clinics, agricultural extension services, and rural development projects."
    },
    {
      id: "aurangabad",
      name: "Aurangabad",
      path: "M350,380 L370,370 L395,375 L405,395 L395,410 L370,415 L345,410 L340,390 Z",
      programs: ["Tribal Development", "Forest Conservation", "Livelihood"],
      beneficiaries: 180,
      description: "Tribal community development and forest conservation programs. Focus on sustainable livelihood for tribal families.",
      activeProjects: 2,
      workDetails: "Tribal welfare programs, forest conservation initiatives, and alternative livelihood projects."
    },
    {
      id: "katihar",
      name: "Katihar",
      path: "M520,180 L540,170 L565,175 L575,195 L565,210 L540,215 L515,210 L510,190 Z",
      programs: ["Flood Relief", "Education", "Infrastructure"],
      beneficiaries: 400,
      description: "Flood relief operations and educational infrastructure development in flood-prone areas.",
      activeProjects: 4,
      workDetails: "Flood relief centers, disaster preparedness training, and educational infrastructure projects."
    },
    {
      id: "kishanganj",
      name: "Kishanganj",
      path: "M580,100 L600,90 L620,95 L630,115 L620,130 L600,135 L575,130 L570,110 Z",
      programs: ["Minority Welfare", "Education", "Skill Development"],
      beneficiaries: 220,
      description: "Minority community welfare and educational programs. Focus on skill development and employment generation.",
      activeProjects: 3,
      workDetails: "Minority welfare centers, skill training programs, and educational support initiatives."
    },
    {
      id: "banka",
      name: "Banka",
      path: "M480,300 L500,290 L525,295 L535,315 L525,330 L500,335 L475,330 L470,310 Z",
      programs: ["Tribal Education", "Health Care", "Mining Area Development"],
      beneficiaries: 160,
      description: "Tribal education and healthcare in mining-affected areas. Special focus on environmental health.",
      activeProjects: 2,
      workDetails: "Tribal schools, health camps, and environmental awareness programs in mining areas."
    },
    {
      id: "munger",
      name: "Munger",
      path: "M440,280 L460,270 L485,275 L495,295 L485,310 L460,315 L435,310 L430,290 Z",
      programs: ["River Conservation", "Fisheries", "Community Health"],
      beneficiaries: 290,
      description: "River Ganga conservation and fisheries development. Community health programs for riverside villages.",
      activeProjects: 3,
      workDetails: "River conservation projects, fisheries cooperatives, and community health initiatives."
    },
    {
      id: "lakhisarai",
      name: "Lakhisarai",
      path: "M400,300 L420,290 L440,295 L450,315 L440,330 L420,335 L395,330 L390,310 Z",
      programs: ["Industrial Pollution Control", "Health", "Education"],
      beneficiaries: 150,
      description: "Addressing industrial pollution and health issues. Educational programs for industrial workers' children.",
      activeProjects: 2,
      workDetails: "Pollution awareness programs, health camps, and educational support for workers' families."
    },
    {
      id: "sheikhpura",
      name: "Sheikhpura",
      path: "M360,290 L380,280 L400,285 L410,305 L400,320 L380,325 L355,320 L350,300 Z",
      programs: ["Agriculture", "Water Conservation", "Rural Health"],
      beneficiaries: 180,
      description: "Agricultural development and water conservation programs. Rural health initiatives for farming communities.",
      activeProjects: 2,
      workDetails: "Water conservation projects, agricultural training, and rural health clinics."
    },
    {
      id: "jamui",
      name: "Jamui",
      path: "M420,340 L440,330 L465,335 L475,355 L465,370 L440,375 L415,370 L410,350 Z",
      programs: ["Drought Relief", "Water Harvesting", "Livelihood"],
      beneficiaries: 200,
      description: "Drought relief and water harvesting programs. Alternative livelihood options for drought-affected farmers.",
      activeProjects: 3,
      workDetails: "Water harvesting structures, drought relief programs, and alternative livelihood training."
    },
    {
      id: "nawada",
      name: "Nawada",
      path: "M380,360 L400,350 L425,355 L435,375 L425,390 L400,395 L375,390 L370,370 Z",
      programs: ["Stone Mining Welfare", "Education", "Health"],
      beneficiaries: 170,
      description: "Welfare programs for stone mining workers and their families. Focus on education and health services.",
      activeProjects: 2,
      workDetails: "Worker welfare programs, schools for miners' children, and occupational health services."
    },
    {
      id: "rohtas",
      name: "Rohtas",
      path: "M250,350 L270,340 L295,345 L305,365 L295,380 L270,385 L245,380 L240,360 Z",
      programs: ["Cement Industry Welfare", "Environmental Protection", "Education"],
      beneficiaries: 320,
      description: "Welfare programs for cement industry workers and environmental protection initiatives.",
      activeProjects: 3,
      workDetails: "Environmental monitoring, worker health programs, and educational initiatives."
    },
    {
      id: "kaimur",
      name: "Kaimur",
      path: "M200,380 L220,370 L245,375 L255,395 L245,410 L220,415 L195,410 L190,390 Z",
      programs: ["Tribal Welfare", "Forest Rights", "Livelihood"],
      beneficiaries: 140,
      description: "Tribal welfare and forest rights advocacy. Sustainable livelihood programs for forest-dependent communities.",
      activeProjects: 2,
      workDetails: "Forest rights advocacy, tribal welfare programs, and sustainable livelihood initiatives."
    },
    {
      id: "buxar",
      name: "Buxar",
      path: "M180,320 L200,310 L225,315 L235,335 L225,350 L200,355 L175,350 L170,330 Z",
      programs: ["Border Security Support", "Veterans Welfare", "Agriculture"],
      beneficiaries: 190,
      description: "Support for border security personnel families and veterans welfare. Agricultural development programs.",
      activeProjects: 2,
      workDetails: "Veterans welfare programs, family support services, and agricultural extension."
    },
    {
      id: "bhojpur",
      name: "Bhojpur",
      path: "M220,290 L240,280 L265,285 L275,305 L265,320 L240,325 L215,320 L210,300 Z",
      programs: ["Caste Harmony", "Education", "Social Justice"],
      beneficiaries: 280,
      description: "Promoting caste harmony and social justice. Educational programs for marginalized communities.",
      activeProjects: 3,
      workDetails: "Social harmony programs, educational support for marginalized groups, and legal aid."
    },
    {
      id: "arwal",
      name: "Arwal",
      path: "M280,320 L300,310 L320,315 L330,335 L320,350 L300,355 L275,350 L270,330 Z",
      programs: ["Women Safety", "Education", "Health"],
      beneficiaries: 120,
      description: "Women safety programs and educational initiatives. Focus on girls' education and women's health.",
      activeProjects: 2,
      workDetails: "Women safety initiatives, girls' education programs, and women's health camps."
    },
    {
      id: "sitamarhi",
      name: "Sitamarhi",
      path: "M320,140 L340,130 L365,135 L375,155 L365,170 L340,175 L315,170 L310,150 Z",
      programs: ["Nepal Border Development", "Health", "Education"],
      beneficiaries: 250,
      description: "Cross-border development programs and health initiatives near Nepal border.",
      activeProjects: 3,
      workDetails: "Border area development, cross-border health programs, and educational exchanges."
    },
    {
      id: "sheohar",
      name: "Sheohar",
      path: "M280,120 L300,110 L320,115 L330,135 L320,150 L300,155 L275,150 L270,130 Z",
      programs: ["Flood Management", "Agriculture", "Livestock"],
      beneficiaries: 130,
      description: "Flood management and agricultural development. Livestock development programs for rural families.",
      activeProjects: 2,
      workDetails: "Flood management systems, agricultural training, and livestock development programs."
    },
    {
      id: "east_champaran",
      name: "East Champaran",
      path: "M240,140 L260,130 L285,135 L295,155 L285,170 L260,175 L235,170 L230,150 Z",
      programs: ["Mahatma Gandhi Legacy", "Rural Development", "Education"],
      beneficiaries: 400,
      description: "Continuing Mahatma Gandhi's legacy through rural development and educational programs.",
      activeProjects: 4,
      workDetails: "Gandhian philosophy programs, rural development projects, and educational initiatives."
    },
    {
      id: "west_champaran",
      name: "West Champaran",
      path: "M180,160 L200,150 L225,155 L235,175 L225,190 L200,195 L175,190 L170,170 Z",
      programs: ["Tiger Conservation", "Eco-tourism", "Tribal Development"],
      beneficiaries: 220,
      description: "Tiger conservation and eco-tourism development. Tribal community development programs.",
      activeProjects: 3,
      workDetails: "Wildlife conservation, eco-tourism training, and tribal development initiatives."
    },
    {
      id: "gopalganj",
      name: "Gopalganj",
      path: "M200,200 L220,190 L245,195 L255,215 L245,230 L220,235 L195,230 L190,210 Z",
      programs: ["Flood Relief", "Agriculture", "Cooperative Development"],
      beneficiaries: 300,
      description: "Flood relief operations and agricultural cooperative development. Focus on sustainable farming.",
      activeProjects: 3,
      workDetails: "Flood relief centers, agricultural cooperatives, and sustainable farming programs."
    },
    {
      id: "saran",
      name: "Saran",
      path: "M220,220 L240,210 L265,215 L275,235 L265,250 L240,255 L215,250 L210,230 Z",
      programs: ["River Erosion Control", "Displacement Rehabilitation", "Livelihood"],
      beneficiaries: 350,
      description: "River erosion control and rehabilitation of displaced families. Alternative livelihood programs.",
      activeProjects: 4,
      workDetails: "Erosion control measures, rehabilitation programs, and livelihood support for displaced families."
    },
    {
      id: "vaishali",
      name: "Vaishali",
      path: "M280,200 L300,190 L325,195 L335,215 L325,230 L300,235 L275,230 L270,210 Z",
      programs: ["Historical Heritage", "Women Empowerment", "Education"],
      beneficiaries: 400,
      description: "Historical heritage preservation and women empowerment programs. Educational tourism development.",
      activeProjects: 4,
      workDetails: "Heritage conservation, women's cooperatives, and educational tourism programs."
    },
    {
      id: "samastipur",
      name: "Samastipur",
      path: "M340,200 L360,190 L385,195 L395,215 L385,230 L360,235 L335,230 L330,210 Z",
      programs: ["Sugarcane Farmers Welfare", "Cooperative Sugar Mills", "Rural Development"],
      beneficiaries: 450,
      description: "Sugarcane farmers welfare and cooperative development. Rural infrastructure development programs.",
      activeProjects: 5,
      workDetails: "Farmers' cooperatives, sugar mill worker welfare, and rural infrastructure projects."
    },
    {
      id: "khagaria",
      name: "Khagaria",
      path: "M480,220 L500,210 L525,215 L535,235 L525,250 L500,255 L475,250 L470,230 Z",
      programs: ["Fisheries Development", "Flood Management", "Livelihood"],
      beneficiaries: 200,
      description: "Fisheries development and flood management programs. Alternative livelihood for fishing communities.",
      activeProjects: 3,
      workDetails: "Fisheries cooperatives, flood preparedness, and livelihood diversification programs."
    },
    {
      id: "madhepura",
      name: "Madhepura",
      path: "M520,200 L540,190 L565,195 L575,215 L565,230 L540,235 L515,230 L510,210 Z",
      programs: ["Makhana Cultivation", "Water Body Conservation", "Farmer Training"],
      beneficiaries: 180,
      description: "Makhana (fox nut) cultivation and water body conservation. Training programs for traditional farmers.",
      activeProjects: 3,
      workDetails: "Makhana cultivation training, water body restoration, and farmer cooperative development."
    },
    {
      id: "supaul",
      name: "Supaul",
      path: "M480,160 L500,150 L525,155 L535,175 L525,190 L500,195 L475,190 L470,170 Z",
      programs: ["Nepal Border Trade", "Cross-border Healthcare", "Education"],
      beneficiaries: 160,
      description: "Cross-border trade facilitation and healthcare programs. Educational exchange programs with Nepal.",
      activeProjects: 2,
      workDetails: "Border trade facilitation, cross-border health services, and educational programs."
    },
    {
      id: "saharsa",
      name: "Saharsa",
      path: "M440,220 L460,210 L485,215 L495,235 L485,250 L460,255 L435,250 L430,230 Z",
      programs: ["Koshi River Management", "Disaster Preparedness", "Agriculture"],
      beneficiaries: 240,
      description: "Koshi river management and disaster preparedness programs. Agricultural development in flood-prone areas.",
      activeProjects: 3,
      workDetails: "River management projects, disaster preparedness training, and flood-resistant agriculture."
    }
  ];

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

    const timer = setTimeout(animateDistricts, 1000);
    return () => clearTimeout(timer);
  }, []);

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
              className="w-full h-auto max-h-[600px] cursor-pointer bihar-map-container"
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
                    className={`
                      district-path transition-all duration-300 ease-in-out
                      ${animatedDistricts.has(district.id) ? 'opacity-100 district-loading' : 'opacity-50'}
                      ${hoveredDistrict === district.id ? 'district-glow' : ''}
                    `}
                    style={{
                      filter: hoveredDistrict === district.id ? 'url(#glow)' : 'none',
                      transformOrigin: 'center',
                      transform: hoveredDistrict === district.id ? 'scale(1.02)' : 'scale(1)',
                      animationDelay: `${index * 0.2}s`
                    }}
                    onClick={() => handleDistrictClick(district)}
                    onMouseEnter={() => handleDistrictHover(district.id)}
                    onMouseLeave={() => handleDistrictHover(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleDistrictClick(district);
                      }
                    }}
                    tabIndex={animatedDistricts.has(district.id) ? 0 : -1}
                    role="button"
                    aria-label={`${district.name} district - ${district.beneficiaries} beneficiaries, ${district.programs.length} programs. Click for details.`}
                  />
                  
                  {/* District Labels */}
                  {animatedDistricts.has(district.id) && (
                    <text
                      x={district.path.includes('M 180') ? 200 : district.path.includes('M 640') ? 660 : parseInt(district.path.split(' ')[1].replace('M', '')) + 25}
                      y={parseInt(district.path.split(' ')[2].replace(',', '')) + 5}
                      textAnchor="middle"
                      className={`
                        text-xs font-semibold pointer-events-none transition-all duration-300
                        ${hoveredDistrict === district.id ? 'fill-white text-shadow' : 'fill-gray-700'}
                      `}
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        textShadow: hoveredDistrict === district.id ? '1px 1px 2px rgba(0,0,0,0.7)' : 'none'
                      }}
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
                      style={{
                        animationDelay: `${index * 0.2}s`,
                      }}
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
                <text x="10" y="20" className="text-sm font-bold fill-koshish-blue">Our Reach</text>
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
          <div className="modal-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="modal-content bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-koshish-blue flex items-center">
                      <MapPin className="w-6 h-6 mr-2 text-koshish-gold" />
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
                  <Card className="bg-blue-50 border-blue-200 interactive-element">
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600 stats-counter">
                        {selectedDistrict.beneficiaries.toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-600">Beneficiaries</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-green-50 border-green-200 interactive-element">
                    <CardContent className="p-4 text-center">
                      <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600 stats-counter">
                        {selectedDistrict.activeProjects}
                      </div>
                      <div className="text-sm text-green-600">Active Projects</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-yellow-50 border-yellow-200 interactive-element">
                    <CardContent className="p-4 text-center">
                      <Heart className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-600 stats-counter">
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
                        className="border-koshish-blue text-koshish-blue interactive-element"
                      >
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-koshish-blue to-blue-600 text-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Want to Support Our Work?</h4>
                  <p className="text-sm opacity-90 mb-3">
                    Join us in making a difference in {selectedDistrict.name} district
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="btn-primary bg-white text-koshish-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                      Donate Now
                    </button>
                    <button className="btn-primary bg-koshish-gold text-koshish-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors">
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
              <div className="text-3xl font-bold mb-1">15+</div>
              <div className="text-pink-200">Program Types</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BiharMap;
