
import Navbar from "@/components/Navbar";
import WelcomeVideo from "@/components/WelcomeVideo";
import AnimatedCounter from "@/components/AnimatedCounter";
import TeamSection from "@/components/TeamSection";
import AchievementsSection from "@/components/AchievementsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-koshish-light-blue to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-koshish-blue to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Building Hope, 
                <span className="block text-koshish-gold">Transforming Lives</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Koshish NGO works tirelessly to uplift communities through education, 
                healthcare, and sustainable development initiatives across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/donate" 
                  className="bg-koshish-gold text-koshish-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors duration-300 text-center"
                >
                  Donate Now
                </a>
                <a 
                  href="/volunteer" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-koshish-blue transition-colors duration-300 text-center"
                >
                  Join as Volunteer
                </a>
              </div>
            </div>
            <div className="lg:pl-12">
              <WelcomeVideo />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
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
            <div className="text-center p-6 bg-gradient-to-br from-koshish-light-blue to-blue-50 rounded-xl">
              <div className="text-4xl font-bold text-koshish-blue mb-2">
                <AnimatedCounter end={15000} duration={2000} />+
              </div>
              <div className="text-gray-700 font-medium">Lives Touched</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-2">
                <AnimatedCounter end={50} duration={2000} />+
              </div>
              <div className="text-gray-700 font-medium">Communities Served</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl">
              <div className="text-4xl font-bold text-amber-600 mb-2">
                <AnimatedCounter end={200} duration={2000} />+
              </div>
              <div className="text-gray-700 font-medium">Active Volunteers</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl">
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
      <section id="programs" className="py-16 bg-gray-50">
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
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-koshish-blue mb-3">Street Education Campaign</h3>
              <p className="text-gray-600 mb-4">
                Providing quality education to underprivileged children living on streets and in slums.
              </p>
              <div className="text-sm text-koshish-blue font-medium">200+ children enrolled</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">👩‍💼</div>
              <h3 className="text-xl font-bold text-koshish-blue mb-3">Women Empowerment</h3>
              <p className="text-gray-600 mb-4">
                Skill development programs and micro-finance support for women entrepreneurs.
              </p>
              <div className="text-sm text-koshish-blue font-medium">150+ women trained</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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

      {/* Achievements Section */}
      <AchievementsSection />

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
