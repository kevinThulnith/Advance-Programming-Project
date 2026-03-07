import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { api } from "../../api/client";

const STATUSES = [
  "All Statuses",
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "CHECKED_OUT",
];

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-100 text-amber-800";
    case "CONFIRMED":
      return "bg-teal-100 text-teal-800";
    case "CANCELLED":
      return "bg-rose-100 text-rose-800";
    case "CHECKED_OUT":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// ── Detail Modal ─────────────────────────────────────────────────────────────
const ReservationModal = ({ res, onClose, onStatusChange, onDelete }) => {
  const [status, setStatus] = useState(res.status);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleStatusSave = async () => {
    if (status === res.status) {
      onClose();
      return;
    }
    setSaving(true);
    setError("");
    try {
      const updated = await api.patch(
        `/reservations/${res.id}/status?status=${status}`,
      );
      onStatusChange(updated);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update status.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this reservation? This cannot be undone."))
      return;
    setDeleting(true);
    try {
      await api.delete(`/reservations/${res.id}`);
      onDelete(res.id);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete reservation.");
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[var(--color-primary-deep)]">
          <div>
            <h2 className="text-lg font-bold text-white font-['Poppins']">
              Reservation Details
            </h2>
            <p className="text-xs text-gray-300 font-mono mt-0.5">
              {res.reservationNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-4 text-sm">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Guest Name
              </span>
              <p className="text-gray-800 font-semibold mt-0.5">
                {res.guestName}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Contact
              </span>
              <p className="text-gray-800 mt-0.5">{res.contactNumber}</p>
            </div>
            <div className="col-span-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Address
              </span>
              <p className="text-gray-800 mt-0.5">{res.guestAddress}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Room
              </span>
              <p className="text-gray-800 font-semibold mt-0.5">
                {res.room?.roomType} — Room {res.room?.roomNumber}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Username
              </span>
              <p className="text-gray-800 mt-0.5">{res.username}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Check-in
              </span>
              <p className="text-gray-800 mt-0.5">{res.checkInDate}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Check-out
              </span>
              <p className="text-gray-800 mt-0.5">{res.checkOutDate}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Total Cost
              </span>
              <p className="text-[var(--color-accent-gold)] font-bold text-lg mt-0.5">
                ${res.totalCost}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Created
              </span>
              <p className="text-gray-800 mt-0.5">
                {new Date(res.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Status Change */}
          <div className="pt-3 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)] bg-white"
            >
              {STATUSES.slice(1).map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-rose-500 hover:bg-rose-50 border border-rose-200 transition-colors disabled:opacity-50 font-['Poppins']"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            {deleting ? "Deleting…" : "Delete"}
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-500 hover:bg-gray-100 border border-gray-200 transition-colors font-['Poppins']"
            >
              Cancel
            </button>
            <button
              onClick={handleStatusSave}
              disabled={saving}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-[var(--color-primary-deep)] hover:opacity-90 transition-opacity disabled:opacity-50 font-['Poppins']"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ────────────────────────────────────────────────────────────────
const ManageReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selectedRes, setSelectedRes] = useState(null);

  const fetchReservations = useCallback(() => {
    api
      .get("/reservations")
      .then((data) => setReservations(data))
      .catch((err) => setError(err.message || "Failed to load reservations."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleStatusChange = (updated) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r)),
    );
  };

  const handleDelete = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = reservations.filter((res) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      res.guestName?.toLowerCase().includes(term) ||
      res.reservationNumber?.toString().toLowerCase().includes(term) ||
      res.username?.toLowerCase().includes(term);
    const matchStatus =
      statusFilter === "All Statuses" || res.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      {selectedRes && (
        <ReservationModal
          res={selectedRes}
          onClose={() => setSelectedRes(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 fade-up">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primary-deep)] font-['Poppins']">
            Manage Reservations
          </h1>
          <p className="text-sm text-gray-500 font-['Poppins']">
            Track, update, and manage all guest bookings.
          </p>
        </div>
      </div>

      {/* Filters/Search Bar */}
      <div
        className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 fade-up"
        style={{ animationDelay: "100ms" }}
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by guest name, username, or booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-accent-gold)] focus:ring-1 focus:ring-[var(--color-accent-gold)]"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-[var(--color-accent-gold)]"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden fade-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">
                  Booking ID
                </th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">
                  Guest / Room
                </th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">
                  Dates
                </th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">
                  Total
                </th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">
                  Status
                </th>
                <th className="py-4 px-6 text-right text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-gray-400 font-['Poppins']"
                  >
                    Loading reservations…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-rose-500 font-['Poppins']"
                  >
                    {error}
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No reservations found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((res) => (
                  <tr
                    key={res.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs font-bold text-[var(--color-primary-deep)] block">
                        #{res.id}
                      </span>
                      <span className="font-mono text-[10px] text-gray-400">
                        {String(res.reservationNumber).slice(0, 8)}…
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-gray-800 block">
                        {res.guestName}
                      </span>
                      <span className="text-xs text-gray-500">
                        Room {res.room?.roomNumber} • {res.room?.roomType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <span className="block text-gray-800">
                        {res.checkInDate}
                      </span>
                      <span className="text-xs text-gray-400">
                        to {res.checkOutDate}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-[var(--color-accent-gold)]">
                        ${res.totalCost}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(res.status)}`}
                      >
                        {res.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setSelectedRes(res)}
                          className="p-1.5 text-gray-400 hover:text-[var(--color-teal-pop)] transition-colors rounded-md hover:bg-gray-100"
                          title="View Details"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>
            Showing {filtered.length} of {reservations.length} reservations
          </span>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageReservationsPage;
