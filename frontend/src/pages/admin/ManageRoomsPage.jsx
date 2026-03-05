import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Button from '../../components/common/Button';

// Mock Data
const MOCK_ROOMS = [
  { id: 1, type: 'Deluxe', name: 'Ocean View Deluxe', price: 300, maxOccupancy: 3, floor: 5, available: true, status: 'Clean' },
  { id: 2, type: 'Suite', name: 'Luxury Suite', price: 200, maxOccupancy: 2, floor: 4, available: false, status: 'Occupied' },
  { id: 3, type: 'Penthouse', name: 'Ocean Penthouse', price: 500, maxOccupancy: 4, floor: 8, available: true, status: 'Maintenance' },
  { id: 4, type: 'Double', name: 'Coral Double', price: 120, maxOccupancy: 2, floor: 2, available: true, status: 'Clean' },
  { id: 5, type: 'Single', name: 'Cozy Single', price: 80, maxOccupancy: 1, floor: 1, available: true, status: 'Clean' },
];

const ManageRoomsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = MOCK_ROOMS.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 fade-up">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primary-deep)] font-['Poppins']">Manage Rooms</h1>
          <p className="text-sm text-gray-500 font-['Poppins']">View, edit, and add property rooms.</p>
        </div>
        <Button size="sm" className="shadow-md">
          <span className="mr-2">+</span> Add New Room
        </Button>
      </div>

      {/* Filters/Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 fade-up" style={{animationDelay: '100ms'}}>
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by room name or type..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-accent-gold)] focus:ring-1 focus:ring-[var(--color-accent-gold)]"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-[var(--color-accent-gold)]">
          <option>All Statuses</option>
          <option>Available</option>
          <option>Occupied</option>
          <option>Maintenance</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:border-[var(--color-accent-gold)]">
          <option>All Types</option>
          <option>Deluxe</option>
          <option>Suite</option>
          <option>Penthouse</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden fade-up" style={{animationDelay: '200ms'}}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Room Info</th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Type / Floor</th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Rate</th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Availability</th>
                <th className="py-4 px-6 text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Status</th>
                <th className="py-4 px-6 text-right text-xs font-['Poppins'] font-bold tracking-wider text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-[var(--color-primary-deep)] text-sm mr-3">
                        {room.id}
                      </div>
                      <div>
                        <span className="font-bold text-[var(--color-primary-deep)] block">{room.name}</span>
                        <span className="text-xs text-gray-500">Max {room.maxOccupancy} Guests</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-800 block">{room.type}</span>
                    <span className="text-xs text-gray-500">Floor {room.floor}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-[var(--color-accent-gold)]">${room.price}</span>
                    <span className="text-xs text-gray-400">/night</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${room.available ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'}`}>
                      {room.available ? 'Available' : 'Booked'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                     <span className={`text-sm font-medium ${
                       room.status === 'Clean' ? 'text-green-600' : 
                       room.status === 'Maintenance' ? 'text-amber-500' : 
                       'text-blue-500'
                     }`}>
                       {room.status}
                     </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end space-x-2">
                       <button className="p-1.5 text-gray-400 hover:text-[var(--color-teal-pop)] transition-colors rounded-md hover:bg-gray-100" title="Edit">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                       </button>
                       <button className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors rounded-md hover:bg-gray-100" title="Delete">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRooms.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No rooms found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filteredRooms.length} of {MOCK_ROOMS.length} results</span>
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

export default ManageRoomsPage;
