
import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-koshish-blue text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-koshish-gold to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-koshish-blue font-bold text-xl">K</span>
              </div>
              <span className="ml-2 text-xl font-bold">Koshish NGO</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A Ray of Hope for the Hopeless. Supporting displaced, vulnerable, and marginalized communities through education, women empowerment, legal aid, and rehabilitation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-koshish-gold transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-koshish-gold transition-colors">
                <Instagram size={24} />
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
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <span className="text-gray-300">
                  123 Hope Street<br />
                  Community Center<br />
                  Delhi, India 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Koshish NGO. All rights reserved. | Together for a Better Tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
