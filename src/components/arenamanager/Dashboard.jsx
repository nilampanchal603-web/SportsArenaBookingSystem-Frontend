import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import { FiUsers, FiMapPin, FiBriefcase, FiCalendar, FiDollarSign, FiMessageSquare, FiClock, FiCheckCircle } from 'react-icons/fi'

const Dashboard = () => {
    const [arenaData, setArenaData] = useState({});
    const [bookings, setBookings] = useState([]);
    const [players, setPlayers] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [bookingStats, setBookingStats] = useState([]);

    const [dashboard, setDashboard] = useState({
        totalArenas: 0,
        totalBookings: 0,
        pendingBookings: 0,
        approvedBookings: 0,
        totalRevenue: 0,
        totalCoachEarnings: 0
    })

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [arenaRes, bookingRes, coachRes, feedbackRes] = await Promise.all([
                    axios.get("/arena/allarena"),
                    axios.get("/booking/allbooking"),
                    axios.get("/coach/allcoach"),
                    axios.get("/feedback/allfeedback")
                ])

                const arenas = arenaRes?.data?.data || []
                const bookingList = bookingRes?.data?.data || []
                const coachList = coachRes?.data?.data || []
                const feedbackList = feedbackRes?.data?.data || []

                setArenaData(arenas[0] || {})
                setBookings(bookingList)

                const statsMap = {}
                bookingList.forEach(b => {
                    const d = new Date(b.bookingDate).toLocaleDateString()
                    if (!statsMap[d]) {
                        statsMap[d] = { date: d, bookings: 0, revenue: 0 }
                    }
                    statsMap[d].bookings += 1
                    statsMap[d].revenue += Number(b.totalAmount || 0)
                })
                setBookingStats(Object.values(statsMap))

                setPlayers(
                    bookingList
                        .map((booking) => booking.userId)
                        .filter(Boolean)
                )
                setCoaches(coachList)
                setFeedbacks(feedbackList)
                const pending = bookingList.filter(b =>
                    b.status?.toLowerCase() === "pending"
                ).length

                const approved = bookingList.filter(b =>
                    b.status?.toLowerCase() === "approved" ||
                    b.status?.toLowerCase() === "confirmed"
                ).length

                const revenue = bookingList.reduce(
                    (sum, b) => sum + Number(b.totalAmount || 0),
                    0
                )
                const coachEarning = bookingList.reduce(
                    (sum, b) => sum + Number(b.coachAmount || 0),
                    0
                )

                setDashboard({
                    totalArenas: arenas.length,
                    totalBookings: bookingList.length,
                    pendingBookings: pending,
                    approvedBookings: approved,
                    totalRevenue: revenue,
                    totalCoachEarnings: coachEarning
                })
            } catch (error) {
                console.log("Error loading arena manager dashboard", error)
            }
        }

        fetchDashboardData()
    }, []);
    const statCards = [
        {
            title: "Total Arenas",
            value: dashboard.totalArenas,
            icon: <FiMapPin className="text-2xl text-blue-600" />,
            bg: "bg-blue-50"
        },

        {
            title: "Total Bookings",
            value: dashboard.totalBookings,
            icon: <FiCalendar className="text-2xl text-green-600" />,
            bg: "bg-green-50"
        },

        {
            title: "Pending Bookings",
            value: dashboard.pendingBookings,
            icon: <FiMessageSquare className="text-2xl text-yellow-500" />,
            bg: "bg-yellow-50"
        },

        {
            title: "Approved Bookings",
            value: dashboard.approvedBookings,
            icon: <FiUsers className="text-2xl text-indigo-600" />,
            bg: "bg-indigo-50"
        },

        {
            title: "Total Revenue",
            value: `₹ ${dashboard.totalRevenue}`,
            icon: <FiDollarSign className="text-2xl text-blue-600" />,
            bg: "bg-blue-50"
        },
        {
            title: "Coach Earnings",
            value: `₹ ${dashboard.totalCoachEarnings}`,
            icon: <FiDollarSign className="text-2xl text-green-600" />,
            bg: "bg-green-50"
        },
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-6">
                Overview Status
            </h1>
            {/* Dashboard Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
                {statCards.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group"
                    >
                        <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
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

            {/* Charts Section */}
            <div className="bg-white p-6 rounded-[16px] shadow-sm border border-[#E5E7EB] mb-6">
                <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Bookings & Revenue Overview</h2>
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={bookingStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ color: '#0F172A', fontWeight: 500 }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '14px', color: '#6B7280' }} />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="bookings"
                            name="Total Bookings"
                            stroke="#2563EB"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: '#1E40AF', strokeWidth: 0 }}
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue (₹)"
                            stroke="#10B981"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: '#059669', strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Grid Layout for Lists */}
            <div className="grid lg:grid-cols-3 gap-6 mb-6">

                {/* Bookings Table (Takes 2 columns on large screens) */}
                <div className="lg:col-span-2 bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                    <div className="p-6 border-b border-[#E5E7EB] flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2563EB]">
                            <FiCalendar className="text-xl" />
                        </div>
                        <h2 className="text-lg font-semibold text-[#0F172A]">Recent Bookings</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-[#F9FAFB] text-[#6B7280]">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Player</th>
                                    {/* <th className="px-6 py-4 font-semibold">Slot</th> */}
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E7EB]">
                                {(Array.isArray(bookings) ? bookings : []).slice(0, 5).map((b) => (
                                    <tr key={b._id} className="hover:bg-[#F9FAFB] transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0F172A]">
                                            {b?.userId?.firstName ? `${b.userId.firstName} ${b?.userId?.lastName || ""}` : "N/A"}
                                        </td>
                                        {/* <td className="px-6 py-4 text-[#6B7280]">{b?.slotId?.startTime || "N/A"}</td> */}
                                        <td className="px-6 py-4 text-[#6B7280]">
                                            {b?.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${b?.status?.toLowerCase() === 'confirmed' || b?.status?.toLowerCase() === 'approved'
                                                ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {b?.status || "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Cards Column */}
                <div className="space-y-6">
                    {/* Players & Coaches */}
                    <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB]">
                        <div className="p-5 border-b border-[#E5E7EB] flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#4F46E5]">
                                <FiUsers className="text-xl" />
                            </div>
                            <h2 className="text-lg font-semibold text-[#0F172A]">Active Coaches</h2>
                        </div>
                        <div className="p-5">
                            {(() => {
                                const validCoaches = (Array.isArray(coaches) ? coaches : []).filter(c => c && c.coachName && c.coachName.trim() !== "N/A");
                                return validCoaches.length > 0 ? (
                                    <ul className="space-y-3">
                                        {validCoaches.slice(0, 4).map((c) => (
                                            <li key={c._id} className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#6B7280] text-sm font-bold">
                                                    {c.coachName.charAt(0)}
                                                </div>
                                                <span className="font-medium text-[#0F172A]">{c.coachName}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-[#6B7280] text-sm text-center py-4">No coaches available</p>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Feedback */}
                    <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB]">
                        <div className="p-5 border-b border-[#E5E7EB] flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-[#CA8A04]">
                                <FiMessageSquare className="text-xl" />
                            </div>
                            <h2 className="text-lg font-semibold text-[#0F172A]">Recent Feedback</h2>
                        </div>
                        <div className="p-5">
                            {(Array.isArray(feedbacks) ? feedbacks : []).length > 0 ? (
                                <ul className="space-y-4">
                                    {(Array.isArray(feedbacks) ? feedbacks : []).slice(0, 3).map((f) => (
                                        <li key={f._id} className="bg-[#F9FAFB] p-4 rounded-xl border border-[#E5E7EB]">
                                            <div className="flex justify-between items-center mb-1">
                                                <strong className="text-sm text-[#0F172A]">{f?.userId?.firstName || f?.userId?.email || "Player"}</strong>
                                                <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">{f?.rating || 0} ★</span>
                                            </div>
                                            <p className="text-sm text-[#6B7280] mt-2 italic">"{f?.comments || "No comments"}"</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[#6B7280] text-sm text-center py-4">No recent feedback</p>
                            )}
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default Dashboard;