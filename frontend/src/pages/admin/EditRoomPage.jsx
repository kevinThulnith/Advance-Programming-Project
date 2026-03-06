import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/common/Button";
import { api } from "../../api/client";

const ROOM_TYPES = ["SINGLE", "DOUBLE", "SUITE", "DELUXE", "PENTHOUSE"];

const EditRoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomNumber: "",
    roomType: "SINGLE",
    floor: "",
    maxOccupancy: "",
    pricePerNight: "",
    description: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    api
      .get(`/rooms/${id}`, false)
      .then((data) => {
        setForm({
          roomNumber: data.roomNumber || "",
          roomType: data.roomType || "SINGLE",
          floor: data.floor ?? "",
          maxOccupancy: data.maxOccupancy ?? "",
          pricePerNight: data.pricePerNight ?? "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
        });
      })
      .catch((err) => setFetchError(err.message || "Failed to load room."))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.roomNumber.trim())
      newErrors.roomNumber = "Room number is required.";
    if (!form.floor || Number(form.floor) < 1)
      newErrors.floor = "Floor must be at least 1.";
    if (!form.maxOccupancy || Number(form.maxOccupancy) < 1)
      newErrors.maxOccupancy = "Max occupancy must be at least 1.";
    if (!form.pricePerNight || Number(form.pricePerNight) <= 0)
      newErrors.pricePerNight = "Price must be greater than 0.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setSubmitError("");
    try {
      await api.put(`/rooms/${id}`, {
        roomNumber: form.roomNumber.trim(),
        roomType: form.roomType,
        floor: Number(form.floor),
        maxOccupancy: Number(form.maxOccupancy),
        pricePerNight: Number(form.pricePerNight),
        description: form.description.trim() || null,
        imageUrl: form.imageUrl.trim() || null,
      });
      navigate("/admin/rooms");
    } catch (err) {
      setSubmitError(err.message || "Failed to update room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-32 text-[var(--color-accent-gold)] font-['Poppins']">
          Loading room…
        </div>
      </AdminLayout>
    );
  }

  if (fetchError) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <p className="text-rose-500 font-['Poppins']">{fetchError}</p>
          <Link to="/admin/rooms">
            <Button variant="ghost" size="sm">
              ← Back to Rooms
            </Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 fade-up">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-400 font-['Poppins'] mb-1">
            <Link
              to="/admin/rooms"
              className="hover:text-[var(--color-accent-gold)] transition-colors"
            >
              Rooms
            </Link>
            <span>/</span>
            <span className="text-[var(--color-primary-deep)] font-semibold">
              Edit Room {form.roomNumber}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-primary-deep)] font-['Poppins']">
            Edit Room
          </h1>
          <p className="text-sm text-gray-500 font-['Poppins']">
            Update the details for room {form.roomNumber}.
          </p>
        </div>
        <Link to="/admin/rooms">
          <Button
            variant="ghost"
            size="sm"
            className="border-gray-200 text-gray-500"
          >
            ← Back to Rooms
          </Button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="fade-up"
        style={{ animationDelay: "100ms" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-base font-bold text-[var(--color-primary-deep)] font-['Poppins'] mb-5 pb-3 border-b border-gray-100">
                Room Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Room Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 font-['Poppins'] uppercase tracking-wider mb-1.5">
                    Room Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={form.roomNumber}
                    onChange={handleChange}
                    placeholder="e.g. 101"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all ${errors.roomNumber ? "border-rose-400 bg-rose-50" : "border-gray-200"}`}
                  />
                  {errors.roomNumber && (
                    <p className="text-rose-500 text-xs mt-1">
                      {errors.roomNumber}
                    </p>
                  )}
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 font-['Poppins'] uppercase tracking-wider mb-1.5">
                    Room Type <span className="text-rose-400">*</span>
                  </label>
                  <select
                    name="roomType"
                    value={form.roomType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all bg-white"
                  >
                    {ROOM_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Floor */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 font-['Poppins'] uppercase tracking-wider mb-1.5">
                    Floor <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="floor"
                    value={form.floor}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g. 3"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all ${errors.floor ? "border-rose-400 bg-rose-50" : "border-gray-200"}`}
                  />
                  {errors.floor && (
                    <p className="text-rose-500 text-xs mt-1">{errors.floor}</p>
                  )}
                </div>

                {/* Max Occupancy */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 font-['Poppins'] uppercase tracking-wider mb-1.5">
                    Max Occupancy <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="maxOccupancy"
                    value={form.maxOccupancy}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g. 2"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all ${errors.maxOccupancy ? "border-rose-400 bg-rose-50" : "border-gray-200"}`}
                  />
                  {errors.maxOccupancy && (
                    <p className="text-rose-500 text-xs mt-1">
                      {errors.maxOccupancy}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-600 font-['Poppins'] uppercase tracking-wider mb-1.5">
                    Price Per Night ($) <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      name="pricePerNight"
                      value={form.pricePerNight}
                      onChange={handleChange}
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      className={`w-full pl-8 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all ${errors.pricePerNight ? "border-rose-400 bg-rose-50" : "border-gray-200"}`}
                    />
                  </div>
                  {errors.pricePerNight && (
                    <p className="text-rose-500 text-xs mt-1">
                      {errors.pricePerNight}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-base font-bold text-[var(--color-primary-deep)] font-['Poppins'] mb-5 pb-3 border-b border-gray-100">
                Description
              </h2>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the room's features, view, and amenities..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all resize-none"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image URL */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-base font-bold text-[var(--color-primary-deep)] font-['Poppins'] mb-5 pb-3 border-b border-gray-100">
                Room Image
              </h2>
              <div>
                <label className="block text-xs font-bold text-gray-600 font-['Poppins'] uppercase tracking-wider mb-1.5">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] transition-all"
                />
              </div>
              {form.imageUrl ? (
                <div className="mt-4 rounded-lg overflow-hidden h-40 border border-gray-100">
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="mt-4 rounded-lg h-40 border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <span className="text-gray-300 text-sm font-['Poppins']">
                    Image preview
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              {submitError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-sm">
                  {submitError}
                </div>
              )}
              <Button
                type="submit"
                size="full"
                className="shadow-md mb-3"
                disabled={loading}
              >
                {loading ? "Saving…" : "Save Changes"}
              </Button>
              <Link to="/admin/rooms">
                <Button
                  type="button"
                  variant="ghost"
                  size="full"
                  className="border-gray-200 text-gray-500"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditRoomPage;
