import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Eye, 
  Target, 
  Users, 
  Award,
  MapPin,
  Scale,
  Shield,
  Building2,
  BookOpen,
  Leaf,
  Calendar,
  CreditCard,
  FileText,
  Star,
  Trophy,
  Banknote,
  ChevronUp
} from "lucide-react";
import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from "react";

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-koshish-blue to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 ease-in-out hover:from-purple-600 hover:to-koshish-blue group"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
        </button>
      )}
    </>
  );
};

const About = () => {
  const team = [
    {
      name: "Arshad Ajmal",
      role: "Chairperson",
      bio: "Visionary leader with unwavering commitment to social justice and community empowerment. Under his guidance, Koshish has transformed countless lives through innovative programs and sustainable development initiatives across Bihar.",
      image: "/team/arshad-ajmal.jpg.jpeg",
      longBio: `Mr. Arshad Ajmal is a prominent human rights activist and social reformer with a Master’s degree in English Literature. Active in social and political movements since 1974, he has dedicated over four decades to advancing the rights and dignity of marginalized communities in Bihar. As a member of the Coordination Committee of Lok Parishad, he works on issues of transparency, the Right to Information, the Right to Food, the Right to Work, and access to justice.
Mr. Ajmal is widely regarded as a pioneer in interest-free microfinance in India. He founded the Al Khair Charitable Trust and the Al Khair Credit Cooperative Society in 2002, which today disburses over ₹18 crore in loans annually. In 2010, he established the Sahulat Microfinance Society, which has since promoted 57 interest-free cooperatives with 111 branches across 12 Indian states, reaching over 3.3 lakh families. These institutions have collectively extended ₹2200 crore in finance to small and micro-enterprises, empowering thousands of families—especially women—towards economic self-reliance and social dignity.
His contributions go beyond finance—he has helped build a movement for economic justice and cooperative empowerment, challenging exploitative credit systems and offering humane, community-based alternatives. His work has received national and international recognition, including: Maker of Modern Bihar Award by Prabhat Khabar, Colombo Award (2017), Honors in Indonesia (2013) and Dubai (2018).
Mr. Ajmal’s vision extends to expanding cooperative models into education, healthcare, agriculture, and women’s empowerment, aiming to build a just and inclusive economy. His life’s work positions him not only as a financial innovator but also as a transformative figure in grassroots social change.`
    },
    {
      name: "Rupesh",
      role: "Secretary",
      bio: "Dynamic organizer and the backbone of Koshish's operations. His meticulous planning and grassroots approach ensure that every initiative reaches those who need it most, bridging the gap between vision and execution.",
      image: "/team/rupesh.jpg.jpeg",
      longBio: `Mr. Rupesh Kumar, Petitioner No. 2, is a noted human rights activist with decades of work on the literacy movement, health, nutrition, women’s rights, housing, land and property rights, unorganised workers, and disaster rehabilitation, access to justice, especially among marginalised communities in Bihar. He played a leading role in the Right to Food movement and is a former Convener and current Coordination Committee member of the Right to Food Campaign – Bihar Chapter.
He served as State Advisorvfrom the state of Bihar,on the issue of right to food to the commissioner appointed by thisHon’nle the Supreme Court in People’s Union for Civil Liberties  v. Union of India (W.P. (C) No. 196/2001), providing critical reports on food security and systemic issues. He is also a member of the Urban Homeless Advisory Committee (Govt. of Bihar) and the Joint Inspection Committee for the Mid-Day Meal Scheme (Govt. of India).
His legal and advocacy work spans grassroots legal empowerment, violence against women, Gram Kachaharis, witch-hunting, and RTI. He has co-authored “Local Justice Delivery in Bihar (Gram Kachahari)” and published on SDGs, child rights, and education. He is part of the Lok Parishad Coordination Committee, promoting constitutional values.
For his outstanding contributions to social justice, governance, and development, he has received several national and international recognitions, including: Citizens Award for Peace and Harmony, NAMATI Justice Prize 2015 (UNDP), Single Girl Child Award (APCL), and Dr. Rajendra Prasad Award.`
    },
    {
      name: "Archana Kumari",
      role: "Treasurer",
      bio: "Financial steward with exceptional integrity and transparency in resource management. Her strategic financial oversight ensures maximum impact of every donation while maintaining the highest standards of accountability.",
      image: "/team/archana-kumari.jpg.jpeg"
    }
  ];

  const objectives = [
    {
      icon: Scale,
      title: "Equal Opportunities & Justice",
      description: "Endeavoring for equal opportunities to all, equality, justice and fraternity"
    },
    {
      icon: Users,
      title: "Grassroots Development",
      description: "Committed to overall development of the society and individuals from grassroots level"
    },
    {
      icon: Shield,
      title: "Human Rights Protection",
      description: "Protection and promotion of Human Rights and humanitarian assistance"
    },
    {
      icon: BookOpen,
      title: "Fundamental Rights",
      description: "Facilitating protection of Fundamental Rights and striving for implementation of Socio-Economic Rights based schemes"
    },
    {
      icon: Building2,
      title: "Sustainable Development",
      description: "Striving for sustainable development with stress on equal development of agriculture and industries"
    },
    {
      icon: Leaf,
      title: "Environmental Conservation",
      description: "Striving for conservation of environment and bio-diversity and mitigating climate change effect"
    }
  ];

  const coreValues = [
    {
      category: "Care",
      values: ["Love and respect", "Trusteeship", "Observation"],
      icon: Heart,
      color: "from-red-500 to-pink-600"
    },
    {
      category: "Passion",
      values: ["Ambition", "Devotion", "Zeal"],
      icon: Target,
      color: "from-orange-500 to-red-600"
    },
    {
      category: "Credibility",
      values: ["Integrity", "Commitment / Solidarity", "Transparency & accountability"],
      icon: Award,
      color: "from-blue-500 to-purple-600"
    }
  ];

  const workingAreas = [
    {
      state: "Bihar",
      description: "Direct intervention in 10 districts",
      districts: ["Patna", "Gaya", "Nawada", "Jamuai", "Bhojpur", "Araria", "Vaishali", "Khagadiya", "Muzaffarpur", "Samastipur"],
      coverage: "All over Bihar through networking"
    },
    {
      state: "Jharkhand", 
      description: "Direct intervention in 3 districts",
      districts: ["Ranchi", "Gumla", "Sahebganj"],
      coverage: "Focused district-level operations"
    }
  ];

  const awards = [
    {
      title: "Namati Justice Prize 2015",
      description: "Recognition for outstanding work in grassroots justice delivery",
      icon: Trophy
    },
    {
      title: "Credibility Alliance Certification",
      description: "Certificate of Accreditation for transparency and accountability",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen font-poppins">
      <Helmet>
        <title>Koshish NGO - About Us</title>
        <meta name="description" content="Learn about Koshish NGO's mission, vision, leadership, and impact." />
      </Helmet>
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-koshish-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Koshish</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
            An organization of devoted youth activists committed to struggle for equality, peace and justice.
          </p>
          <div className="inline-block bg-koshish-gold text-koshish-blue px-6 py-3 rounded-full font-semibold text-lg">
            Founded in August 1997 • Registered Charitable Trust
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-koshish-blue mb-8">Our Mission & Vision</h2>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-koshish-blue mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-3" />
                  Mission Statement
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  KOSHISH is an organization of devoted youth activists committed to struggle for equality, peace and justice.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-koshish-blue mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-3" />
                  Vision Statement
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To establish a progressive, peaceful, democratic, just and environment friendly society based on the values of equality and fraternity.
                </p>
              </div>
            </div>

            <div className="relative">
              <img 
                src="/images/pic 1.jpeg"
                alt="Our mission in action"
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&h=400&fit=crop";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our Objectives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Core objectives that guide our work towards social transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-koshish-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <objective.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-koshish-blue mb-4">{objective.title}</h3>
                  <p className="text-gray-600 flex-grow">{objective.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Organization History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our History</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From student activism to community transformation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-koshish-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-koshish-blue mb-4">Foundation and Early Years</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      Koshish, founded by young and devoted social activists was registered as a charitable trust on 4th August 1997. 
                      It works for social, political and economic empowerment of poor people, protection of Human Rights, 
                      gender issues, Right to Food, grassroots justice delivery system and environment conservation.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      Founders have been active in social and economic transformation of the society since their student days. 
                      They have participated in students' movement for the rights of students, and better education environment. 
                      After youth movement they joined movements for social, political and economic changes at provincial level.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      In the course of the movement, they gathered vast experiences and ideas which converged into the 
                      shape of an organization named 'Koshish', i.e. 'efforts for change'.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Governance & Registration */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Governance & Registration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Legally registered and transparent operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Registration Details */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-koshish-blue mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3" />
                  Registration Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Charitable Trust Registration</h4>
                    <p className="text-gray-600">
                      Registered under Charitable Trust act in the Office of Registrar Patna, Govt. of Bihar
                    </p>
                    <p className="text-sm text-koshish-blue font-medium">
                      Permanent basis number: 4749/IV-338 dated August'97
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">FCRA Registration</h4>
                    <p className="text-gray-600">
                      Registered under FCRA act, 1976 in the office of Home Affairs, Lok Nayak Bhawan, New Delhi-110003
                    </p>
                    <p className="text-sm text-koshish-blue font-medium">
                      Permanent basis number: 031170250 Nature Social dated 24 Feb 2003
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Exemptions */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-koshish-blue mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3" />
                  Tax Exemptions
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">PAN Details</h4>
                    <p className="text-koshish-blue font-medium">PAN No: AAATK4579Q</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">12A Registration</h4>
                    <p className="text-gray-600">12A /2004-05/6805-07</p>
                    <p className="text-sm text-gray-600">URI: AAATK4579QF20227 from 10.03.22</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">80G Registration</h4>
                    <p className="text-gray-600">80G/2004-05/6808-10</p>
                    <p className="text-sm text-gray-600">Renewals from 10.03.22 to 24-25</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bank & Audit Details */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-koshish-blue mb-6 flex items-center">
                  <Banknote className="w-6 h-6 mr-3" />
                  Bank Particulars
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">FCRA Account</h4>
                    <p className="text-gray-600">Current Account: 40211696985</p>
                    <p className="text-gray-600">IFSC: SBIN0000691, SWIFT: SBININBB104</p>
                    <p className="text-gray-600">State Bank of India, New Delhi</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Indian Account</h4>
                    <p className="text-gray-600">Saving Account: 625901128707</p>
                    <p className="text-gray-600">IFSC: ICIC0000579</p>
                    <p className="text-gray-600">ICICI Bank, Exhibition Road, Patna 800001</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-koshish-blue mb-6 flex items-center">
                  <Building2 className="w-6 h-6 mr-3" />
                  Auditor Details
                </h3>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Chartered Accountants</h4>
                  <p className="text-gray-600 font-medium">CSP & Associates</p>
                  <p className="text-gray-600">60, Block – B, 1st Floor</p>
                  <p className="text-gray-600">Maurya Lok Complex</p>
                  <p className="text-gray-600">Patna – 800001</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal & Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Legal & Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maintaining the highest standards of legal compliance and transparency in all our operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Compliance Overview */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-koshish-blue mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3" />
                  Compliance Framework
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-koshish-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Complete adherence to all regulatory requirements under Indian law</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-koshish-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Regular audits and financial transparency reporting</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-koshish-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Comprehensive policy framework for governance</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-koshish-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Annual compliance reviews and policy updates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Status */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-koshish-blue mb-6 flex items-center">
                  <Scale className="w-6 h-6 mr-3" />
                  Legal Standing
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/70 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Registration Status</h4>
                    <p className="text-gray-600 text-sm">Fully registered charitable trust with all legal compliances up to date</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Tax Compliance</h4>
                    <p className="text-gray-600 text-sm">All IT returns filed regularly with proper documentation</p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">FCRA Compliance</h4>
                    <p className="text-gray-600 text-sm">Valid FCRA registration with timely renewals and reporting</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Organizational Policies */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-koshish-blue">Organizational Policies</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">Comprehensive policies governing our operations and conduct</p>
                <div className="space-y-2">
                  <a 
                    href="/legal compliance/GENDER POLICY OF KOSHISH CHARITABLE TRUST.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-koshish-blue hover:text-blue-600 text-sm hover:underline transition-colors"
                  >
                    • Gender Policy
                  </a>
                  <a 
                    href="/legal compliance/HR POLICY OF KOSHISH CHARITABLE TRUST.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-koshish-blue hover:text-blue-600 text-sm hover:underline transition-colors"
                  >
                    • HR Policy
                  </a>
                  <a 
                    href="/legal compliance/Koshish communications policy.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-koshish-blue hover:text-blue-600 text-sm hover:underline transition-colors"
                  >
                    • Communications Policy
                  </a>
                  <a 
                    href="/legal compliance/staff agreement.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-koshish-blue hover:text-blue-600 text-sm hover:underline transition-colors"
                  >
                    • Staff Agreement
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Financial Policies */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-koshish-blue">Financial Management</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">Policies ensuring transparent financial operations</p>
                <div className="space-y-2">
                  <a 
                    href="/legal compliance/Koshish finance Policy.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-koshish-blue hover:text-blue-600 text-sm hover:underline transition-colors"
                  >
                    • Finance Policy
                  </a>
                  <a 
                    href="/legal compliance/Koshish Fixed assets policy.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-koshish-blue hover:text-blue-600 text-sm hover:underline transition-colors"
                  >
                    • Fixed Assets Policy
                  </a>
                  <a 
                    href="/legal compliance/Koshish Procurement policy f.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-koshish-blue hover:text-blue-600 text-sm hover:underline transition-colors"
                  >
                    • Procurement Policy
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Legal Documents */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-koshish-blue">Legal Documentation</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">Official certificates and regulatory documents</p>
                <div className="space-y-2">
                  <a 
                    href="/legal compliance/FCRA-Renewal-Certificate 2021.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-koshish-blue hover:text-blue-600 text-sm hover:underline transition-colors"
                  >
                    • FCRA Renewal Certificate 2021
                  </a>
                  <a 
                    href="/legal compliance/Annexure Desirable Norms (1).pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-koshish-blue hover:text-blue-600 text-sm hover:underline transition-colors"
                  >
                    • Annexure Desirable Norms
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Returns Section */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-koshish-blue mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3" />
                Income Tax Returns & Financial Compliance
              </h3>
              <p className="text-gray-600 mb-6">
                We maintain complete transparency in our financial operations through regular filing of income tax returns 
                and compliance with all financial regulations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a 
                  href="/legal compliance/IT Return-2024.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-koshish-blue">IT Return 2024</h4>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">Latest financial year tax return</p>
                  <div className="mt-3 text-blue-600 text-sm font-medium">View Document →</div>
                </a>

                <a 
                  href="/legal compliance/IT Return-2023.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-green-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-koshish-blue">IT Return 2023</h4>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">Previous year tax compliance</p>
                  <div className="mt-3 text-green-600 text-sm font-medium">View Document →</div>
                </a>

                <a 
                  href="/legal compliance/IT Return-2022.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-300 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-koshish-blue">IT Return 2022</h4>
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">Historical tax documentation</p>
                  <div className="mt-3 text-purple-600 text-sm font-medium">View Document →</div>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Transparency Statement */}
          <Card className="bg-gradient-to-r from-koshish-blue to-purple-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-4 mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Commitment to Transparency</h3>
              <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">
                All our legal and compliance documents are readily available for public review. We believe in complete 
                transparency and accountability in our operations, ensuring that donors and stakeholders have full 
                access to our organizational policies and financial records.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-2">100%</div>
                  <div className="text-blue-100">Transparency</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-2">13+</div>
                  <div className="text-blue-100">Policy Documents</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-2">28+</div>
                  <div className="text-blue-100">Years of Compliance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognized for our commitment to transparency and justice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-koshish-gold to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <award.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-koshish-blue mb-4">{award.title}</h3>
                  <p className="text-gray-600">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Working Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Working Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our presence across Bihar and Jharkhand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workingAreas.map((area, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-koshish-blue mb-4 flex items-center">
                    <MapPin className="w-6 h-6 mr-3" />
                    {area.state}
                  </h3>
                  <p className="text-gray-600 mb-4">{area.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Districts:</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.districts.map((district, idx) => (
                        <span key={idx} className="bg-koshish-light-blue text-koshish-blue px-3 py-1 rounded-full text-sm">
                          {district}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">{area.coverage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((valueGroup, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${valueGroup.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <valueGroup.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-koshish-blue mb-6">{valueGroup.category}</h3>
                  <ul className="space-y-3">
                    {valueGroup.values.map((value, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center">
                        <Star className="w-4 h-4 text-koshish-gold mr-2 flex-shrink-0" />
                        {value}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The dedicated leaders who drive Koshish's mission forward with passion, integrity, and unwavering commitment to social change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <LeadershipCard key={index} member={member} index={index} />
            ))}
          </div>

          {/* Leadership Impact Summary */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-koshish-blue to-purple-600 text-white border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">United Leadership, Transformative Impact</h3>
                <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
                  Together, our leadership team brings decades of experience in social work, having directly managed 
                  programs across Bihar since 1997, serving thousands of beneficiaries through dedicated service.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-white mb-2">28+</div>
                    <div className="text-blue-100">Years of Service</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-white mb-2">13</div>
                    <div className="text-blue-100">Districts Covered</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-white mb-2">5000+</div>
                    <div className="text-blue-100">Lives Impacted</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet Our Team Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-koshish-blue to-purple-600 text-white text-sm px-6 py-2 rounded-full font-semibold mb-6">
              OUR DEDICATED TEAM
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-koshish-blue mb-6">Meet Our Team Members</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The dedicated professionals who work tirelessly to implement our programs and serve our communities with excellence, 
              bringing passion and expertise to every initiative.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-koshish-blue rounded-full"></div>
                <span className="text-sm text-gray-600">Professional Excellence</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-koshish-gold rounded-full"></div>
                <span className="text-sm text-gray-600">Community Impact</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Innovation</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 max-w-7xl mx-auto">
            {[
              {
                name: "Vijay Kant Sinha",
                role: "Director, Research and Planning",
                image: "/team/Vijay.jpeg",
                quote: "Data-driven insights guide our path toward meaningful social impact."
              },
              {
                name: "Bhushan Prasad",
                role: "Finance Manager",
                image: "/team/Bhushan.jpeg",
                quote: "Transparent financial management ensures every rupee serves its purpose."
              },
              {
                name: "Ritwiz Kumar",
                role: "Program Manager and HR Manager",
                image: "/team/ritwiz.jpg",
                quote: "Empowering our team empowers the communities we serve."
              },
              {
                name: "Prabhakar Kumar",
                role: "Associate",
                image: "/team/Prabhakar.jpeg",
                quote: "Supporting our mission with dedication and unwavering commitment."
              },
              {
                name: "Prakash Kumar",
                role: "Project Manager",
                image: "/team/Prakash.jpeg",
                quote: "Every project is an opportunity to create lasting change in someone's life."
              }
            ].map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-gray-100 hover:border-koshish-blue/50 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-white">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-40 h-40 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform duration-300 border-3 border-koshish-gold shadow-lg"
                      onError={(e) => {
                        console.log(`Failed to load image: ${member.image}`);
                        e.currentTarget.src = `https://images.unsplash.com/photo-150700321116${index + 1}-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face`;
                      }}
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-koshish-blue mb-3 group-hover:text-purple-600 transition-colors duration-300">{member.name}</h3>
                  <p className="text-koshish-gold font-semibold mb-6 text-base group-hover:text-yellow-600 transition-colors duration-300">{member.role}</p>
                  <blockquote className="text-gray-600 text-sm italic leading-relaxed px-4 group-hover:text-gray-700 transition-colors duration-300">
                    "{member.quote}"
                  </blockquote>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-koshish-blue rounded-full"></div>
                      <div className="w-2 h-2 bg-koshish-gold rounded-full"></div>
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Members Impact Summary */}
          <div className="mt-20">
            <Card className="bg-gradient-to-r from-koshish-gold via-yellow-500 to-orange-400 text-white border-0 shadow-2xl">
              <CardContent className="p-10 text-center">
                <div className="mb-6">
                  <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Dedicated Team, Exceptional Results</h3>
                  <p className="text-lg text-yellow-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                    Our team members work hand-in-hand with our leadership to ensure every program runs smoothly, 
                    every beneficiary is treated with dignity, and every goal is achieved with precision and care.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="bg-white/15 rounded-2xl p-8 backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300 group">
                    <div className="text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">100+</div>
                    <div className="text-yellow-100 text-lg font-semibold">Active Projects</div>
                    <div className="text-yellow-200 text-sm mt-2">Managed with Excellence</div>
                  </div>
                  <div className="bg-white/15 rounded-2xl p-8 backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300 group">
                    <div className="text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
                    <div className="text-yellow-100 text-lg font-semibold">Community Support</div>
                    <div className="text-yellow-200 text-sm mt-2">Always Available</div>
                  </div>
                  <div className="bg-white/15 rounded-2xl p-8 backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all duration-300 group">
                    <div className="text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">13</div>
                    <div className="text-yellow-100 text-lg font-semibold">Districts Covered</div>
                    <div className="text-yellow-200 text-sm mt-2">Across Bihar & Jharkhand</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTopButton />
    </div>
  );
};

function LeadershipCard({ member, index }) {
  const [showMore, setShowMore] = React.useState(false);
  // Accept a longBio property for each member (to be provided by user)
  const shortBioLength = 220; // Adjust as needed for truncation
  const hasLongBio = member.longBio && member.longBio.length > shortBioLength;
  const shortBio = hasLongBio ? member.longBio.slice(0, shortBioLength) : member.bio;
  const restBio = hasLongBio ? member.longBio.slice(shortBio.length) : '';
  return (
    <Card className="text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-gray-100 hover:border-koshish-blue/30">
      <CardContent className="p-8">
        <div className="relative mb-8">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-40 h-40 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform duration-300 border-4 border-koshish-gold shadow-xl"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face';
            }}
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-koshish-blue to-purple-600 text-white text-sm px-4 py-2 rounded-full shadow-lg font-semibold">
              {member.role}
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-koshish-blue mb-2 mt-4">{member.name}</h3>
        <p className="text-koshish-gold font-semibold mb-6 text-lg">{member.role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {hasLongBio ? (
            <>
              {shortBio}
              {!showMore && <span>... </span>}
              {showMore && <span>{restBio}</span>}
              {hasLongBio && (
                <button
                  className="ml-2 px-2 py-0.5 bg-koshish-blue text-white rounded-full font-semibold shadow hover:bg-purple-700 transition-colors text-xs"
                  onClick={() => setShowMore((v) => !v)}
                  aria-expanded={showMore}
                >
                  {showMore ? 'Show Less' : 'More'}
                </button>
              )}
            </>
          ) : (
            member.bio
          )}
        </p>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Leadership Excellence
          </div>
          <div className="flex justify-center space-x-2 mb-4">
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
              {index === 0 ? 'Strategic Vision' : index === 1 ? 'Operations Expert' : 'Financial Excellence'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default About;
