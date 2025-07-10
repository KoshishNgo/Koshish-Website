import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import WelcomeVideo from "@/components/WelcomeVideo";
import AnimatedCounter from "@/components/AnimatedCounter";
import TeamSection from "@/components/TeamSection";
import AchievementsSection from "@/components/AchievementsSection";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Koshish NGO - Home</title>
        <meta name="description" content="Welcome to Koshish NGO. Supporting displaced, vulnerable, and marginalized communities." />
      </Helmet>
      <Navbar />
      
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Welcome Video Section */}
      <WelcomeVideo />
      
      {/* Impact Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-koshish-blue mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Together, we have created meaningful change in thousands of lives across communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-koshish-blue mb-2">
                <AnimatedCounter end={15000} duration={2000} />+
              </div>
              <div className="text-gray-700 font-medium">Lives Touched</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <AnimatedCounter end={50} duration={2000} />+
              </div>
              <div className="text-gray-700 font-medium">Communities Served</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-amber-600 mb-2">
                <AnimatedCounter end={200} duration={2000} />+
              </div>
              <div className="text-gray-700 font-medium">Active Volunteers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                <AnimatedCounter end={25} duration={2000} />+
              </div>
              <div className="text-gray-700 font-medium">Ongoing Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gradient-to-r from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission & Vision
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-koshish-gold">Mission</h3>
                  <p className="text-blue-100 leading-relaxed">
                    To empower underprivileged communities through sustainable development, 
                    education, healthcare, and social welfare initiatives that create lasting positive change.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-koshish-gold">Vision</h3>
                  <p className="text-blue-100 leading-relaxed">
                    A world where every individual has access to basic necessities, education, 
                    and opportunities to thrive with dignity and hope.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl mb-3">🎓</div>
                <h4 className="font-semibold mb-2">Education</h4>
                <p className="text-sm text-blue-100">Quality education for all children</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl mb-3">🏥</div>
                <h4 className="font-semibold mb-2">Healthcare</h4>
                <p className="text-sm text-blue-100">Accessible medical care and awareness</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl mb-3">💼</div>
                <h4 className="font-semibold mb-2">Livelihood</h4>
                <p className="text-sm text-blue-100">Skill development and employment</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="font-semibold mb-2">Community</h4>
                <p className="text-sm text-blue-100">Strengthening social bonds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Programs */}
      <section id="programs" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-koshish-blue mb-4">
              Our Key Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive initiatives designed to address critical social issues and create sustainable impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-koshish-blue mb-3">Street Education Campaign</h3>
              <p className="text-gray-600 mb-4">
                Providing quality education to underprivileged children living on streets and in slums.
              </p>
              <div className="text-sm text-koshish-blue font-medium">200+ children enrolled</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">👩‍💼</div>
              <h3 className="text-xl font-bold text-koshish-blue mb-3">Women Empowerment</h3>
              <p className="text-gray-600 mb-4">
                Skill development programs and micro-finance support for women entrepreneurs.
              </p>
              <div className="text-sm text-koshish-blue font-medium">150+ women trained</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold text-koshish-blue mb-3">Legal Aid Support</h3>
              <p className="text-gray-600 mb-4">
                Free legal assistance and awareness programs for migrant workers and marginalized communities.
              </p>
              <div className="text-sm text-koshish-blue font-medium">100+ cases resolved</div>
            </div>
          </div>
          <div className="text-center mt-12">
            <a 
              href="/programs" 
              className="inline-block bg-koshish-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              View All Programs
            </a>
          </div>
        </div>
      </section>

      {/* Bihar Map Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-koshish-blue mb-4">
              हमारी पहुंच पूरे बिहार में
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              Our Reach Across Bihar
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              हम बिहार के 20+ जिलों में काम कर रहे हैं, समुदायों के जीवन में सकारात्मक बदलाव लाने के लिए विभिन्न कार्यक्रमों और पहलों के माध्यम से।
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              We work across 20+ districts of Bihar, bringing positive change to communities through our various programs and initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Bihar Map */}
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-2xl bihar-map-container">
                <h4 className="text-xl font-bold text-koshish-blue mb-4 text-center">
                  Bihar Districts Map
                </h4>
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src="/bihar map.jpeg" 
                    alt="Bihar Districts Map showing our operational areas"
                    className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                    style={{ maxHeight: '500px' }}
                  />
                  <div className="absolute top-4 right-4 bg-koshish-blue text-white px-3 py-2 rounded-lg text-sm font-semibold">
                    20+ Districts
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse-green"></span>
                    Active in 20+ Districts
                  </div>
                </div>
              </div>
            </div>

            {/* Bihar History & Our Work */}
            <div className="space-y-6">
              {/* Bihar History Box */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-koshish-gold bihar-history-box">
                <h4 className="text-xl font-bold text-koshish-blue mb-4 flex items-center">
                  <span className="text-2xl mr-2">📚</span>
                  बिहार का संक्षिप्त इतिहास
                </h4>
                <div className="text-gray-700 space-y-3 text-sm leading-relaxed">
                  <p>
                    <strong>बिहार</strong> भारत का एक ऐतिहासिक राज्य है जो प्राचीन काल से ही शिक्षा, संस्कृति और आध्यात्म का केंद्र रहा है। 
                    यहाँ नालंदा और विक्रमशिला जैसे प्रसिद्ध विश्वविद्यालय थे।
                  </p>
                  <p>
                    महात्मा बुद्ध और महावीर की जन्मभूमि बिहार में गुप्त साम्राज्य और मौर्य साम्राज्य का गौरवशाली इतिहास है। 
                    आज भी यह राज्य अपनी समृद्ध विरासत को संजोए हुए विकास की राह पर अग्रसर है।
                  </p>
                  <p>
                    <strong>जनसंख्या:</strong> 12+ करोड़ | <strong>जिले:</strong> 38 | <strong>भाषा:</strong> हिंदी, भोजपुरी, मैथिली
                  </p>
                </div>
              </div>

              {/* Our Work Stats */}
              <div className="bg-gradient-to-r from-koshish-blue to-blue-700 text-white p-6 rounded-2xl shadow-lg bihar-stats-card">
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  हमारा योगदान
                </h4>
                <div className="grid grid-cols-2 gap-4 bihar-stats-grid">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-koshish-gold">20+</div>
                    <div className="text-sm text-blue-200">ज़िला</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-koshish-gold">15,000+</div>
                    <div className="text-sm text-blue-200">सहभागी</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-koshish-gold">50+</div>
                    <div className="text-sm text-blue-200">समुदाय</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-koshish-gold">25+</div>
                    <div className="text-sm text-blue-200">प्रोजेक्ट्स</div>
                  </div>
                </div>
              </div>

              {/* Key Focus Areas */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h4 className="text-xl font-bold text-koshish-blue mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  मुख्य कार्यक्षेत्र
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-lg mr-2">📚</span>
                    <span className="text-sm font-medium text-gray-700">शिक्षा</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-lg mr-2">👩‍💼</span>
                    <span className="text-sm font-medium text-gray-700">महिला सशक्तिकरण</span>
                  </div>
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-lg mr-2">⚖️</span>
                    <span className="text-sm font-medium text-gray-700">कानूनी सहायता</span>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-lg mr-2">🏥</span>
                    <span className="text-sm font-medium text-gray-700">स्वास्थ्य सेवा</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Districts We Serve */}
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
            <h4 className="text-2xl font-bold text-koshish-blue mb-6 text-center">
              हमारे कार्यक्षेत्र के जिले / Districts We Serve
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 text-center district-grid">
              {[
                'पटना', 'गया', 'मुजफ्फरपुर', 'दरभंगा', 'भागलपुर',
                'पूर्णिया', 'सहरसा', 'आरा', 'बेगूसराय', 'मधुबनी',
                'सीतामढ़ी', 'वैशाली', 'समस्तीपुर', 'खगड़िया', 'कटिहार',
                'नवादा', 'जमुई', 'लखीसराय', 'शेखपुरा', 'नालंदा',
                'रोहतास', 'औरंगाबाद', 'गोपालगंज', 'सीवान', 'चंपारण'
              ].map((district, index) => (
                <div 
                  key={index}
                  className="district-card bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg text-sm font-medium text-gray-700 hover:from-koshish-blue hover:to-blue-600 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  {district}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                और कई अन्य जिलों में हमारा कार्य जारी है... | And many more districts...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <div id="achievements">
        <AchievementsSection />
      </div>

      {/* Team Section */}
      <TeamSection />

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-koshish-gold to-yellow-400 text-koshish-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Be Part of the Change
          </h2>
          <p className="text-lg mb-8 text-blue-800">
            Your support can transform lives and build stronger communities. 
            Join us in our mission to create a better world for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/donate" 
              className="bg-koshish-blue text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Make a Donation
            </a>
            <a 
              href="/volunteer" 
              className="border-2 border-koshish-blue text-koshish-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-koshish-blue hover:text-white transition-colors duration-300"
            >
              Volunteer With Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
