import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { name: 'Dashboard', path: '/admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Rooms', path: '/admin/rooms', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Reservations', path: '/admin/reservations', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Guests', path: '/admin/guests', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Settings', path: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex">
      
      {/* Sidebar Focus Layer Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 xl:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-primary-deep)] text-white z-30 transform transition-transform duration-300 xl:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:relative border-r border-white/10`}>
        <div className="h-full flex flex-col">
           {/* Branding */}
           <div className="p-6 h-20 flex items-center justify-center border-b border-white/10">
             <Link to="/admin" className="flex items-center space-x-2 w-full justify-center">
                <span className="text-2xl text-[var(--color-accent-gold)] font-serif mb-1">〰️</span>
                <span className="text-xl font-['Poppins'] font-bold drop-shadow-md tracking-wider">
                  OceanView
                </span>
             </Link>
           </div>
           
           {/* User Info */}
           <div className="px-6 py-8 flex flex-col items-center">
             <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-accent-gold)] mb-3">
               <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D2B4E&color=C9A84C&rounded=true&bold=true" alt="Admin" className="w-full h-full object-cover" />
             </div>
             <div className="text-center">
               <span className="block text-sm font-semibold tracking-wide font-['Poppins']">ADMIN PORTAL</span>
               <span className="text-xs text-[var(--color-accent-light)] flex items-center justify-center mt-1">
                 <span className="w-2 h-2 rounded-full bg-[var(--color-teal-pop)] mr-1.5"></span>
                 System Online
               </span>
             </div>
           </div>

           {/* Navigation Links */}
           <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
             {NAV_LINKS.map((link) => {
               const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
               return (
                 <Link 
                   key={link.name} 
                   to={link.path}
                   className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-['Poppins'] text-sm tracking-wide ${isActive ? 'bg-[rgba(201,168,76,0.15)] text-[var(--color-accent-gold)] font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                 >
                   <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} /></svg>
                   <span>{link.name}</span>
                 </Link>
               );
             })}
           </nav>

           {/* Logout */}
           <div className="p-4 border-t border-white/10">
             <Link to="/login" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-rose-400 transition-colors">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
               <span className="text-sm font-['Poppins'] font-bold tracking-wide">Secure Logout</span>
             </Link>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-20 bg-white shadow-sm border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-[var(--color-primary-deep)] focus:outline-none xl:hidden mr-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h2 className="text-xl font-['Poppins'] font-bold text-[var(--color-primary-deep)] hidden sm:block">
               {NAV_LINKS.find(link => location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path)))?.name || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
             {/* Search */}
             <div className="relative hidden md:block">
               <input 
                 type="text" 
                 placeholder="Search bookings..." 
                 className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-accent-gold)] focus:ring-1 focus:ring-[var(--color-accent-gold)] bg-gray-50"
               />
               <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
             
             {/* Notifications */}
             <button className="relative p-2 text-gray-500 hover:text-[var(--color-primary-deep)] transition-colors">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
               <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
             </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
