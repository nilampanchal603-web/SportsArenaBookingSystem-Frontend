import axios from "../../utils/axiosInstance"
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { FiUsers, FiMapPin, FiBriefcase, FiCalendar, FiDollarSign, FiMessageSquare } from 'react-icons/fi'

export const Admindata = () => {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalArenas: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalCoaches: 0,
    totalRequests: 0
  })

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/admin/dashboard")
        setDashboard(res?.data?.data || {})
      } catch (error) {
        console.log("dashboard error", error)
      }
    }
    fetchDashboard()
  }, [])

  const statCards = [
    { title: "Total Users", value: dashboard.totalUsers, icon: <FiUsers className="text-2xl text-[#2563EB]" />, bg: "bg-blue-50" },
    { title: "Total Arenas", value: dashboard.totalArenas, icon: <FiMapPin className="text-2xl text-[#1E40AF]" />, bg: "bg-indigo-50" },
    { title: "Total Coaches", value: dashboard.totalCoaches, icon: <FiBriefcase className="text-2xl text-[#2563EB]" />, bg: "bg-blue-50" },
    { title: "Total Bookings", value: dashboard.totalBookings, icon: <FiCalendar className="text-2xl text-green-600" />, bg: "bg-green-50" },
    { title: "Total Revenue", value: `₹ ${dashboard.totalRevenue || 0}`, icon: <FiDollarSign className="text-2xl text-[#2563EB]" />, bg: "bg-blue-50" },
    { title: "Total Requests", value: dashboard.totalRequests, icon: <FiMessageSquare className="text-2xl text-red-500" />, bg: "bg-red-50" }
  ]

  return (
    <div className="space-y-8">
      
      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider text-center">{stat.title}</h3>
            <p className="text-2xl text-[#0F172A] font-bold mt-2">{stat.value || 0}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-[16px] shadow-sm border border-[#E5E7EB] h-[450px]">
        <h3 className="text-xl font-semibold text-[#0F172A] mb-6">Platform Overview</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={[
            { name: "Users", count: dashboard.totalUsers || 0 },
            { name: "Arenas", count: dashboard.totalArenas || 0 },
            { name: "Coaches", count: dashboard.totalCoaches || 0 },
            { name: "Bookings", count: dashboard.totalBookings || 0 },
            { name: "Requests", count: dashboard.totalRequests || 0 }
          ]} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontWeight: 500 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontWeight: 500 }} />
            <Tooltip 
              cursor={{ fill: '#F9FAFB' }}
              contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '12px' }}
              itemStyle={{ color: '#0F172A', fontWeight: 600 }}
            />
            <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
