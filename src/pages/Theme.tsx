import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  Users, 
  Heart, 
  Building2, 
  Leaf, 
  Shield, 
  Sprout, 
  GraduationCap,
  Gavel
} from "lucide-react";

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const themes = [
    {
      id: "human-rights",
      title: "Human Rights & Fundamental Rights",
      image: "/theme/human rights 1.jpeg",
      fallbackImage: "/theme/human rights 2.jpeg",
      icon: Scale,
      quote: "All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.",
      source: "Article 1, The Universal Declaration on Human Rights",
      summary: "Our programmes focus on protection and promotion of Fundamental Rights including Right to Water & Food, Right to Health & Sanitation, Right to Work, Right to Shelter, Right to Clean Air & Environment, Land & Forest Rights, Right to Information, Right to Education, Right to Expression, Right to Culture and Right to Justice.",
      activities: [
        "Legal awareness programmes about existing laws",
        "Better implementation of rule of laws",
        "Protection of Constitutional & Fundamental Rights",
        "Policy advocacy with Government departments"
      ],
      whyMatters: "Fundamental rights are the backbone of a just society. In many rural and marginalized communities, these rights are often overlooked or denied. Our work ensures that every individual is aware of and can claim their rights, leading to a more equitable society.",
      successStory: "In 2024, Koshish helped a group of migrant workers in Bihar secure their right to fair wages and safe working conditions through legal aid and advocacy, setting a precedent for hundreds of others.",
      getInvolved: "Volunteer for our legal awareness camps or help us document rights violations in your area.",
      color: "border-blue-200 hover:border-blue-400",
      bgColor: "bg-blue-50 hover:bg-blue-100"
    },
    {
      id: "women-children",
      title: "Women & Children Empowerment",
      image: "/theme/women and children 1.jpeg",
      fallbackImage: "/theme/women and children 2.jpeg",
      icon: Users,
      quote: "Children should be free from discrimination; government policies should be based on the best interests of the child; children should survive and develop to their full potential.",
      source: "UNICEF",
      summary: "KCT cares for the education and health of homeless, scheduled caste and tribe children. Activities are undertaken for better understanding of Constitutional & Fundamental Rights, gender equality, women's and children's rights and ending all kinds of violence against women and children.",
      activities: [
        "Education and health support for vulnerable children",
        "Awareness campaigns on women's and children's rights",
        "Training on anti-violence laws and policies",
        "Policy advocacy highlighting issues in public domain"
      ],
      whyMatters: "Empowering women and children is crucial for sustainable development. It leads to healthier families, educated children, and stronger communities. Our work in this area helps to break the cycle of poverty and discrimination.",
      successStory: "A notable success was the increase in school enrollment rates among girls in rural Bihar, from 40% to 75% in two years, due to our advocacy and support programmes.",
      getInvolved: "Join our awareness campaigns or contribute to our education support initiatives.",
      color: "border-rose-200 hover:border-rose-400",
      bgColor: "bg-rose-50 hover:bg-rose-100"
    },
    {
      id: "peace-harmony",
      title: "Peace, Justice & Communal Harmony",
      image: "/theme/peace and harmony 1.jpeg",
      fallbackImage: "/theme/peace and harmony 2.jpeg",
      icon: Heart,
      quote: "JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity.",
      source: "Preamble of the Indian Constitution",
      summary: "Campaign for promotion of tolerance, peace, communal harmony, fraternity, peaceful resolution of conflict, Constitutional Rights on religion & personal belief, cultural diversity and individual identity.",
      activities: [
        "Organizing meetings, seminars, and workshops",
        "Cultural programmes and street plays",
        "Puppet shows and awareness campaigns",
        "Promoting tolerance and peaceful conflict resolution"
      ],
      whyMatters: "In a diverse country like India, communal harmony is essential for national integration and peace. Our initiatives in this area aim to reduce conflict and promote understanding among different communities.",
      successStory: "Our peacebuilding workshops in riot-affected areas of Jharkhand have successfully brought together communities divided by conflict, leading to lasting peace and cooperation.",
      getInvolved: "Participate in our peace marches or help in organizing community dialogues.",
      color: "border-emerald-200 hover:border-emerald-400",
      bgColor: "bg-emerald-50 hover:bg-emerald-100"
    },
    {
      id: "panchayati-raj",
      title: "Panchayati Raj System",
      image: "/theme/panchayati raj system 1.jpeg",
      fallbackImage: "/theme/panchayati raj system 2.jpeg",
      icon: Building2,
      quote: "The State shall take steps to organize village panchayats and endow them with such powers and authority as may be necessary to enable them to function as units of self-government.",
      source: "Article 40, Directive Principles of State Policy, Indian Constitution",
      summary: "The organization works for promotion of local self-governance, decentralized planning, resource mobilization, community monitoring and justice at grassroots level.",
      activities: [
        "Promoting local self-governance",
        "Training PRI members on laws and rights",
        "Decentralized planning and resource mobilization",
        "Community monitoring and grassroots justice"
      ],
      whyMatters: "Strengthening the Panchayati Raj system is vital for grassroots democracy and development. It ensures that local bodies are empowered to make decisions and manage resources for their communities.",
      successStory: "Our training programmes have successfully empowered over 1,000 Panchayat members in Bihar, enhancing their capacity to govern and serve their communities effectively.",
      getInvolved: "Assist in our training sessions or help in monitoring and evaluation of Panchayati Raj institutions.",
      color: "border-purple-200 hover:border-purple-400",
      bgColor: "bg-purple-50 hover:bg-purple-100"
    },
    {
      id: "environment",
      title: "Protection & Conservation of Environment",
      image: "/theme/protection and conservation of enviromnt 1.jpeg",
      fallbackImage: "/theme/protection and conservation of enviroment 2.jpeg",
      icon: Leaf,
      quote: "The State shall endeavour to protect and improve the environment and to safeguard the forests and wild life of the country.",
      source: "Article 48a, Directive Principles of State Policy, Indian Constitution",
      summary: "Organization's responsibilities are to take initiatives for protection and conservation of environment, water-bodies, forest, biodiversity and wild life. Initiatives are undertaken for achieving balance between footprint and handprint in regard to sustainable development.",
      activities: [
        "Protection of environment and biodiversity",
        "Conservation of water-bodies and forests",
        "Wildlife protection initiatives",
        "Sustainable development programmes"
      ],
      whyMatters: "Environmental conservation is crucial for sustainable development and the well-being of future generations. Our work in this area focuses on preserving biodiversity, combating climate change, and promoting sustainable use of resources.",
      successStory: "Our afforestation drive in Jharkhand resulted in the planting of 100,000 trees, significantly improving local biodiversity and community awareness about environmental issues.",
      getInvolved: "Join our tree plantation drives or contribute to our conservation education programmes.",
      color: "border-green-200 hover:border-green-400",
      bgColor: "bg-green-50 hover:bg-green-100"
    },
    {
      id: "disaster-relief",
      title: "Disaster Relief & Humanitarian Support",
      image: "/theme/relief work and drr 1.jpeg",
      fallbackImage: "/theme/relief work and drr 2.jpeg",
      icon: Shield,
      quote: "It aims to achieve the substantial reduction of disaster risk and losses in lives, livelihoods and health and in the economic, physical, social, cultural and environmental assets.",
      source: "Sendai Framework for Disaster Risk Reduction 2015-2030",
      summary: "We work to provide immediate relief to victims of natural and human induced disasters. We also try to ascertain the causes of calamities and assess its impact on environment, individuals, society and economy.",
      activities: [
        "Immediate relief to disaster victims",
        "Disaster Risk Reduction (DRR) strategies",
        "Community engagement in disaster planning",
        "Impact assessment and mitigation measures"
      ],
      whyMatters: "Disaster risk reduction and humanitarian support are critical in building resilient communities. Our work ensures that vulnerable communities are prepared for disasters and can recover quickly when they occur.",
      successStory: "Our intervention during the 2023 floods in Bihar provided immediate relief to over 50,000 affected individuals and facilitated their recovery and rehabilitation.",
      getInvolved: "Support our disaster relief fund or volunteer in our disaster response teams.",
      color: "border-orange-200 hover:border-orange-400",
      bgColor: "bg-orange-50 hover:bg-orange-100"
    },
    {
      id: "agriculture",
      title: "Sustainable Agriculture",
      image: "/theme/sustainable-agriculture.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
      icon: Sprout,
      quote: "The State shall endeavour to organize agriculture and animal husbandry on modern and scientific lines.",
      source: "Article 48, Directive Principles of State Policy, Indian Constitution",
      summary: "Advocacy for Pro-farmers (Small and Marginal farmers), share croppers, agricultural labours and controlling input cost. The organization works for using modern technology with preservation of land, soil and environment.",
      activities: [
        "Natural farming model development",
        "Urban rooftop farming and agroforestry",
        "Carbon reduction through smokeless stoves",
        "Preservation of traditional agricultural knowledge"
      ],
      whyMatters: "Sustainable agriculture is key to ensuring food security and livelihoods for all, especially in rural areas. Our initiatives promote environmentally friendly farming practices that enhance productivity and income for farmers.",
      successStory: "The introduction of smokeless stoves in 5,000 households in rural Bihar has significantly reduced health hazards related to smoke inhalation and improved fuel efficiency.",
      getInvolved: "Participate in our farming workshops or support our advocacy for farmer's rights.",
      color: "border-amber-200 hover:border-amber-400",
      bgColor: "bg-amber-50 hover:bg-amber-100"
    },
    {
      id: "youth",
      title: "Youth Empowerment",
      image: "/theme/youth 1.jpeg",
      fallbackImage: "/theme/youth 2.jpeg",
      icon: GraduationCap,
      quote: "To empower youth of the country to achieve their full potential, and through them enable India to find its rightful place in the community of nations.",
      source: "National Youth Policy, Govt. of India",
      summary: "The organization works to enable youth to develop themselves to their potentialities and advocates with the government for youth centered policies. KCT cares for the education, health, personality development, livelihood of homeless, scheduled caste and tribe Youth.",
      activities: [
        "Education and health support for youth",
        "Personality development programmes",
        "Research on youth aspirations and problems",
        "Encouraging participation in politics and social development"
      ],
      whyMatters: "Empowering youth is crucial for the development of a nation. Educated and skilled youth contribute to economic growth, social change, and cultural enrichment. Our work ensures that young people have the opportunities and support they need to succeed.",
      successStory: "Our vocational training programme enabled 10,000 youth in Jharkhand to gain employment in various sectors, significantly improving their economic status and self-esteem.",
      getInvolved: "Mentor a youth in your community or support our educational initiatives.",
      color: "border-indigo-200 hover:border-indigo-400",
      bgColor: "bg-indigo-50 hover:bg-indigo-100"
    },
    {
      id: "supreme-court",
      title: "Advisor to Supreme Court Commissioners",
      image: "/theme/advisor to the supreme court commissoner 1.jpeg",
      fallbackImage: "/theme/advisor to the supreme court commissioner 2.jpeg",
      icon: Gavel,
      quote: "The Commissioners shall be at liberty to take the assistance of individuals and reliable organizations in the State and Union Territories.",
      source: "PUCL vs UOI & others, Writ Petition (Civil) 196, 2001",
      summary: "'Koshish' supports Advisor to Commissioners of the Supreme Court. Advisor works as a bridge between implementing authorities, Commissioners, beneficiaries and various citizens' groups.",
      activities: [
        "Study on implementation of Right-based schemes",
        "Regular updates and periodic reports to Commissioners",
        "Organizing meetings with ministers and officials",
        "Effective monitoring and redressal system"
      ],
      whyMatters: "This role is crucial in ensuring that the rights of the marginalized and disadvantaged are protected and promoted at the highest levels of government. It helps in holding the state accountable for its obligations towards its citizens.",
      successStory: "Our advocacy led to the implementation of a new policy in 2023 that improved the living conditions of thousands of homeless individuals in urban areas.",
      getInvolved: "Support our research initiatives or help us in advocacy and awareness programmes.",
      color: "border-slate-200 hover:border-slate-400",
      bgColor: "bg-slate-50 hover:bg-slate-100"
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string) => {
    const target = e.target as HTMLImageElement;
    target.src = fallback;
  };

  const handleFallbackError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop";
  };

  return (
    <div className="min-h-screen font-poppins">
      <Helmet>
        <title>Koshish NGO - Our Themes & Focus Areas</title>
        <meta name="description" content="Explore the key focus areas and themes of Koshish NGO's work in human rights, women empowerment, environment, and social justice." />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Themes & Focus Areas</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Discover the diverse areas where Koshish works to create lasting social change and empower communities across Bihar and Jharkhand.
          </p>
        </div>
      </section>

      {/* Themes Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => (
              <Card 
                key={theme.id} 
                className={`group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border-2 ${theme.color} ${theme.bgColor} bg-white`}
                onClick={() => {
                  setSelectedTheme(selectedTheme === theme.id ? null : theme.id);
                  setTimeout(() => {
                    if (!selectedTheme && detailRef.current) {
                      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => handleImageError(e, theme.fallbackImage)}
                    onErrorCapture={(e) => handleFallbackError(e)}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                      <theme.icon className="w-6 h-6 text-koshish-blue" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-koshish-blue transition-colors">
                    {theme.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {theme.summary.substring(0, 140)}...
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-koshish-blue hover:text-white hover:border-koshish-blue transition-all duration-300"
                  >
                    {selectedTheme === theme.id ? 'Hide Details' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed View */}
      {selectedTheme && (
        <section ref={detailRef} className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {themes
              .filter(theme => theme.id === selectedTheme)
              .map(theme => (
                <div key={theme.id} className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-koshish-blue rounded-lg shadow-lg mb-6">
                      <theme.icon className="w-8 h-8 text-koshish-blue" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                      {theme.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-koshish-blue shadow-sm">
                        <blockquote className="text-lg italic text-gray-700 mb-3 leading-relaxed">
                          "{theme.quote}"
                        </blockquote>
                        <cite className="text-sm font-semibold text-koshish-blue">
                          — {theme.source}
                        </cite>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Approach</h3>
                        <p className="text-gray-600 leading-relaxed text-base">
                          {theme.summary}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={theme.image}
                          alt={theme.title}
                          className="w-full h-full object-cover"
                          onError={(e) => handleImageError(e, theme.fallbackImage)}
                          onErrorCapture={(e) => handleFallbackError(e)}
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Activities</h3>
                        <div className="space-y-3">
                          {theme.activities.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-koshish-blue rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm leading-relaxed">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why This Matters */}
                  {theme.whyMatters && (
                    <div className="bg-blue-50 border-l-4 border-blue-300 p-6 rounded-lg shadow-sm mb-6">
                      <h4 className="text-xl font-semibold text-blue-800 mb-2">Why This Matters</h4>
                      <p className="text-gray-700 text-base">{theme.whyMatters}</p>
                    </div>
                  )}

                  {/* Success Story */}
                  {theme.successStory && (
                    <div className="bg-green-50 border-l-4 border-green-300 p-6 rounded-lg shadow-sm mb-6">
                      <h4 className="text-xl font-semibold text-green-800 mb-2">Success Story</h4>
                      <p className="text-gray-700 text-base">{theme.successStory}</p>
                    </div>
                  )}

                  {/* Get Involved */}
                  {theme.getInvolved && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-300 p-6 rounded-lg shadow-sm mb-6">
                      <h4 className="text-xl font-semibold text-yellow-800 mb-2">Get Involved</h4>
                      <p className="text-gray-700 text-base">{theme.getInvolved}</p>
                    </div>
                  )}

                  <div className="text-center pt-8">
                    <Button 
                      onClick={() => setSelectedTheme(null)}
                      variant="outline"
                      className="border-koshish-blue text-koshish-blue hover:bg-koshish-blue hover:text-white px-8 py-3 font-semibold"
                    >
                      Close Details
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 leading-relaxed">
            Together, we can create meaningful change across all these focus areas. 
            Your support helps us continue our vital work in communities that need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold px-8 py-3"
            >
              Support Our Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-koshish-blue font-semibold px-8 py-3"
            >
              Volunteer With Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Theme;
