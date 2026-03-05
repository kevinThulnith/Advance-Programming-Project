import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Note: We might want navbar to always be dark on non-home pages
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `fixed w-full top-0 z-50 transition-all duration-300 ${
    scrolled || !isHomePage ? 'nav-scrolled py-4 shadow-lg' : 'bg-transparent py-6'
  }`;

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-50">
            <span className="text-2xl text-[var(--color-accent-gold)]">〰️</span>
            <span className={`text-2xl font-['Playfair_Display'] font-semibold ${scrolled || !isHomePage ? 'text-white' : 'text-white drop-shadow-md'}`}>
               OceanView
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-200 hover:text-[var(--color-accent-gold)] transition-colors text-sm uppercase tracking-wide">Home</Link>
            <Link to="/rooms" className="text-gray-200 hover:text-[var(--color-accent-gold)] transition-colors text-sm uppercase tracking-wide">Rooms</Link>
            <Link to="/about" className="text-gray-200 hover:text-[var(--color-accent-gold)] transition-colors text-sm uppercase tracking-wide">About</Link>
            <Link to="/contact" className="text-gray-200 hover:text-[var(--color-accent-gold)] transition-colors text-sm uppercase tracking-wide">Contact</Link>
          </div>

          {/* Desktop Auth/Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="btn-ghost-white text-sm">
              Sign In
            </Link>
            <Link to="/rooms" className="btn-gold text-sm">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center z-50">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-[var(--color-accent-gold)] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--color-primary-deep)] flex flex-col items-center justify-center space-y-8 animate-shimmer" style={{animationDuration: '3s', animationIterationCount: 1}}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white font-['Playfair_Display']">Home</Link>
          <Link to="/rooms" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white font-['Playfair_Display']">Rooms</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white font-['Playfair_Display']">About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white font-['Playfair_Display']">Contact</Link>
          
          <div className="flex flex-col space-y-4 pt-8 w-64">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-ghost border-white text-white text-center">Sign In</Link>
            <Link to="/rooms" onClick={() => setMobileMenuOpen(false)} className="btn-gold text-center">Book Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
