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
    { name: "Volunteer", href: "/volunteer" },
    { name: "Contact", href: "/contact" },
  ];

  const adminLinks = [
    { name: "Admin", href: "/admin" },
  ];

  const programsDropdownItems = [
    { name: "Active Program", href: "/active.html" },
    { name: "Events", href: "/events" },
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

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              {/* Logo image with fallback to icon */}
              <div className="flex items-center">
                <img 
                  src="/logo/logo.png" 
                  alt="Koshish Charitable Trust Logo"
                  className="h-8 w-auto max-w-[120px]"
                  onError={(e) => {
                    // Fallback to gradient icon if logo not found
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-8 h-8 bg-gradient-to-br from-koshish-blue to-koshish-gold rounded-full items-center justify-center hidden">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
              </div>
              <span className="ml-2 text-lg font-semibold text-koshish-blue hidden sm:inline">Koshish Trust</span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on smaller screens, visible on large screens */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href.includes("#") ? "/" : link.href}
                  onClick={() => link.href.includes("#") && scrollToSection(link.href)}
                  className="text-gray-700 hover:text-koshish-blue px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-koshish-light-blue whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Programs Dropdown */}
              <div 
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={handleProgramsClick}
                  className="text-gray-700 hover:text-koshish-blue px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-koshish-light-blue whitespace-nowrap flex items-center space-x-1"
                >
                  <span>Programs</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isProgramsDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-200 ease-in-out transform origin-top ${
                    isProgramsDropdownOpen 
                      ? 'opacity-100 scale-y-100 translate-y-0' 
                      : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                  }`}
                >
                  {programsDropdownItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-base text-gray-700 hover:bg-koshish-light-blue hover:text-koshish-blue transition-colors duration-150 first:rounded-t-md last:rounded-b-md"
                      onClick={() => setIsProgramsDropdownOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Admin Link (separated) */}
              {adminLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-base font-semibold transition-colors duration-200 ml-4 whitespace-nowrap border-l border-gray-300 pl-4"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Donate Button - Desktop */}
          <div className="hidden lg:block">
            <Link to="/donate">
              <Button className="bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold px-4 py-1 text-xs">
                Donate
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-koshish-blue p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-koshish-blue"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white max-h-96 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href.includes("#") ? "/" : link.href}
                  className="text-gray-700 hover:text-koshish-blue hover:bg-koshish-light-blue block px-4 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (link.href.includes("#")) {
                      scrollToSection(link.href);
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Programs Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsProgramsDropdownOpen(!isProgramsDropdownOpen)}
                  className="text-gray-700 hover:text-koshish-blue hover:bg-koshish-light-blue w-full text-left px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center justify-between"
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
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isProgramsDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 space-y-1">
                    {programsDropdownItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-600 hover:text-koshish-blue hover:bg-koshish-light-blue block px-4 py-2 rounded-md text-base transition-colors duration-200"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProgramsDropdownOpen(false);
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Admin Link */}
              <div className="border-t border-gray-200 pt-2">
                {adminLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="bg-gray-900 text-white hover:bg-gray-800 block px-4 py-2 rounded-md text-base font-semibold transition-colors duration-200 mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Donate Button - Mobile */}
              <div className="pt-2 pb-1">
                <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-koshish-gold text-koshish-blue hover:bg-yellow-400 font-semibold">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
