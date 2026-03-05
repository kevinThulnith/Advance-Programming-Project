import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic
    if (formData.username === 'admin' && formData.password === 'admin123') {
      navigate('/admin');
    } else if (formData.username && formData.password) {
      navigate('/my-reservations');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      
      {/* Left Panel - Image (60%) */}
      <div className="hidden lg:flex w-[60%] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)] via-transparent to-black/20 opacity-90"></div>
        </div>

        <Link to="/" className="absolute top-10 left-10 flex items-center space-x-2 z-10 transition-transform hover:scale-105">
          <span className="text-3xl text-[var(--color-accent-gold)] font-serif">〰️</span>
          <span className="text-3xl font-['Playfair_Display'] font-medium text-white drop-shadow-lg">
            OceanView
          </span>
        </Link>

        <div className="absolute bottom-16 left-12 right-12 z-10 fade-up">
           <h2 className="text-4xl xl:text-5xl font-['Playfair_Display'] text-white italic font-light drop-shadow-md leading-relaxed">
             "Your luxury escape awaits."
           </h2>
           <p className="text-gray-300 mt-4 text-lg font-['Montserrat'] tracking-wide">
             Log in to access exclusive member rates and manage your stay.
           </p>
        </div>
      </div>

      {/* Right Panel - Form (40%) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-16 lg:px-20 bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-20">
        
        {/* Mobile Logo */}
        <Link to="/" className="lg:hidden flex items-center justify-center space-x-2 mb-12">
          <span className="text-3xl text-[var(--color-accent-gold)]">〰️</span>
          <span className="text-3xl font-['Playfair_Display'] font-semibold text-[var(--color-primary-deep)]">
            OceanView
          </span>
        </Link>
        
        <div className="w-full max-w-sm mx-auto fade-up">
          <h1 className="text-4xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-10 font-['Montserrat'] text-sm tracking-wide">
            Sign in to manage your reservations
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username Field */}
            <div className="relative group">
              <input 
                type="text" 
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer transition-colors font-medium shadow-sm hover:border-gray-400"
                placeholder=" " 
              />
              <label 
                htmlFor="username" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1"
              >
                Username
              </label>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer transition-colors font-medium shadow-sm hover:border-gray-400"
                placeholder=" " 
              />
              <label 
                htmlFor="password" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1"
              >
                Password
              </label>
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-accent-gold)] transition-colors focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-[#E53E3E] text-sm flex items-center animate-[shake_0.5s_ease-in-out]">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}

            <Button type="submit" size="full" className="mt-8 text-lg font-bold tracking-wide shadow-lg">
              Sign In
            </Button>
          </form>

          <div className="mt-10 flex items-center justify-center space-x-4">
            <span className="h-px w-16 bg-gray-200"></span>
            <span className="text-gray-400 text-sm font-['Montserrat'] tracking-widest lowercase">or</span>
            <span className="h-px w-16 bg-gray-200"></span>
          </div>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500 flex flex-col items-center">
              Don't have an account? 
              <Link to="/register" className="text-[var(--color-teal-pop)] font-semibold hover:underline mt-2 ml-1 text-base">
                Create an account <span aria-hidden="true">&rarr;</span>
              </Link>
            </span>
          </div>
          
        </div>
      </div>
      
      {/* Required Shake Animation CSS */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
