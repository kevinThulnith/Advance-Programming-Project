import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Button from "../../components/common/Button";
import { api } from "../../api/client";

const TABS = ["All", "Pending", "Confirmed", "Cancelled", "Checked Out"];

const MyReservationsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  })();

  useEffect(() => {
    api
      .get("/reservations/my")
      .then((data) => setReservations(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "CONFIRMED":
        return "bg-[var(--color-teal-pop)] bg-opacity-10 text-[var(--color-teal-pop)] border-[var(--color-teal-pop)] border-opacity-20";
      case "CANCELLED":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "CHECKED_OUT":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReservations = reservations.filter((res) => {
    if (activeTab === "All") return true;
    return res.status === activeTab.toUpperCase().replace(" ", "_");
  });

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 lg:px-8 py-24 md:py-32 fade-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mb-3">
              Welcome back,{" "}
              {currentUser.fullName || currentUser.username || "Guest"}
            </h1>
            <p className="text-gray-500 font-['Montserrat'] text-sm tracking-wide">
              Here is a summary of your stays
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link to="/rooms">
              <Button size="sm" className="shadow-md">
                <span className="mr-2">New Reservation</span>
                <span className="text-lg leading-none">+</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto space-x-6 mb-8 pb-2 border-b border-gray-100 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-['Montserrat'] whitespace-nowrap transition-colors relative ${activeTab === tab ? "text-[var(--color-primary-deep)] font-bold" : "text-gray-400 hover:text-gray-600 font-medium"}`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-accent-light)] rounded-t-md"></span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-['Montserrat']">
            Loading reservations…
          </div>
        ) : error ? (
          <div className="text-center py-20 text-rose-500 font-['Montserrat']">
            {error}
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm animate-fade-in flex flex-col items-center">
            <div className="w-24 h-24 mb-6 text-gray-200">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-['Playfair_Display'] text-[var(--color-primary-deep)] mb-3 font-semibold">
              No reservations found
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              You don't have any{" "}
              {activeTab.toLowerCase() !== "all" ? activeTab.toLowerCase() : ""}{" "}
              reservations at the moment.
            </p>
            <Link to="/rooms">
              <Button variant="ghost" size="sm">
                Book your first stay →
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReservations.map((res) => (
              <div
                key={res.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 md:h-40 flex flex-col md:flex-row overflow-hidden hover:bg-[#FAF9F5]"
              >
                {/* Image */}
                <div className="h-48 md:h-full md:w-48 flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 animate-shimmer"></div>
                  <img
                    src={res.room?.imageUrl}
                    alt={res.room?.roomType}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 mb-2 md:mb-0">
                      <span className="bg-[var(--color-primary-deep)] text-[var(--color-accent-gold)] text-xs font-bold px-2.5 py-1 rounded shadow-sm font-['Montserrat']">
                        ROOM {res.room?.roomNumber}
                      </span>
                      <h3 className="text-lg font-['Playfair_Display'] font-bold text-[var(--color-primary-deep)]">
                        {res.room?.description || res.room?.roomType}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1.5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {res.checkInDate}{" "}
                      <span className="mx-2 text-gray-300">→</span>{" "}
                      {res.checkOutDate}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between mt-auto">
                    <div className="text-sm text-gray-500 mb-4 md:mb-0">
                      Guest:{" "}
                      <span className="text-[var(--color-primary-deep)] font-medium">
                        {res.guestName}
                      </span>
                      <span className="mx-3 text-gray-300">|</span>
                      Total:{" "}
                      <span className="text-[var(--color-accent-gold)] font-bold text-lg">
                        ${res.totalCost}
                      </span>
                    </div>

                    <div className="flex items-center justify-between md:justify-end md:space-x-6 w-full md:w-auto mt-2 md:mt-0">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${getStatusColor(res.status)}`}
                      >
                        {res.status.replace("_", " ")}
                      </span>

                      <div className="flex items-center space-x-4">
                        {res.status === "PENDING" && (
                          <button className="hidden group-hover:block text-xs font-bold text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-wider font-['Montserrat'] animate-fade-in">
                            Cancel
                          </button>
                        )}
                        <Link
                          to={`/my-reservations/${res.id}`}
                          className="text-[var(--color-teal-pop)] text-sm font-semibold hover:underline flex items-center"
                        >
                          View Details <span className="ml-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyReservationsPage;
