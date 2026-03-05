import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const TEAM = [
  { name: 'James Harrington', role: 'General Manager', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Sofia Delacroix', role: 'Head of Hospitality', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { name: 'Marcus Tan', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
];

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}
        >
          <div className="absolute inset-0 bg-[var(--color-primary-deep)] opacity-40"></div>
        </div>
        <div className="relative z-10 text-center px-6 pt-16 fade-up">
          <span className="text-white font-['Montserrat'] text-xs uppercase tracking-widest block mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            About OceanView
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center fade-up">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] text-[var(--color-primary-deep)] mb-8">
            A Legendary Beachside Escape in Galle
          </h2>
          <div className="space-y-5 text-gray-600 font-light leading-relaxed text-lg">
            <p>
              Nestled along the scenic coastline of Galle, Sri Lanka, OceanView Resort has been welcoming guests from across the world to experience the finest in beachfront hospitality.
            </p>
            <p>
              Serving hundreds of guests each month, our resort offers a seamless blend of warm Sri Lankan culture and world-class luxury. From our carefully curated rooms to our ocean-view dining experiences, every detail is designed with you in mind.
            </p>
            <p>
              At OceanView, we believe that exceptional service isn't a feature — it is our standard.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-[var(--color-primary-deep)] py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '20+', label: 'Years of Excellence' },
            { value: '80+', label: 'Countries Welcomed' },
            { value: '50+', label: 'Luxury Rooms' },
            { value: '98%', label: 'Guest Satisfaction' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-['Playfair_Display'] font-bold text-[var(--color-accent-gold)] mb-2">{stat.value}</div>
              <div className="text-xs font-['Montserrat'] uppercase tracking-widest text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] text-[var(--color-primary-deep)]">Meet Our Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-5 border-4 border-[rgba(201,168,76,0.2)] shadow-md"
                />
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[var(--color-primary-deep)] mb-1">{member.name}</h3>
                <span className="text-xs text-[var(--color-accent-gold)] font-['Montserrat'] uppercase tracking-wider font-semibold">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-['Playfair_Display'] text-[var(--color-primary-deep)] mb-4">Ready to Experience It?</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto font-light">Your perfect escape is just a few clicks away. Browse our rooms and make your reservation today.</p>
        <Link to="/rooms" className="btn-gold px-10 py-3 text-base">Explore Rooms &rarr;</Link>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
