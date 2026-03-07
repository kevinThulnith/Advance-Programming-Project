import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Button from "../../components/common/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../api/client";

const ROOM_TYPES = ["ALL", "SINGLE", "DOUBLE", "SUITE", "DELUXE", "PENTHOUSE"];

const RoomsPage = () => {
  const [activeType, setActiveType] = useState("ALL");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [occupancy, setOccupancy] = useState(1);
  const [priceMax, setPriceMax] = useState(600);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let data = [];
      // If we have a full date range, use the search endpoint
      if (startDate && endDate) {
        const checkInStr = startDate.toISOString().split("T")[0];
        const checkOutStr = endDate.toISOString().split("T")[0];
        let url = `/rooms/search?checkIn=${checkInStr}&checkOut=${checkOutStr}`;
        if (activeType !== "ALL") {
          url += `&type=${activeType}`;
        }
        data = await api.get(url, false);
      } else {
        // Otherwise get all available rooms
        if (activeType === "ALL") {
          data = await api.get("/rooms/available", false);
        } else {
          data = await api.get(`/rooms/type/${activeType}`, false);
          data = data.filter((r) => r.available);
        }
      }
      setRooms(data);
    } catch (err) {
      setError("Failed to load rooms. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, activeType]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // Client-side filtering for occupancy and price (since backend search doesn't natively filter these)
  const filteredRooms = rooms.filter((room) => {
    if (room.maxOccupancy < occupancy) return false;
    if (room.pricePerNight > priceMax) return false;
    return true;
  });

  const clearFilters = () => {
    setActiveType("ALL");
    setDateRange([null, null]);
    setOccupancy(1);
    setPriceMax(600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[40vh] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-[var(--color-primary-deep)] opacity-40"></div>
        </div>

        <div className="relative z-10 text-center px-6 fade-up">
          <h1 className="text-4xl md:text-5xl text-white font-['Playfair_Display'] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] pt-12">
            Find Your Perfect Stay
          </h1>
          <p className="text-white font-['Montserrat'] tracking-widest text-sm uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Explore our luxury accommodations
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[72px] z-30 w-full px-4 md:px-8 py-4 -mt-8">
        <div className="max-w-7xl mx-auto glass-panel-light p-4 md:p-6 shadow-xl flex flex-col lg:flex-row gap-6 items-center lg:items-end rounded-2xl">
          {/* Room Type Pills */}
          <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <div className="flex space-x-2">
              {ROOM_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-full text-xs font-['Montserrat'] font-medium tracking-wide transition-all whitespace-nowrap ${
                    activeType === type
                      ? "bg-[var(--color-accent-gold)] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Range */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-['Montserrat'] uppercase tracking-wider mb-1.5 ml-1">
                Dates
              </label>
              <div className="relative custom-datepicker-container w-full">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
                  isClearable={true}
                  placeholderText="Check-in - Check-out"
                  className="input-field w-full text-sm bg-white"
                  minDate={new Date()}
                />
              </div>
            </div>

            {/* Occupancy */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-['Montserrat'] uppercase tracking-wider mb-1.5 ml-1">
                Guests
              </label>
              <select
                className="input-field text-sm bg-white cursor-pointer"
                value={occupancy}
                onChange={(e) => setOccupancy(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-1.5 px-1">
                <label className="text-xs text-gray-500 font-['Montserrat'] uppercase tracking-wider">
                  Max Price
                </label>
                <span className="text-xs font-bold text-[var(--color-primary-deep)]">
                  ${priceMax}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent-gold)] mt-2"
              />
            </div>
          </div>

          <div className="shrink-0 flex items-center lg:pb-1 pb-0 w-full lg:w-auto justify-end">
            <button
              onClick={clearFilters}
              className="text-[var(--color-teal-pop)] text-sm font-medium hover:underline flex items-center"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[var(--color-accent-gold)] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading rooms...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <Button variant="ghost" onClick={fetchRooms}>
              Try Again
            </Button>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-24 h-24 mb-6 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-['Playfair_Display'] text-[var(--color-primary-deep)] mb-2">
              No rooms found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any rooms matching your current filters.
            </p>
            <Button variant="ghost" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredRooms.map((room, index) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(201,168,76,0.3)] transition-all duration-500 flex flex-col fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Top */}
                <div className="relative h-64 overflow-hidden group">
                  <div className="absolute inset-0 bg-gray-200 animate-shimmer"></div>
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-[var(--color-teal-pop)] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg">
                    {room.roomType}
                  </div>
                </div>

                {/* Content Bottom */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs text-gray-400 font-['Montserrat']">
                        ROOM {room.roomNumber}
                      </span>
                      <h3 className="text-xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mt-1">
                        {room.roomType} Room
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-[var(--color-accent-gold)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>{" "}
                      Floor {room.floor}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-[var(--color-accent-gold)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>{" "}
                      Max {room.maxOccupancy}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-1">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[var(--color-accent-gold)] text-2xl font-bold font-['Playfair_Display']">
                        ${room.pricePerNight}
                      </span>
                      <span className="text-xs text-gray-400">per night</span>
                    </div>
                    <Link to={`/rooms/${room.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default RoomsPage;
