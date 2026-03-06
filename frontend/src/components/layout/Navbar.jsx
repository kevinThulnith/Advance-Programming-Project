import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  // Read auth state from localStorage
  const readUser = () => {
    try {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    readUser();
    // Re-read when storage changes (e.g. login / logout in same or other tab)
    window.addEventListener('storage', readUser);
    return () => window.removeEventListener('storage', readUser);
  }, []);

  // Re-read when the route changes (handles same-tab login)
  useEffect(() => {
    readUser();
  }, [location.pathname]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = (e) => {
      if (!e.target.closest('#user-menu')) setDropdownOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [dropdownOpen]);

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
            {user ? (
              <>
                <div id="user-menu" className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 text-gray-200 hover:text-[var(--color-accent-gold)] transition-colors text-sm"
                  >
                    {/* Avatar circle */}
                    <span className="w-8 h-8 rounded-full bg-[var(--color-accent-gold)] text-[var(--color-primary-deep)] flex items-center justify-center font-bold text-sm uppercase">
                      {user.username?.[0] ?? '?'}
                    </span>
                    <span className="uppercase tracking-wide">{user.username}</span>
                    <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 rounded-xl bg-[var(--color-primary-deep)] shadow-2xl border border-white/10 py-2 z-50 animate-[fadeIn_0.15s_ease]">
                      {user.role === 'admin' ? (
                        <Link
                          to="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-200 hover:text-[var(--color-accent-gold)] hover:bg-white/5 transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      ) : (
                        <Link
                          to="/my-reservations"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-200 hover:text-[var(--color-accent-gold)] hover:bg-white/5 transition-colors"
                        >
                          My Reservations
                        </Link>
                      )}
                      <hr className="my-1 border-white/10" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>

                <Link to="/rooms" className="btn-gold text-sm">Book Now</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost-white text-sm">Sign In</Link>
                <Link to="/rooms" className="btn-gold text-sm">Book Now</Link>
              </>
            )}
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
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="btn-ghost border-white text-white text-center">Admin Dashboard</Link>
                ) : (
                  <Link to="/my-reservations" onClick={() => setMobileMenuOpen(false)} className="btn-ghost border-white text-white text-center">My Reservations</Link>
                )}
                <button onClick={handleSignOut} className="btn-ghost border-red-400 text-red-400 text-center">Sign Out</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-ghost border-white text-white text-center">Sign In</Link>
            )}
            <Link to="/rooms" onClick={() => setMobileMenuOpen(false)} className="btn-gold text-center">Book Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
