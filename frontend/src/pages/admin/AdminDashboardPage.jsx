import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 fade-up">
         
         {/* Stat Card 1 */}
         <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
             <div className="w-12 h-12 rounded-lg bg-[rgba(201,168,76,0.1)] text-[var(--color-accent-gold)] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
             </div>
             <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">+12%</span>
           </div>
           <div>
             <h3 className="text-3xl font-bold text-[var(--color-primary-deep)] font-['Poppins']">248</h3>
             <p className="text-xs font-['Poppins'] font-bold tracking-wider uppercase text-gray-500 mt-1">Total Guests</p>
           </div>
         </div>

         {/* Stat Card 2 */}
         <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
             <div className="w-12 h-12 rounded-lg bg-[rgba(0,180,216,0.1)] text-[var(--color-teal-pop)] flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
             </div>
             <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">+5%</span>
           </div>
           <div>
             <h3 className="text-3xl font-bold text-[var(--color-primary-deep)] font-['Poppins']">1,024</h3>
             <p className="text-xs font-['Poppins'] font-bold tracking-wider uppercase text-gray-500 mt-1">Bookings YTD</p>
           </div>
         </div>

         {/* Stat Card 3 */}
         <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
             <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-deep)] text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">+18%</span>
           </div>
           <div>
             <h3 className="text-3xl font-bold text-[var(--color-primary-deep)] font-['Poppins']">$142.5k</h3>
             <p className="text-xs font-['Poppins'] font-bold tracking-wider uppercase text-gray-500 mt-1">Revenue</p>
           </div>
         </div>

         {/* Stat Card 4 */}
         <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
             <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
             </div>
             <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">Steady</span>
           </div>
           <div>
             <h3 className="text-3xl font-bold text-[var(--color-primary-deep)] font-['Poppins']">92%</h3>
             <p className="text-xs font-['Poppins'] font-bold tracking-wider uppercase text-gray-500 mt-1">Occupancy Rate</p>
           </div>
         </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up" style={{animationDelay: '100ms'}}>
        
        {/* Placeholder Chart 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-['Poppins'] font-bold text-[var(--color-primary-deep)] mb-6">Revenue Overview</h3>
          <div className="h-64 flex items-end justify-between px-2 pt-10 border-b border-l border-gray-200 w-full pb-0 relative">
             <div className="w-1/12 bg-[var(--color-primary-deep)] opacity-20 hover:opacity-100 transition-opacity rounded-t-sm" style={{height: '30%'}}></div>
             <div className="w-1/12 bg-[var(--color-primary-deep)] opacity-20 hover:opacity-100 transition-opacity rounded-t-sm" style={{height: '45%'}}></div>
             <div className="w-1/12 bg-[var(--color-primary-deep)] opacity-20 hover:opacity-100 transition-opacity rounded-t-sm" style={{height: '40%'}}></div>
             <div className="w-1/12 bg-[var(--color-primary-deep)] opacity-20 hover:opacity-100 transition-opacity rounded-t-sm" style={{height: '60%'}}></div>
             <div className="w-1/12 bg-[var(--color-primary-deep)] opacity-20 hover:opacity-100 transition-opacity rounded-t-sm" style={{height: '55%'}}></div>
             <div className="w-1/12 bg-[var(--color-primary-deep)] opacity-20 hover:opacity-100 transition-opacity rounded-t-sm" style={{height: '80%'}}></div>
             <div className="w-1/12 bg-[var(--color-primary-deep)] opacity-50 hover:opacity-100 transition-opacity rounded-t-sm" style={{height: '75%'}}></div>
             <div className="w-1/12 bg-[var(--color-accent-gold)] opacity-90 hover:opacity-100 transition-opacity rounded-t-sm shadow-[0_0_15px_rgba(201,168,76,0.5)]" style={{height: '95%'}}></div>
          </div>
          <div className="flex justify-between px-2 mt-4 text-xs font-['Poppins'] text-gray-400 font-bold uppercase tracking-wider">
             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <h3 className="text-lg font-['Poppins'] font-bold text-[var(--color-primary-deep)] mb-6">Recent Activity</h3>
           <div className="space-y-6">
             
             <div className="flex items-start">
               <div className="w-8 h-8 rounded-full bg-[rgba(0,180,216,0.1)] text-[var(--color-teal-pop)] flex items-center justify-center mr-4 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               </div>
               <div>
                 <p className="text-sm text-gray-800 font-medium">New booking for <span className="font-bold text-[var(--color-primary-deep)]">Ocean Penthouse</span></p>
                 <span className="text-xs text-gray-500 font-medium">by John Doe • 2 mins ago</span>
               </div>
             </div>

             <div className="flex items-start">
               <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.1)] text-[var(--color-accent-gold)] flex items-center justify-center mr-4 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <p className="text-sm text-gray-800 font-medium">Payment received for <span className="font-bold text-[var(--color-primary-deep)]">UUID-9876-1</span></p>
                 <span className="text-xs text-gray-500 font-medium">15 mins ago</span>
               </div>
             </div>

             <div className="flex items-start">
               <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mr-4 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </div>
               <div>
                 <p className="text-sm text-gray-800 font-medium">Cancellation request <span className="font-bold text-[var(--color-primary-deep)]">UUID-4432-1</span></p>
                 <span className="text-xs text-gray-500 font-medium">1 hour ago</span>
               </div>
             </div>

             <div className="flex items-start">
               <div className="w-8 h-8 rounded-full bg-[var(--color-primary-deep)] text-white flex items-center justify-center mr-4 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
               </div>
               <div>
                 <p className="text-sm text-gray-800 font-medium">Guest <span className="font-bold text-[var(--color-primary-deep)]">Jane Smith</span> checked in</p>
                 <span className="text-xs text-gray-500 font-medium">3 hours ago</span>
               </div>
             </div>

           </div>
           <button className="w-full mt-6 py-2 text-sm font-['Poppins'] font-bold tracking-wider uppercase text-[var(--color-teal-pop)] hover:bg-[rgba(0,180,216,0.05)] rounded-lg transition-colors">
              View All Activity
           </button>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
