import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import DatePicker from 'react-datepicker';

// Mock data
const ROOM_DATA = {
  id: 1, 
  title: 'Ocean View Deluxe', 
  type: 'Deluxe',
  price: 300, 
  maxOccupancy: 3, 
  floor: 5, 
  description: 'Experience unhindered views of the sparkling Indian Ocean in this spacious deluxe room. Expertly appointed with custom mahogany furniture, a deep soaking tub, and a private balcony perfect for morning coffee or sunset cocktails. The luxury bedding ensures a perfect night\'s rest to the sound of gentle waves.', 
  amenities: [
    'King-size signature bed',
    'Private oceanfront balcony',
    'Deep soaking marble tub',
    'Rain forest shower',
    '24-hour room service',
    'Nespresso coffee maker',
    'Smart TV with casting',
    'High-speed Wi-Fi'
  ],
  images: [
    'https://images.unsplash.com/photo-1582719478250-c894e4dc240e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ]
};

const RoomDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const nightsCount = startDate && endDate 
    ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))
    : 0;
  
  const totalCost = nightsCount * ROOM_DATA.price;

  const handleReserve = () => {
    // Navigate to booking wizard with query params
    const query = new URLSearchParams({ roomId: id });
    if (startDate) query.append('checkIn', startDate.toISOString().split('T')[0]);
    if (endDate) query.append('checkOut', endDate.toISOString().split('T')[0]);
    
    navigate(`/reservations/new?${query.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col pt-24 pb-16">
        
        {/* Gallery Section */}
        <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 mb-12 fade-up">
          {/* Main Image */}
          <div className="relative h-[50vh] md:h-[60vh] rounded-2xl md:rounded-3xl overflow-hidden mb-4 shadow-xl group">
             <div className="absolute inset-0 bg-gray-200 animate-shimmer"></div>
             <img 
               src={ROOM_DATA.images[activeImage]} 
               alt="Room view" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
             
             <div className="absolute top-6 left-6 bg-[var(--color-accent-gold)] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
               {ROOM_DATA.type.toUpperCase()}
             </div>
             
             <div className="absolute bottom-6 right-6">
                <Button variant="ghost-white" size="sm" className="backdrop-blur-md bg-black/20 border-white/40">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  View Gallery
                </Button>
             </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 h-24 md:h-32">
            {ROOM_DATA.images.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${activeImage === idx ? 'ring-2 ring-[var(--color-accent-gold)] ring-offset-2 opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Info & Booking Split Layout */}
        <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Details */}
          <div className="w-full lg:w-2/3 flex flex-col fade-up" style={{animationDelay: '100ms'}}>
            
            <div className="mb-6">
              <div className="flex text-[var(--color-accent-gold)] mb-3">
                {"★★★★★".split('').map((star, i) => <span key={i} className="text-xl drop-shadow-sm">{star}</span>)}
              </div>
              <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold leading-tight mb-6">
                {ROOM_DATA.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 font-medium shadow-sm">
                  <svg className="w-4 h-4 mr-2 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  Floor {ROOM_DATA.floor}
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 font-medium shadow-sm">
                  <svg className="w-4 h-4 mr-2 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Max {ROOM_DATA.maxOccupancy} Guests
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 font-medium shadow-sm">
                  <svg className="w-4 h-4 mr-2 text-[var(--color-accent-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                  Ocean View
                </span>
              </div>
            </div>

            <div className="prose prose-lg text-gray-600 mb-10 font-light leading-relaxed">
              <p>{ROOM_DATA.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mb-6 flex items-center">
                Room Amenities
                <span className="ml-4 h-px flex-1 bg-gray-200"></span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {ROOM_DATA.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[var(--color-teal-pop)] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Reservation Panel */}
          <div className="w-full lg:w-1/3 fade-up" style={{animationDelay: '200ms'}}>
            <div className="glass-panel-light p-8 sticky top-32 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 bg-white/60">
              
              <div className="mb-6 pb-6 border-b border-gray-200 flex items-baseline justify-between">
                <div>
                  <span className="text-4xl font-['Playfair_Display'] font-bold text-[var(--color-accent-gold)] drop-shadow-sm">${ROOM_DATA.price}</span>
                  <span className="text-gray-500 text-sm ml-2 font-medium uppercase tracking-wider">/ night</span>
                </div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex flex-col">
                  <label className="text-xs text-[var(--color-primary-deep)] font-['Montserrat'] font-bold uppercase tracking-wider mb-2">Select Dates</label>
                  <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-inner focus-within:ring-2 focus-within:ring-[var(--color-accent-gold)] focus-within:border-transparent transition-all">
                    <DatePicker
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(update) => setDateRange(update)}
                      isClearable={true}
                      placeholderText="Check-in — Check-out"
                      className="w-full outline-none text-gray-700 bg-transparent text-sm font-medium"
                      minDate={new Date()}
                    />
                  </div>
                </div>
              </div>

              {nightsCount > 0 && (
                <div className="mb-6 bg-[rgba(201,168,76,0.05)] rounded-lg p-4 border border-[rgba(201,168,76,0.2)] animate-fade-in">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>${ROOM_DATA.price} x {nightsCount} nights</span>
                    <span>${ROOM_DATA.price * nightsCount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-[rgba(201,168,76,0.2)]">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-['Montserrat'] font-bold text-[var(--color-primary-deep)]">Total</span>
                    <span className="text-2xl font-bold text-[var(--color-accent-gold)]">${totalCost}</span>
                  </div>
                </div>
              )}

              <Button 
                size="full" 
                className="shadow-xl text-lg font-bold tracking-wide mt-2"
                onClick={handleReserve}
              >
                Reserve This Room
              </Button>
              
              <p className="text-center text-xs text-gray-400 mt-4 font-light">
                You won't be charged yet
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default RoomDetailPage;
