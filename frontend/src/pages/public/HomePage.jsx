import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Background via unsplash placeholder */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat shadow-inner transform scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}
        >
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)] via-transparent to-[var(--color-primary-deep)] opacity-50 backdrop-brightness-75"></div>
        </div>

        {/* Content Panel */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 mt-16">
          <div className="glass-panel p-8 md:p-12 max-w-2xl fade-up border-l-4 border-l-[var(--color-accent-gold)]">
            <span className="text-white text-xs md:text-sm mb-4 block animate-pulse">
              Luxury Beachfront Resort
            </span>
            <h1 className="text-4xl md:text-6xl text-white font-['Playfair_Display'] leading-tight mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Experience the Art<br />of Oceanfront Living
            </h1>
            <p className="text-white text-lg md:text-xl font-light mb-8 max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              From cozy ocean-view singles to a full-floor penthouse — every stay, unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
               <Link to="/rooms">
                 <Button size="lg" className="w-full sm:w-auto shadow-xl">Explore Rooms</Button>
               </Link>
               <Link to="/rooms">
                 <Button variant="ghost-white" size="lg" className="w-full sm:w-auto backdrop-blur-sm bg-white/5">Book Now</Button>
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-24 bg-[var(--color-surface)] relative">
        {/* Subtle background texture/pattern */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at center, #0A1628 2px, transparent 2.5px)', backgroundSize: '30px 30px'}}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-['Playfair_Display'] text-[var(--color-primary-deep)] inline-block relative">
              Our Accommodations
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-gold)] to-transparent"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Room Card 1 */}
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(201,168,76,0.3)]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1582719478250-c894e4dc240e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-[var(--color-teal-pop)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md bg-opacity-90">
                Deluxe
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-2xl font-['Playfair_Display'] mb-1">Ocean View Deluxe</h3>
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[var(--color-accent-gold)] text-xl font-semibold">$300 <span className="text-sm text-gray-300 font-normal">/ night</span></p>
                  <span className="text-gray-300 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> Max 3</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <Link to="/rooms/1" className="text-[var(--color-accent-gold)] font-medium flex items-center hover:text-[var(--color-accent-light)]">
                    View Details <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Room Card 2 */}
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(201,168,76,0.3)]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute top-4 right-4 bg-[var(--color-teal-pop)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md bg-opacity-90">
                Suite
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-2xl font-['Playfair_Display'] mb-1">Luxury Suite</h3>
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[var(--color-accent-gold)] text-xl font-semibold">$200 <span className="text-sm text-gray-300 font-normal">/ night</span></p>
                  <span className="text-gray-300 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> Max 2</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <Link to="/rooms/2" className="text-[var(--color-accent-gold)] font-medium flex items-center hover:text-[var(--color-accent-light)]">
                    View Details <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Room Card 3 */}
             <div className="group relative h-96 rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(201,168,76,0.3)] md:mt-12">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-deep)] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute top-4 right-4 bg-[var(--color-accent-gold)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Penthouse
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-2xl font-['Playfair_Display'] mb-1">Ocean Penthouse</h3>
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[var(--color-accent-gold)] text-xl font-semibold">$500 <span className="text-sm text-gray-300 font-normal">/ night</span></p>
                  <span className="text-gray-300 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> Max 4</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <Link to="/rooms/3" className="text-[var(--color-accent-gold)] font-medium flex items-center hover:text-[var(--color-accent-light)]">
                    View Details <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
          
          <div className="text-center mt-12">
            <Link to="/rooms">
              <Button variant="ghost" className="border-gray-300 text-gray-600 hover:border-[var(--color-primary-deep)] hover:text-[var(--color-primary-deep)] hover:bg-transparent">
                View All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Strip */}
      <section className="bg-[var(--color-primary-deep)] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-4 transition-colors group-hover:border-[var(--color-accent-gold)] group-hover:bg-[rgba(201,168,76,0.1)]">
                <svg className="w-8 h-8 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <span className="text-[var(--color-text-light)] text-sm font-medium tracking-wide">Infinity Pool</span>
            </div>
            
            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-4 transition-colors group-hover:border-[var(--color-accent-gold)] group-hover:bg-[rgba(201,168,76,0.1)]">
                <svg className="w-8 h-8 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-[var(--color-text-light)] text-sm font-medium tracking-wide">Luxury Spa</span>
            </div>

            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-4 transition-colors group-hover:border-[var(--color-accent-gold)] group-hover:bg-[rgba(201,168,76,0.1)]">
                <svg className="w-8 h-8 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              </div>
              <span className="text-[var(--color-text-light)] text-sm font-medium tracking-wide">Ocean View</span>
            </div>

            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-4 transition-colors group-hover:border-[var(--color-accent-gold)] group-hover:bg-[rgba(201,168,76,0.1)]">
                <svg className="w-8 h-8 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-[var(--color-text-light)] text-sm font-medium tracking-wide">Concierge</span>
            </div>

            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-4 transition-colors group-hover:border-[var(--color-accent-gold)] group-hover:bg-[rgba(201,168,76,0.1)]">
                <svg className="w-8 h-8 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <span className="text-[var(--color-text-light)] text-sm font-medium tracking-wide">Fine Dining</span>
            </div>

            <div className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 rounded-full border border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-4 transition-colors group-hover:border-[var(--color-accent-gold)] group-hover:bg-[rgba(201,168,76,0.1)]">
                <svg className="w-8 h-8 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="text-[var(--color-text-light)] text-sm font-medium tracking-wide">Private Beach</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
           <svg className="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
             <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[var(--color-primary-deep)]"></path>
           </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 relative z-10">
          <div className="text-center mb-16 relative">
            <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-9xl text-[var(--color-accent-gold)] opacity-20 font-serif leading-none">"</span>
            <h2 className="text-4xl font-['Playfair_Display'] text-[var(--color-primary-deep)] relative z-10">Guest Experiences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-surface)] p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="flex text-[var(--color-accent-gold)] mb-6">
                {"★★★★★".split('').map((star, i) => <span key={i} className="text-xl">{star}</span>)}
              </div>
              <p className="text-gray-600 font-light italic mb-8 flex-grow">"An absolute paradise. The ocean views from our suite were breathtaking, and the service was impeccable from check-in to check-out."</p>
              <div className="mt-auto">
                <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden shadow-inner">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah J." className="w-full h-full object-cover" />
                </div>
                <h4 className="font-['Montserrat'] text-sm font-bold text-[var(--color-primary-deep)]">SARAH JENKINS</h4>
                <span className="text-xs text-gray-500">London, UK</span>
              </div>
            </div>

            <div className="bg-[var(--color-surface)] p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="flex text-[var(--color-accent-gold)] mb-6">
                {"★★★★★".split('').map((star, i) => <span key={i} className="text-xl">{star}</span>)}
              </div>
              <p className="text-gray-600 font-light italic mb-8 flex-grow">"We celebrated our anniversary at the penthouse. The attention to detail and luxury amenities exceeded our highest expectations."</p>
              <div className="mt-auto">
                <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden shadow-inner">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Michael C." className="w-full h-full object-cover" />
                </div>
                <h4 className="font-['Montserrat'] text-sm font-bold text-[var(--color-primary-deep)]">MICHAEL CHEN</h4>
                <span className="text-xs text-gray-500">Sydney, AU</span>
              </div>
            </div>

            <div className="bg-[var(--color-surface)] p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="flex text-[var(--color-accent-gold)] mb-6">
                {"★★★★★".split('').map((star, i) => <span key={i} className="text-xl">{star}</span>)}
              </div>
              <p className="text-gray-600 font-light italic mb-8 flex-grow">"The dining experience alone is worth the trip. Waking up to the sound of waves in the Deluxe room was a dream."</p>
              <div className="mt-auto">
                 <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden shadow-inner">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Elena G." className="w-full h-full object-cover" />
                </div>
                <h4 className="font-['Montserrat'] text-sm font-bold text-[var(--color-primary-deep)]">ELENA GOMEZ</h4>
                <span className="text-xs text-gray-500">Madrid, ES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
