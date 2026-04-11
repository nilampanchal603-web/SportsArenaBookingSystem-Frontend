import axios from "../../utils/axiosInstance"
import React, { useEffect, useState, useMemo } from "react"
import { toast } from "react-toastify"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts"
import { FiRefreshCw, FiDollarSign } from 'react-icons/fi'

const AdminReports = () => {
    const [bookings, setBookings] = useState([])
    const [revenue, setRevenue] = useState(0)
    const [loading, setLoading] = useState(false)

    const fetchReports = async () => {
        try {
            setLoading(true)
            const [bookingRes, revenueRes] = await Promise.all([
                axios.get("/admin/reports/booking"),
                axios.get("/admin/reports/revenue")
            ])
            const bookingData = bookingRes?.data?.data || bookingRes?.data || []
            const revenueData = revenueRes?.data?.data?.totalRevenue || revenueRes?.data?.totalRevenue || 0
            setBookings(Array.isArray(bookingData) ? bookingData : [])
            setRevenue(revenueData)
        } catch (error) {
            console.log(error)
            if (error?.response?.status === 401) {
                toast.error("Session expired, Please login again")
            } else if (error?.response?.status === 403) {
                toast.error("Access Denied - Admin Only")
            } else {
                toast.error("Unable to fetch reports")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReports()
    }, [])

    const chartData = useMemo(() => {
        const grouped = {}
        bookings.forEach(b => {
            const dateStr = new Date(b.bookingDate || b.createdAt).toLocaleDateString()
            grouped[dateStr] = (grouped[dateStr] || 0) + 1
        })
        return Object.keys(grouped).map(date => ({
            date,
            count: grouped[date]
        }))
    }, [bookings])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">
                    Reports & Analytics
                </h2>
                <button
                    onClick={fetchReports}
                    className="flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2.5 rounded-xl hover:bg-[#1E40AF] hover:shadow-md transition-all font-medium"
                >
                    <FiRefreshCw className={loading ? "animate-spin" : ""} />
                    Refresh Data
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue Card */}
                <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] p-8 flex flex-col justify-center relative overflow-hidden">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-[#2563EB]">
                        <FiDollarSign className="text-3xl" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                        Total Revenue
                    </h3>
                    <p className="text-5xl text-[#0F172A] font-bold">
                        ₹{revenue}
                    </p>
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
                </div>

                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] p-6 h-[320px] min-h-[320px]">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-6">
                        Booking Trends
                    </h3>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Area type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" activeDot={{ r: 6, strokeWidth: 0, fill: '#1E40AF' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="p-6 border-b border-[#E5E7EB]">
                    <h2 className="text-lg font-semibold text-[#0F172A]">Recent Transactions</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#F9FAFB] text-[#6B7280]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Booking Date</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB]">
                            {loading && (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-[#6B7280]">
                                        <FiRefreshCw className="animate-spin text-2xl mx-auto mb-2 text-[#2563EB]" />
                                        Loading reports...
                                    </td>
                                </tr>
                            )}

                            {!loading && bookings.map((booking) => {
                                const status = booking.status || "";
                                const isConfirmed = status.toLowerCase() === "confirmed" || status.toLowerCase() === "approved";
                                const isPending = status.toLowerCase() === "pending";
                                const isRejected = status.toLowerCase() === "rejected";

                                return (
                                    <tr key={booking._id} className="hover:bg-[#F9FAFB] transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0F172A]">
                                            {booking?.userId?.email || booking?.user?.email || "Unknown User"}
                                        </td>
                                        <td className="px-6 py-4 text-[#6B7280]">
                                            {new Date(booking.bookingDate || booking.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                isConfirmed ? "bg-green-100 text-green-800" :
                                                isPending ? "bg-yellow-100 text-yellow-800" :
                                                isRejected ? "bg-red-100 text-red-800" :
                                                "bg-blue-100 text-blue-800"
                                            }`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-[#0F172A]">
                                            ₹{booking.totalAmount || booking.amount || 0}
                                        </td>
                                    </tr>
                                )
                            })}

                            {!loading && bookings.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-[#6B7280]">
                                        No booking report data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminReports