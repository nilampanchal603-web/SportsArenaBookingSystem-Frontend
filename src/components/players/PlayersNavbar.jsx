import React, { useState } from 'react'
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { FiHome, FiMap, FiCalendar, FiCreditCard, FiUser as FiUserIcon, FiLogOut, FiBell, FiUser } from 'react-icons/fi'
import LogoutModal from '../LogoutModal'

export const PlayersNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { name: 'Home', path: '/players/home', icon: <FiHome className="text-xl" /> },
    { name: 'Browse Arenas', path: '/players/arenas', icon: <FiMap className="text-xl" /> },
    { name: 'My Bookings', path: '/players/booking', icon: <FiCalendar className="text-xl" /> },
    { name: 'Payments', path: '/players/payments', icon: <FiCreditCard className="text-xl" /> },
    { name: 'Profile', path: '/players/profile', icon: <FiUserIcon className="text-xl" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0F172A] text-white flex flex-col fixed h-full shadow-xl z-20 transition-all duration-300">
        <div className="p-6 border-b border-[#1F2937]">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Sports<span className="text-[#2563EB]">Arena</span>
            <span className="block text-xs font-normal text-[#6B7280] mt-1 uppercase tracking-widest">Player Panel</span>
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20' 
                    : 'text-[#E5E7EB] hover:bg-[#1F2937] hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[#1F2937]">
          <button 
            onClick={() => setIsLogoutModalOpen(true)} 
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-[#1F2937] hover:text-red-300 rounded-[12px] transition-all duration-200"
          >
            <FiLogOut className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 flex flex-col w-full min-h-screen">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-[#E5E7EB] h-16 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-semibold text-[#0F172A]">
            {navItems.find(item => location.pathname.includes(item.path))?.name || 'Player Dashboard'}
          </h2>
          
          <div className="flex items-center gap-6">
            <button className="text-[#6B7280] hover:text-[#2563EB] transition-colors relative">
              <FiBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-[#E5E7EB]"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-9 h-9 bg-[#E5E7EB] rounded-full flex items-center justify-center text-[#1E40AF] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                <FiUser className="text-lg" />
              </div>
              <span className="text-sm font-medium text-[#1F2937] hidden md:block">Player</span>
            </div>
          </div>
        </header>

        {/* Child Routes Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          
          {/* Dashboard Cards specific to home */}
          {location.pathname === '/players/home' && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-[16px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-[#E5E7EB]">
                <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Browse Arenas</h2>
                <p className="text-[#0F172A] font-medium">Find and book new arenas and slots quickly</p>
              </div>

              <div className="bg-white p-6 rounded-[16px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-[#E5E7EB]">
                <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-2">My Bookings</h2>
                <p className="text-[#0F172A] font-medium">View and manage your current reservations</p>
              </div>

              <div className="bg-white p-6 rounded-[16px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-[#E5E7EB]">
                <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Payments</h2>
                <p className="text-[#0F172A] font-medium">Check transaction history and balances</p>
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-[16px] shadow-sm border border-[#E5E7EB]">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Logout Modal */}
      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onCancel={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </div>
  )
}
