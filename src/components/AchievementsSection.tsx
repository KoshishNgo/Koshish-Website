
import { useEffect, useRef, useState } from "react";
import { Award, Trophy, Star, FileText, Medal, Shield, X } from "lucide-react";

const AchievementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);


useEffect(() => {
  // Always show achievements on mobile (width < 768px)
  if (window.innerWidth < 768) {
    setIsVisible(true);
    return;
  }
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

  const openCertificateModal = (achievement: any) => {
    setSelectedCertificate(achievement);
    setIsModalOpen(true);
  };

  const closeCertificateModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const achievements = [
    {
      title: "Certificate of Excellence",
      description: "Distinguished recognition for excellence in community service, social impact, and sustainable development",
      icon: <Star className="w-8 h-8 text-amber-500" />,
      year: "2000",
      image: "/certificates/certificate-excellence.jpg.pdf",
      category: "Community Impact",
      priority: 1
    },
    {
      title: "Certificate of Identification",
      description: "Official government recognition and registration certificate for charitable trust operations",
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      year: "2004",
      image: "/certificates/certificate-identification.jpg.pdf",
      category: "Official Recognition",
      priority: 2
    },
    {
      title: "Namati Justice Prize",
      description: "Recognized for outstanding contribution to legal empowerment and access to justice in underserved communities",
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      year: "2015",
      image: "/certificates/namati-justice-prize.jpg.pdf",
      category: "Legal Empowerment",
      priority: 3
    },
    {
      title: "Credibility Alliance Certification",
      description: "Norms compliance certification for transparency, accountability, and good governance standards",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      year: "2015",
      image: "/certificates/credibility-alliance.jpg.pdf",
      category: "Transparency & Governance",
      priority: 4
    },
    {
      title: "Credibility Alliance Excellence",
      description: "Advanced tier certification recognizing exceptional organizational credibility and impact",
      icon: <Award className="w-8 h-8 text-green-500" />,
      year: "2015",
      image: "/certificates/credibility-alliance-2.jpg.pdf",
      category: "Excellence Recognition",
      priority: 5
    },
    {
      title: "BSDM Certification",
      description: "Bihar State Disaster Management certification for emergency response and disaster relief capabilities",
      icon: <Medal className="w-8 h-8 text-indigo-500" />,
      year: "2018",
      image: "/certificates/bsdm-certificate.jpg.pdf",
      category: "Disaster Management",
      priority: 6
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 relative overflow-hidden ${
                isVisible 
                  ? `animate-fade-in-up opacity-100` 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Priority Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{achievement.priority}
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-6">
                {/* Icon with gradient background */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative p-4 bg-gradient-to-r from-gray-50 to-white rounded-full border-2 border-gray-100 group-hover:border-blue-200 transition-colors duration-300">
                    {achievement.icon}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {/* Category tag */}
                  <div className="inline-block">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                      {achievement.category}
                    </span>
                  </div>
                  
                  {/* Year badge */}
                  <div className="text-sm font-bold text-gray-500 bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                    Awarded {achievement.year}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-xl text-gray-800 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {achievement.description}
                  </p>
                </div>
                
                {/* Enhanced View Certificate Button */}
                <button 
                  onClick={() => openCertificateModal(achievement)}
                  className="group/btn w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <FileText className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                    <span>View Certificate</span>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Statistics Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Recognition & Impact
            </h3>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              These certifications and recognitions validate our commitment to transparency, excellence, and meaningful impact in the communities we serve. Each award represents countless hours of dedicated service and the trust placed in us by those we aim to help.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Trophy className="w-6 h-6 text-yellow-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-2xl font-bold text-yellow-700">6</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Major Awards</h4>
                <p className="text-sm text-gray-600">Prestigious recognitions from national and international organizations</p>
              </div>
              
              <div className="group p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <FileText className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-2xl font-bold text-blue-700">100%</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Compliance Rate</h4>
                <p className="text-sm text-gray-600">Full transparency and accountability standards maintained</p>
              </div>
              
              <div className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Star className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-2xl font-bold text-green-700">25+</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Years of Excellence</h4>
                <p className="text-sm text-gray-600">Continuous recognition for outstanding community service since 2000</p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
              <h4 className="text-lg font-semibold mb-2">
                Verified & Trusted Organization
              </h4>
              <p className="text-sm text-blue-100 mb-4">
                Our certifications ensure that your contributions make a real, measurable impact in the communities we serve.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="bg-white/20 px-3 py-1 rounded-full">Transparency Certified</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Government Registered</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Award Winning</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Impact Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Certificate Modal with Clear Preview */}
      {isModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-7xl max-h-[95vh] overflow-hidden relative shadow-2xl w-full">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white relative">
              <button
                onClick={closeCertificateModal}
                className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="pr-12">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-1 bg-white/20 rounded-full">
                    {selectedCertificate.icon}
                  </div>
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                    {selectedCertificate.category}
                  </span>
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                    #{selectedCertificate.priority}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">
                  {selectedCertificate.title}
                </h3>
                <p className="text-blue-100 text-sm">
                  Awarded in {selectedCertificate.year}
                </p>
              </div>
            </div>
            
            {/* Enhanced Certificate Display */}
            <div className="p-6 bg-gray-50 max-h-[calc(95vh-120px)] overflow-auto">
              <div className="bg-white rounded-xl shadow-inner">
                {/* Full-Screen PDF Preview */}
                <div className="space-y-4">
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center p-4 bg-gray-100 rounded-t-xl">
                    <a
                      href={selectedCertificate.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Open in New Tab</span>
                    </a>
                    <a
                      href={selectedCertificate.image}
                      download={`${selectedCertificate.title.replace(/\s+/g, '-')}-${selectedCertificate.year}.pdf`}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download PDF</span>
                    </a>
                    <button
                      onClick={() => {
                        const iframe = document.querySelector('#certificate-iframe');
                        if (iframe) iframe.requestFullscreen();
                      }}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a2 2 0 012-2h2M4 16v4a2 2 0 002 2h2m8-6V4a2 2 0 012-2h2v4m4 4v4a2 2 0 01-2 2h-2" />
                      </svg>
                      <span>Fullscreen</span>
                    </button>
                  </div>
                  
                  {/* PDF Preview: Show only on desktop, hide on mobile */}
                  <div className="relative bg-white rounded-b-xl">
                    <div className="block md:hidden p-8 text-center bg-gray-100 rounded-b-xl">
                      <FileText className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">
                        PDF Preview Not Available on Mobile
                      </h4>
                      <p className="text-gray-600 mb-6">
                        Please use the buttons above to view or download the certificate.
                      </p>
                      <div className="text-sm text-gray-500 bg-white p-4 rounded-lg">
                        <strong>Certificate Details:</strong><br/>
                        <span>{selectedCertificate.description}</span>
                      </div>
                    </div>
                    <iframe
                      id="certificate-iframe"
                      src={`${selectedCertificate.image}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
                      className="w-full h-[70vh] min-h-[500px] rounded-b-xl border-0 hidden md:block"
                      title={selectedCertificate.title}
                      style={{
                        display: 'block',
                        backgroundColor: '#f8f9fa'
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                  </div>
                  
                  {/* Certificate Information */}
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-2">About This Certificate</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedCertificate.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AchievementsSection;
