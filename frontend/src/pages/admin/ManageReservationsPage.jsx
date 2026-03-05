import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

// Mock Data
const MOCK_RESERVATIONS = [
  { id: 'UUID-9876-1', guest: 'Sarah Jenkins', room: 'Ocean View Deluxe',  roomNum: '101', checkIn: '2026-10-15', checkOut: '2026-10-20', total: 1500, status: 'CONFIRMED' },
  { id: 'UUID-1234-2', guest: 'Michael Chen', room: 'Ocean Penthouse', roomNum: '801', checkIn: '2027-02-10', checkOut: '2027-02-14', total: 2000, status: 'PENDING' },
  { id: 'UUID-5678-3', guest: 'Elena Gomez', room: 'Luxury Suite', roomNum: '405', checkIn: '2025-05-01', checkOut: '2025-05-05', total: 800, status: 'CHECKED_OUT' },
  { id: 'UUID-4321-4', guest: 'David Smith', room: 'Coral Double', roomNum: '210', checkIn: '2025-01-15', checkOut: '2025-01-18', total: 360, status: 'CANCELLED' },
  { id: 'UUID-9999-5', guest: 'Alice Johnson', room: 'Cozy Single', roomNum: '105', checkIn: '2026-11-01', checkOut: '2026-11-05', total: 320, status: 'CONFIRMED' },
];

const ManageReservationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReservations = MOCK_RESERVATIONS.filter(res => 
    res.guest.toLowerCase().includes(searchTerm.toLowerCase()) || 
    res.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800';
      case 'CONFIRMED': return 'bg-teal-100 text-teal-800';
      case 'CANCELLED': return 'bg-rose-100 text-rose-800';
      case 'CHECKED_OUT': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 fade-up">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primary-deep)] font-['Poppins']">Manage Reservations</h1>
          <p className="text-sm text-gray-500 font-['Poppins']">Track, update, and manage all guest bookings.</p>
        </div>
      </div>

      {/* Filters/Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 fade-up" style={{animationDelay: '100ms'}}>
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by Guest Name or Booking ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-accent-gold)] focus:ring-1 focus:ring-[var(--color-accent-gold)]"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-[var(--color-accent-gold)]">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
          <option>Checked Out</option>
        </select>
        <input type="date" className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-[var(--color-accent-gold)]" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden fade-up" style={{animationDelay: '200ms'}}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Booking ID</th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Guest / Room</th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Dates</th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Total</th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Status</th>
                <th className="py-4 px-6 text-right text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm font-bold text-[var(--color-primary-deep)]">{res.id.split('-').slice(0,2).join('-')}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-800 block">{res.guest}</span>
                    <span className="text-xs text-gray-500">Room {res.roomNum} • {res.room}</span>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <span className="block text-gray-800">{res.checkIn}</span>
                    <span className="text-xs text-gray-400">to {res.checkOut}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-[var(--color-accent-gold)]">${res.total}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(res.status)}`}>
                      {res.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end space-x-2">
                       <button className="p-1.5 text-gray-400 hover:text-[var(--color-teal-pop)] transition-colors rounded-md hover:bg-gray-100" title="View Details">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                       </button>
                       <button className="p-1.5 text-gray-400 hover:text-amber-500 transition-colors rounded-md hover:bg-gray-100" title="Edit Status">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReservations.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No reservations found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filteredReservations.length} of {MOCK_RESERVATIONS.length} results</span>
          <div className="flex space-x-1">
            <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-2 py-1 rounded bg-[var(--color-primary-deep)] text-white">1</button>
            <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

    </AdminLayout>
  );
};

export default ManageReservationsPage;
