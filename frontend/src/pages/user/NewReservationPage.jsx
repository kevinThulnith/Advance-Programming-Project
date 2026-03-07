import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Button from "../../components/common/Button";
import { api } from "../../api/client";

const NewReservationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialRoomId = searchParams.get("roomId");
  const initialCheckIn = searchParams.get("checkIn");
  const initialCheckOut = searchParams.get("checkOut");

  const [step, setStep] = useState(initialCheckIn && initialCheckOut ? 2 : 1);
  const [dateRange, setDateRange] = useState(() => {
    if (initialCheckIn && initialCheckOut) {
      return [new Date(initialCheckIn), new Date(initialCheckOut)];
    }
    return [null, null];
  });
  const [startDate, endDate] = dateRange;

  const [room, setRoom] = useState(null);
  const [roomLoading, setRoomLoading] = useState(!!initialRoomId);
  const [submitError, setSubmitError] = useState("");

  const [guestDetails, setGuestDetails] = useState({
    name: "",
    address: "",
    phone: "",
    requests: "",
  });

  useEffect(() => {
    if (initialRoomId) {
      api
        .get(`/rooms/${initialRoomId}`, false)
        .then((data) => setRoom(data))
        .catch(() => {})
        .finally(() => setRoomLoading(false));
    }
  }, [initialRoomId]);

  const nightsCount =
    startDate && endDate
      ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;
  const totalCost = nightsCount * (room?.pricePerNight || 0);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    try {
      await api.post("/reservations", {
        roomId: Number(searchParams.get("roomId")),
        guestName: guestDetails.name,
        guestAddress: guestDetails.address,
        contactNumber: guestDetails.phone,
        checkInDate: startDate.toISOString().split("T")[0],
        checkOutDate: endDate.toISOString().split("T")[0],
      });
      navigate("/my-reservations");
    } catch (err) {
      setSubmitError(
        err.message || "Failed to create reservation. Please try again.",
      );
    }
  };

  const handleGuestChange = (e) => {
    setGuestDetails({ ...guestDetails, [e.target.name]: e.target.value });
  };

  const isStep1Valid = startDate && endDate && nightsCount > 0;
  const isStep2Valid =
    guestDetails.name && guestDetails.phone && guestDetails.address;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 lg:px-8 py-24 md:py-32">
        {/* Wizard Header */}
        <div className="mb-12 text-center fade-up">
          <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mb-4">
            Complete Your Booking
          </h1>
          <p className="text-gray-500 font-['Montserrat'] text-sm tracking-wide">
            Secure your luxury stay in three simple steps
          </p>
        </div>

        {/* Step Indicator */}
        <div
          className="flex items-center justify-center mb-12 relative fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <div className="hidden md:flex absolute top-1/2 left-[15%] right-[15%] h-px bg-gray-200 -z-10 -translate-y-1/2"></div>

          <div className="flex space-x-4 md:space-x-0 w-full md:justify-between px-4">
            {/* Step 1 */}
            <div
              className={`flex flex-col items-center relative ${step >= 1 ? "opacity-100" : "opacity-50"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors duration-300 ${
                  step > 1
                    ? "bg-[var(--color-teal-pop)] text-white"
                    : step === 1
                      ? "bg-[var(--color-accent-gold)] text-white ring-4 ring-[rgba(201,168,76,0.2)]"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > 1 ? "✓" : "1"}
              </div>
              <span
                className={`text-xs font-['Montserrat'] font-bold tracking-wider uppercase ${step === 1 ? "text-[var(--color-primary-deep)]" : "text-gray-500"}`}
              >
                Dates & Room
              </span>
            </div>

            {/* Step 2 */}
            <div
              className={`flex flex-col items-center relative ${step >= 2 ? "opacity-100" : "opacity-50"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors duration-300 ${
                  step > 2
                    ? "bg-[var(--color-teal-pop)] text-white"
                    : step === 2
                      ? "bg-[var(--color-accent-gold)] text-white ring-4 ring-[rgba(201,168,76,0.2)]"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > 2 ? "✓" : "2"}
              </div>
              <span
                className={`text-xs font-['Montserrat'] font-bold tracking-wider uppercase ${step === 2 ? "text-[var(--color-primary-deep)]" : "text-gray-500"}`}
              >
                Guest Details
              </span>
            </div>

            {/* Step 3 */}
            <div
              className={`flex flex-col items-center relative ${step >= 3 ? "opacity-100" : "opacity-50"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors duration-300 ${
                  step === 3
                    ? "bg-[var(--color-accent-gold)] text-white ring-4 ring-[rgba(201,168,76,0.2)]"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs font-['Montserrat'] font-bold tracking-wider uppercase ${step === 3 ? "text-[var(--color-primary-deep)]" : "text-gray-500"}`}
              >
                Confirm
              </span>
            </div>
          </div>
        </div>

        {/* Wizard Content Container */}
        <div
          className="glass-panel-light p-6 md:p-10 shadow-xl overflow-hidden fade-up"
          style={{ animationDelay: "200ms" }}
        >
          {/* STEP 1: Dates & Room */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mb-6 pb-4 border-b border-gray-100">
                1. Select Dates
              </h2>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Room Summary Column */}
                <div className="w-full lg:w-1/3">
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 h-full flex flex-col">
                    {roomLoading ? (
                      <div className="h-40 w-full bg-gray-200 animate-pulse" />
                    ) : (
                      <img
                        src={room?.imageUrl}
                        alt={room?.roomType}
                        className="h-40 w-full object-cover"
                      />
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <span className="text-xs text-[var(--color-teal-pop)] font-bold tracking-wider uppercase mb-1">
                        {room?.roomType}
                      </span>
                      <h3 className="font-['Playfair_Display'] font-bold text-lg text-[var(--color-primary-deep)] mb-2">
                        {room?.roomType} Room
                      </h3>
                      <div className="mt-auto">
                        <span className="text-[var(--color-accent-gold)] text-2xl font-bold">
                          ${room?.pricePerNight}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          / night
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Selection Column */}
                <div className="w-full lg:w-2/3 flex flex-col">
                  <label className="text-xs text-[var(--color-primary-deep)] font-['Montserrat'] font-bold uppercase tracking-wider mb-2">
                    Check-in — Check-out
                  </label>
                  <div className="border border-gray-300 rounded-lg p-3 bg-white shadow-inner focus-within:ring-2 focus-within:ring-[var(--color-accent-gold)] focus-within:border-transparent transition-all mb-8">
                    <DatePicker
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(update) => setDateRange(update)}
                      isClearable={true}
                      placeholderText="Select your dates"
                      className="w-full outline-none text-gray-700 bg-transparent text-lg font-medium py-2"
                      minDate={new Date()}
                      inline={window.innerWidth > 768} // Inline calendar on desktop
                    />
                  </div>

                  {nightsCount > 0 && (
                    <div className="mt-auto bg-[rgba(201,168,76,0.05)] rounded-lg p-5 border border-[rgba(201,168,76,0.3)] animate-fade-in flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600 font-medium">
                          Calculation
                        </span>
                        <span className="text-gray-500 font-['Montserrat'] text-xs mt-1">
                          {nightsCount} nights × ${room?.pricePerNight}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-sm text-[var(--color-primary-deep)] font-bold mb-1">
                          Total Cost
                        </span>
                        <span className="text-2xl font-bold text-[var(--color-accent-gold)]">
                          ${totalCost}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={handleNext}
                      disabled={!isStep1Valid}
                      className="px-10"
                    >
                      Continue to Details <span className="ml-2">→</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Guest Details */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                <span>2. Guest Details</span>
                <span className="text-sm font-['Inter'] font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {startDate?.toLocaleDateString()} —{" "}
                  {endDate?.toLocaleDateString()}
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Name */}
                <div className="relative group col-span-1 md:col-span-2 lg:col-span-1">
                  <input
                    type="text"
                    name="name"
                    value={guestDetails.name}
                    onChange={handleGuestChange}
                    className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer font-medium shadow-sm transition-colors hover:border-gray-400"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1">
                    Primary Guest Name
                  </label>
                </div>

                {/* Phone */}
                <div className="relative group col-span-1 md:col-span-2 lg:col-span-1">
                  <input
                    type="tel"
                    name="phone"
                    value={guestDetails.phone}
                    onChange={handleGuestChange}
                    className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer font-medium shadow-sm transition-colors hover:border-gray-400"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1">
                    Contact Number
                  </label>
                </div>

                {/* Address */}
                <div className="relative group col-span-1 md:col-span-2">
                  <textarea
                    name="address"
                    value={guestDetails.address}
                    onChange={handleGuestChange}
                    rows="2"
                    className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer font-medium shadow-sm transition-colors hover:border-gray-400 resize-none"
                    placeholder=" "
                  ></textarea>
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1">
                    Billing/Guest Address
                  </label>
                </div>

                {/* Special Requests */}
                <div className="relative group col-span-1 md:col-span-2">
                  <textarea
                    name="requests"
                    value={guestDetails.requests}
                    onChange={handleGuestChange}
                    rows="3"
                    className="block px-4 pb-3 pt-6 w-full text-sm text-[var(--color-primary-deep)] bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-accent-gold)] peer font-medium shadow-sm transition-colors hover:border-gray-400 resize-none"
                    placeholder=" "
                  ></textarea>
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[var(--color-accent-gold)] font-['Montserrat'] bg-white px-1">
                    Special Requests (Optional)
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="px-8 border-gray-300 text-gray-500 hover:border-gray-400"
                >
                  <span className="mr-2">←</span> Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                  className="px-10 shadow-md"
                >
                  Review & Confirm <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-['Playfair_Display'] text-[var(--color-primary-deep)] font-bold mb-6 pb-4 border-b border-gray-100 text-center">
                Review Your Booking
              </h2>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8 max-w-2xl mx-auto">
                {/* Room Info Row */}
                <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-100">
                  <img
                    src={room?.imageUrl}
                    alt={room?.roomType}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  />
                  <div>
                    <span className="text-xs text-[var(--color-teal-pop)] font-bold tracking-wider uppercase mb-1 block">
                      {room?.roomType}
                    </span>
                    <h3 className="font-['Playfair_Display'] font-bold text-xl text-[var(--color-primary-deep)] mb-1">
                      {room?.roomType} Room
                    </h3>
                    <p className="text-[var(--color-accent-gold)] font-medium">
                      ${room?.pricePerNight} / night
                    </p>
                  </div>
                </div>

                {/* Split Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
                  {/* Reservation Details */}
                  <div>
                    <h4 className="text-xs text-gray-400 font-['Montserrat'] font-bold tracking-wider uppercase mb-4">
                      Reservation Details
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Check-in</span>
                        <span className="text-[var(--color-primary-deep)] font-medium">
                          {startDate?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Check-out</span>
                        <span className="text-[var(--color-primary-deep)] font-medium">
                          {endDate?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration</span>
                        <span className="text-[var(--color-primary-deep)] font-medium">
                          {nightsCount} Nights
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Guest Info */}
                  <div>
                    <h4 className="text-xs text-gray-400 font-['Montserrat'] font-bold tracking-wider uppercase mb-4">
                      Guest Information
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex flex-col">
                        <span className="text-[var(--color-primary-deep)] font-bold mb-1">
                          {guestDetails.name}
                        </span>
                        <span className="text-gray-500">
                          {guestDetails.phone}
                        </span>
                        <span className="text-gray-500 mt-2 italic leading-relaxed">
                          {guestDetails.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Row */}
                <div className="bg-[rgba(201,168,76,0.05)] rounded-lg p-5 flex items-end justify-between border border-[rgba(201,168,76,0.3)]">
                  <div>
                    <h4 className="text-[var(--color-primary-deep)] font-['Playfair_Display'] font-bold text-xl">
                      Total Due
                    </h4>
                    <span className="text-xs text-gray-500">
                      Taxes & fees included
                    </span>
                  </div>
                  <span className="text-4xl font-bold text-[var(--color-accent-gold)] font-['Playfair_Display']">
                    ${totalCost}
                  </span>
                </div>
              </div>

              {submitError && (
                <p className="text-center text-rose-500 text-sm mb-4 max-w-2xl mx-auto">
                  {submitError}
                </p>
              )}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row justify-between items-center max-w-2xl mx-auto mt-10"
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  className="w-full sm:w-auto mb-4 sm:mb-0 px-8 border-gray-300 text-gray-500 hover:border-gray-400"
                >
                  <span className="mr-2">←</span> Edit Details
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto px-12 shadow-xl animate-pulse bg-gradient-to-r from-[var(--color-accent-gold)] to-[var(--color-teal-pop)]"
                >
                  Confirm & Reserve
                </Button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-6 font-light max-w-md mx-auto">
                By clicking "Confirm & Reserve", you agree to the OceanView
                Hotel Terms of Service and Cancellation Policy.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewReservationPage;
