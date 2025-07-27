import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, MapPin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-koshish-blue text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              {/* Logo image with fallback to icon */}
              <div className="flex items-center">
                <img 
                  src="/logo/logo-white.png" 
                  alt="Koshish Charitable Trust Logo"
                  className="h-12 w-auto max-w-[150px]"
                  onError={(e) => {
                    // Fallback to gradient icon if white logo not found, try regular logo
                    const target = e.currentTarget;
                    target.src = "/logo/logo.png";
                    target.onerror = () => {
                      // Final fallback to icon
                      target.style.display = 'none';
                      const nextElement = target.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    };
                  }}
                />
                <div className="w-10 h-10 bg-gradient-to-br from-koshish-gold to-yellow-400 rounded-full items-center justify-center hidden">
                  <span className="text-koshish-blue font-bold text-xl">K</span>
                </div>
              </div>
              <span className="ml-2 text-xl font-bold">Koshish Charitable Trust</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A Ray of Hope for the Hopeless. Supporting displaced, vulnerable, and marginalized communities through education, women empowerment, legal aid, and rehabilitation.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/19V1DM2kYg/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-koshish-gold transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/koshishtrust?igsh=MW9oYjlnaGh1enJj" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-koshish-gold transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://youtube.com/@koshishcharitabletrust560?feature=shared" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-koshish-gold transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-koshish-gold transition-colors">About Us</Link></li>
              <li><Link to="/programs" className="text-gray-300 hover:text-koshish-gold transition-colors">Programs</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-koshish-gold transition-colors">Gallery</Link></li>
              <li><Link to="/volunteer" className="text-gray-300 hover:text-koshish-gold transition-colors">Volunteer</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span className="text-gray-300">094310 21035, 06122200354</span>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <span className="text-gray-300">
                  Abdin House,<br />
                  Fraser Rd,<br />
                  Patna, India, Bihar
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Koshish Charitable Trust. All rights reserved. | Together for a Better Tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
