import { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit
    setSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}
        >
          <div className="absolute inset-0 bg-[var(--color-primary-deep)] opacity-40"></div>
        </div>
        <div className="relative z-10 text-center px-6 pt-16 fade-up">
          <span className="text-white font-['Montserrat'] text-xs uppercase tracking-widest block mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">We Are Here For You</span>
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-24 flex-1">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info Panel */}
          <div className="fade-up">
            <h2 className="text-3xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-500 font-light leading-relaxed mb-10">
              Whether you have a question about a reservation, want to plan a special event at our Galle beachside resort, or simply need assistance — our concierge team is available around the clock.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center mr-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-['Montserrat'] font-bold text-[var(--color-primary-deep)] text-sm uppercase tracking-wider mb-1">Address</h4>
                  <p className="text-gray-500 font-light">Ocean View Resort, Galle Road,<br />Galle, Southern Province, Sri Lanka</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center mr-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-['Montserrat'] font-bold text-[var(--color-primary-deep)] text-sm uppercase tracking-wider mb-1">Phone</h4>
                  <p className="text-gray-500 font-light">+1 (800) 123-4567</p>
                  <p className="text-xs text-gray-400 mt-1">Available 24 hours / 7 days</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center mr-5 flex-shrink-0">
                  <svg className="w-5 h-5 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-['Montserrat'] font-bold text-[var(--color-primary-deep)] text-sm uppercase tracking-wider mb-1">Email</h4>
                  <p className="text-gray-500 font-light">reservations@oceanview.com</p>
                  <p className="text-gray-500 font-light">info@oceanview.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-up" style={{ animationDelay: '100ms' }}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-white rounded-2xl border border-gray-100 shadow-sm animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-[rgba(0,180,216,0.1)] flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-[var(--color-teal-pop)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[var(--color-primary-deep)] mb-3">Message Received</h3>
                <p className="text-gray-500 font-light max-w-xs">Thank you, {form.name}. Our concierge team will reach out to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-8 text-[var(--color-teal-pop)] font-semibold hover:underline text-sm">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder=" "
                      className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:border-[var(--color-accent-gold)] peer font-medium shadow-sm" />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1">
                      Your Name
                    </label>
                  </div>
                  <div className="relative">
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder=" "
                      className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:border-[var(--color-accent-gold)] peer font-medium shadow-sm" />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder=" "
                    className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:border-[var(--color-accent-gold)] peer font-medium shadow-sm" />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1">
                    Subject
                  </label>
                </div>

                <div className="relative">
                  <textarea name="message" value={form.message} onChange={handleChange} required rows="5" placeholder=" "
                    className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:border-[var(--color-accent-gold)] peer font-medium shadow-sm resize-none">
                  </textarea>
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1">
                    Your Message
                  </label>
                </div>

                <Button type="submit" size="full" className="shadow-md text-base font-bold mt-2">
                  Send Message
                </Button>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
