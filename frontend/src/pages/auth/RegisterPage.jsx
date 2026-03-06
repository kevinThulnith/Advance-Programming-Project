import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    username: '', 
    email: '', 
    phoneNumber: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return 0;
    let strength = 0;
    if (pass.length > 5) strength += 25;
    if (pass.length > 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength(formData.password);
  const strengthColor = strength <= 25 ? 'bg-red-400' : strength <= 50 ? 'bg-orange-400' : strength <= 75 ? 'bg-[var(--color-accent-gold)]' : 'bg-[var(--color-teal-pop)]';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.username || !formData.password || !formData.fullName) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      const { api } = await import('../../api/client');
      // email and phoneNumber are optional in the backend, but we'll send them if filled
      await api.post('/auth/register', {
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        email: formData.email || null,
        phoneNumber: formData.phoneNumber || null
      }, false);
      
      // On successful registration, redirect to login
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">
      
      {/* Left Panel - Form (60%) */}
      <div className="w-full lg:w-[60%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white shadow-[20px_0_40px_rgba(0,0,0,0.05)] z-20 overflow-y-auto py-12">
        
        {/* Mobile Logo */}
        <Link to="/" className="lg:hidden flex items-center justify-center space-x-2 mb-10">
          <span className="text-3xl text-[var(--color-accent-gold)]">〰️</span>
          <span className="text-3xl font-['Playfair_Display'] font-semibold text-[var(--color-primary-deep)]">
            OceanView
          </span>
        </Link>
        
        <div className="w-full max-w-lg mx-auto fade-up">
          <h1 className="text-4xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mb-3">
            Create Your Account
          </h1>
          <p className="text-gray-500 mb-10 font-['Montserrat'] text-sm tracking-wide">
            Join OceanView and start your luxury journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name Field */}
              <div className="relative group">
                <input 
                  type="text" 
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer transition-colors font-medium shadow-sm"
                  placeholder=" " 
                />
                <label 
                  htmlFor="fullName" 
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1"
                >
                  Full Name
                </label>
                {formData.fullName.length > 2 && (
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-teal-pop)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
              </div>

              {/* Username Field */}
              <div className="relative group">
                <input 
                  type="text" 
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer transition-colors font-medium shadow-sm"
                  placeholder=" " 
                />
                <label 
                  htmlFor="username" 
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1"
                >
                  Username
                </label>
                {formData.username.length > 3 && (
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-teal-pop)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email Field */}
              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer transition-colors font-medium shadow-sm"
                  placeholder=" " 
                />
                <label 
                  htmlFor="email" 
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1"
                >
                  Email Address
                </label>
                {formData.email.includes('@') && (
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-teal-pop)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
              </div>

              {/* Phone Field */}
              <div className="relative group">
                <input 
                  type="tel" 
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer transition-colors font-medium shadow-sm"
                  placeholder=" " 
                />
                <label 
                  htmlFor="phoneNumber" 
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1"
                >
                  Phone Number
                </label>
                {formData.phoneNumber.length > 7 && (
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-teal-pop)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer transition-colors font-medium shadow-sm"
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
            
            {/* Password Strength Meter */}
            {formData.password.length > 0 && (
              <div className="flex h-1.5 w-full bg-gray-200 mt-1 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: `${Math.max(strength, 10)}%` }}></div>
              </div>
            )}

            {/* Confirm Password Field */}
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer transition-colors font-medium shadow-sm"
                placeholder=" " 
              />
              <label 
                htmlFor="confirmPassword" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1"
              >
                Confirm Password
              </label>
              {formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword && (
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-teal-pop)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-[#E53E3E] text-sm flex items-center animate-[shake_0.5s_ease-in-out]">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}

            <Button type="submit" size="full" className="mt-8 text-lg font-bold tracking-wide shadow-lg">
              Create Account
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500 flex flex-col items-center">
              Already have an account? 
              <Link to="/login" className="text-[var(--color-teal-pop)] font-semibold hover:underline mt-2 ml-1 text-base">
                Sign in <span aria-hidden="true">&rarr;</span>
              </Link>
            </span>
          </div>
          
        </div>
      </div>

      {/* Right Panel - Image (40%) */}
      <div className="hidden lg:flex w-[40%] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)] via-[var(--color-primary-mid)] to-transparent opacity-60 mix-blend-multiply"></div>
        </div>
        
        <Link to="/" className="absolute top-10 right-10 flex items-center space-x-2 z-10 transition-transform hover:scale-105">
          <span className="text-2xl font-['Playfair_Display'] font-medium text-white drop-shadow-lg">
            OceanView
          </span>
          <span className="text-2xl text-[var(--color-accent-gold)] font-serif">〰️</span>
        </Link>
      </div>
      
    </div>
  );
};

export default RegisterPage;
