import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from '../../utils/axiosInstance'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { FiHome, FiCalendar, FiClock, FiDollarSign, FiLogOut, FiBell, FiUser, FiUsers, FiCheckCircle } from 'react-icons/fi'
import LogoutModal from '../LogoutModal'

export const CoachNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const [dashboard, setDashboard] = useState({
    totalSessions: 0,
    totalEarnings: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    totalPlayers: 0
  })

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/coach/dashboard")
        setDashboard(res?.data?.data || {})
      } catch (error) {
        console.log("Error fetching coach dashboard", error)
      }
    }
    fetchDashboard()
  }, [])
  const statCards = [
    {
      title: "Total Sessions",
      value: dashboard.totalSessions,
      icon: <FiCalendar className="text-2xl text-blue-600" />,
      bg: "bg-blue-50"
    },

    

    {
      title: "Pending Requests",
      value: dashboard.pendingRequests,
      icon: <FiClock className="text-2xl text-yellow-500" />,
      bg: "bg-yellow-50"
    },

    {
      title: "Approved Requests",
      value: dashboard.approvedRequests,
      icon: <FiCheckCircle className="text-2xl text-indigo-600" />,
      bg: "bg-indigo-50"
    },

    {
      title: "Total Players",
      value: dashboard.totalPlayers,
      icon: <FiUsers className="text-2xl text-purple-600" />,
      bg: "bg-purple-50"
    }
  ]

  const navItems = [
    { name: 'Dashboard', path: '/coach/dashboard', icon: <FiHome className="text-xl" /> },
    { name: 'My Sessions', path: '/coach/mysession', icon: <FiCalendar className="text-xl" /> },
    { name: 'Requests', path: '/coach/request', icon: <FiClock className="text-xl" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0F172A] text-white flex flex-col fixed h-full shadow-xl z-20 transition-all duration-300">
        <div className="p-6 border-b border-[#1F2937]">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Sports<span className="text-[#2563EB]">Arena</span>
            <span className="block text-xs font-normal text-[#6B7280] mt-1 uppercase tracking-widest">Coach Panel</span>
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all duration-200 ${isActive
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
            {navItems.find(item => location.pathname.includes(item.path))?.name || 'Coach Dashboard'}
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
              <span className="text-sm font-medium text-[#1F2937] hidden md:block">Coach</span>
            </div>
          </div>
        </header>

        {/* Child Routes Content */}
        <main className="flex-1 p-8 overflow-y-auto">

          {/* Dashboard specific content */}
          {location.pathname === '/coach/dashboard' && (
            <>
              {/* Dashboard Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                {statCards.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center"
                  >
                    <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center mb-4`}>
                      {stat.icon}
                    </div>

                    <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider text-center">
                      {stat.title}
                    </h3>

                    <p className="text-2xl text-[#0F172A] font-bold mt-2">
                      {stat.value || 0}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white p-6 rounded-[16px] shadow-sm border border-[#E5E7EB] h-[350px] min-h-[350px] mb-8">
                <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Coach Overview Metrics</h2>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={[
                    { name: "Sessions", count: dashboard.totalSessions || 0 },
                    { name: "Pending", count: dashboard.pendingRequests || 0 },
                    { name: "Approved", count: dashboard.approvedRequests || 0 },
                    { name: "Players", count: dashboard.totalPlayers || 0 },
                  
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dx={-10} />
                    <Tooltip cursor={{ fill: '#F9FAFB' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                    <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
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
