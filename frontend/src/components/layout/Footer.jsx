import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-primary-deep)] text-[var(--color-text-light)] py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-['Playfair_Display'] text-[var(--color-accent-gold)]">
                〰️ OceanView
              </span>
            </Link>
            <p className="text-sm text-gray-400 font-['Playfair_Display'] italic">
              "Where the sky meets the sea."
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-[var(--color-accent-gold)] text-sm font-['Montserrat'] tracking-widest uppercase mb-2">
              Explore
            </h4>
            <Link
              to="/rooms"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Our Rooms
            </Link>
            <Link
              to="/amenities"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Amenities
            </Link>
            <Link
              to="/dining"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Fine Dining
            </Link>
            <Link
              to="/spa"
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              The Spa
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-[var(--color-accent-gold)] text-sm font-['Montserrat'] tracking-widest uppercase mb-2">
              Contact
            </h4>
            <p className="text-gray-300 text-sm">
              Galle, Southern Province, Sri Lanka
            </p>
            <p className="text-gray-300 text-sm">+1 (800) 123-4567</p>
            <p className="text-[var(--color-teal-pop)] text-sm hover:underline cursor-pointer">
              reservations@oceanview.com
            </p>
          </div>

          {/* Social */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-[var(--color-accent-gold)] text-sm font-['Montserrat'] tracking-widest uppercase mb-2">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              {/* Placeholders for social icons */}
              <div className="w-8 h-8 rounded-full border border-gray-500 hover:border-[var(--color-accent-gold)] flex items-center justify-center cursor-pointer transition-colors text-gray-300 hover:text-[var(--color-accent-gold)]">
                In
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-500 hover:border-[var(--color-accent-gold)] flex items-center justify-center cursor-pointer transition-colors text-gray-300 hover:text-[var(--color-accent-gold)]">
                Fb
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-500 hover:border-[var(--color-accent-gold)] flex items-center justify-center cursor-pointer transition-colors text-gray-300 hover:text-[var(--color-accent-gold)]">
                Tw
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Fine line */}
        <div className="pt-8 border-t border-[rgba(201,168,76,0.3)]">
          <p className="text-xs text-center text-gray-500">
            &copy; {new Date().getFullYear()} OceanView Resort. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
