import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Theme", href: "/theme" },
    { name: "Gallery", href: "/gallery" },
    { name: "Achievements", href: "/#achievements" },
    { name: "Legal Compliance", href: "/legal-compliance" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Contact", href: "/contact" },
  ];

  const adminLinks = [
    { name: "Admin", href: "/admin" },
  ];

  const programsDropdownItems = [
    { name: "Active Program", href: "/active.html" },
    { name: "Campaigns", href: "/campaigns" },
    { name: "Report", href: "/report.html" },
  ];

  // Handle mouse enter for desktop hover
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsProgramsDropdownOpen(true);
  };

  // Handle mouse leave for desktop hover
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProgramsDropdownOpen(false);
    }, 150); // Small delay to prevent flickering
  };

  // Handle click for mobile
  const handleProgramsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProgramsDropdownOpen(!isProgramsDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProgramsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    if (href.includes("#")) {
      const element = document.getElementById(href.split("#")[1]);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 font-poppins overflow-x-hidden">
      <div className="w-full px-2 sm:px-4 lg:px-6 max-w-none">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo - Fixed width */}
          <div className="flex items-center flex-shrink-0 min-w-[120px] lg:min-w-[180px]">
            <Link to="/" className="flex items-center">
              {/* Logo image with fallback to icon */}
              <div className="flex items-center">
                <img 
                  src="/logo/logo.png" 
                  alt="Koshish Charitable Trust Logo"
                  className="h-8 lg:h-10 w-auto flex-shrink-0"
                  onError={(e) => {
                    // Fallback to gradient icon if logo not found
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-koshish-blue to-koshish-gold rounded-full items-center justify-center hidden">
                  <span className="text-white font-bold text-sm lg:text-base">K</span>
                </div>
              </div>
              <span className="ml-1 lg:ml-2 text-sm lg:text-lg font-semibold text-koshish-blue hidden sm:block">Koshish Trust</span>
            </Link>
          </div>

          {/* Desktop Navigation - Progressive hiding to prevent overflow */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 2xl:space-x-6 flex-1 justify-center">
            <div className="flex items-center space-x-2 xl:space-x-4 2xl:space-x-6">
              {navLinks.map((link) => {
                // Progressive hiding based on screen size to prevent overflow
                let responsiveClasses = "";
                
                if (link.name === "Home") responsiveClasses = "lg:block";
                else if (link.name === "About") responsiveClasses = "lg:block";
                else if (link.name === "Theme") responsiveClasses = "lg:block";
                else if (link.name === "Gallery") responsiveClasses = "lg:block";
                else if (link.name === "Achievements") responsiveClasses = "hidden xl:block"; // Hide on smaller screens
                else if (link.name === "Legal Compliance") responsiveClasses = "hidden 2xl:block"; // Hide on most screens
                else if (link.name === "Volunteer") responsiveClasses = "lg:block";
                else if (link.name === "Contact") responsiveClasses = "xl:block";
                
                return (
                  <Link
                    key={link.name}
                    to={link.href.includes("#") ? "/" : link.href}
                    onClick={() => {
                      scrollToTop();
                      if (link.href.includes("#")) {
                        setTimeout(() => scrollToSection(link.href), 100);
                      }
                    }}
                    className={`text-xs lg:text-sm xl:text-base font-medium text-gray-700 hover:text-koshish-blue px-2 py-2 rounded-md transition-colors duration-200 hover:bg-koshish-light-blue whitespace-nowrap ${responsiveClasses}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Programs Dropdown */}
              <div 
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={handleProgramsClick}
                  className="text-xs lg:text-sm xl:text-base font-medium text-gray-700 hover:text-koshish-blue px-2 py-2 rounded-md transition-colors duration-200 hover:bg-koshish-light-blue whitespace-nowrap flex items-center space-x-1"
                >
                  <span>Programs</span>
                  <ChevronDown 
                    className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 ${
                      isProgramsDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-200 ease-in-out transform origin-top ${
                    isProgramsDropdownOpen 
                      ? 'opacity-100 scale-y-100 translate-y-0' 
                      : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  {programsDropdownItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-koshish-light-blue hover:text-koshish-blue transition-colors duration-150 first:rounded-t-md last:rounded-b-md"
                      onClick={() => {
                        setIsProgramsDropdownOpen(false);
                        scrollToTop();
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side buttons - CRITICAL: Always fully visible */}
          <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0 min-w-[120px] lg:min-w-[140px] justify-end">
            {/* Admin Link - Compact but visible */}
            {adminLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={scrollToTop}
                className="bg-gray-900 text-white hover:bg-gray-800 px-2 lg:px-3 py-2 text-xs lg:text-sm rounded-md font-semibold transition-colors duration-200 whitespace-nowrap flex-shrink-0 min-h-[36px] lg:min-h-[40px] flex items-center"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Donate Button - MUST be fully visible */}
            <Link to="/donate" onClick={scrollToTop}>
              <Button className="bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-medium px-2 lg:px-3 py-2 text-xs lg:text-sm min-h-[36px] lg:min-h-[40px] whitespace-nowrap flex-shrink-0 transition-colors duration-200">
                Donate
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center ml-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-koshish-blue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-koshish-blue touch-target transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden fixed inset-x-0 top-16 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-1 bg-white">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href.includes("#") ? "/" : link.href}
                  className="text-gray-700 hover:text-koshish-blue hover:bg-koshish-light-blue block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 min-h-[44px] flex items-center border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setIsMenuOpen(false);
                    scrollToTop();
                    if (link.href.includes("#")) {
                      setTimeout(() => scrollToSection(link.href), 100);
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Programs Dropdown */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setIsProgramsDropdownOpen(!isProgramsDropdownOpen)}
                  className="text-gray-700 hover:text-koshish-blue hover:bg-koshish-light-blue w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between min-h-[44px]"
                >
                  <span>Programs</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isProgramsDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {/* Mobile Dropdown Items */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isProgramsDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 space-y-1 pb-2">
                    {programsDropdownItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-600 hover:text-koshish-blue hover:bg-koshish-light-blue block px-4 py-3 rounded-md text-sm transition-colors duration-200 min-h-[44px] flex items-center"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProgramsDropdownOpen(false);
                          scrollToTop();
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Admin and Donate Buttons - Mobile - ALWAYS VISIBLE */}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                {adminLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="bg-gray-900 text-white hover:bg-gray-800 block px-4 py-3 rounded-md text-base font-semibold transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      scrollToTop();
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Link 
                  to="/donate" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    scrollToTop();
                  }}
                >
                  <Button className="w-full bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold py-3 text-base min-h-[44px]">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
