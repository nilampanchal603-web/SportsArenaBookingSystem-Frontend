import React, { useState } from 'react'
import axios from "../../utils/axiosInstance";
import { Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FiEdit2, FiX, FiPlus, FiMessageSquare } from "react-icons/fi"

const ManageBooking = () => {
    const [bookings, setBooking] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);

    const getAllBooking = async (data) => {
        try {
            const res = await axios.get("/booking/allbooking", data)
            const storedUser = localStorage.getItem("user");
            let myBookings = res.data.data || [];

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                myBookings = myBookings.filter(b => b.userId?._id === parsedUser.id);
            }
            setBooking(myBookings)

        } catch (error) {
            console.log("Error fetching booking", error)
        }
    };

    const deleteBooking = async (id) => {
        try {
            await axios.delete(`/booking/deletebooking/${id}`);
            toast.success("Booking Deleted ✅");
            getAllBooking();
        } catch (error) {
            console.error(error);
            toast.error("Delete failed ❌");
        }
    };

    useEffect(() => {
        if (location.state?.updatedBooking) {
            setBooking((prev) =>
                prev.map((booking) =>
                    booking._id === location.state.id
                        ? { ...booking, ...location.state.updatedBooking }
                        : booking
                )
            );
        }
    }, [location.state]);

    useEffect(() => {
        if (location.state?.refresh || (!location.state)) {
            getAllBooking();
        }
        if (location.state?.submittedFeedbackBookingId) {
            setSubmittedFeedbacks((prev) => [...prev, location.state.submittedFeedbackBookingId]);
        }
    }, [location.state]);

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">My Bookings</h2>

                <div className="flex items-center gap-3">
                    <button
                        onClick={getAllBooking}
                        className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm"
                    >
                        Refresh List
                    </button>
                    <button
                        onClick={() => navigate("/players/booking/addbooking", {
                            state: {
                                pricePerHour: bookings[0]?.arenaId?.pricePerHour || 500,
                                arenaId: bookings[0]?.arenaId?._id,
                                sportType: bookings[0]?.arenaId?.sportType || "General"
                            }
                        })}
                        className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                    >
                        <FiPlus /> New Booking
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#F9FAFB] text-[#6B7280]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">User Details</th>
                                <th className="px-6 py-4 font-semibold">Slot Time</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#E5E7EB]">
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-[#F9FAFB] transition-colors">

                                        <td className="px-6 py-4">
                                            {booking.userId ? (
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-[#0F172A]">
                                                        {booking.userId.firstName} {booking.userId.lastName}
                                                    </span>
                                                    <span className="text-xs text-[#6B7280] truncate max-w-[120px]" title={booking.userId._id}>
                                                        {booking.userId._id}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-[#9CA3AF]">-</span>
                                            )}
                                        </td>
                                        {/* <td className="px-6 py-4">
                                            {booking.slotId?.slots?.length > 0 ? (
                                                <div className="flex flex-col gap-1">
                                                    {booking.slotId.slots.map((slot) => (
                                                        <span key={slot._id} className="bg-[#F3F4F6] text-[#374151] px-2 py-0.5 rounded-md text-xs font-medium border border-[#E5E7EB] inline-block whitespace-nowrap">
                                                            {slot.startTime} - {slot.endTime}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-[#9CA3AF]">-</span>
                                            )}
                                        </td> */}
                                        <td className="px-6 py-4">
                                            {booking.slotId ? (
                                                `${booking.slotId.slotTime} - ${booking.slotId.endTime}`
                                            ) : (
                                                <span className="text-[#9CA3AF]">Slot not assigned yet</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-[#6B7280] whitespace-nowrap">
                                            {new Date(booking.bookingDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${booking.status === "confirmed" ? "bg-green-100 text-green-800"
                                                    : booking.status === "cancelled" ? "bg-red-100 text-red-800"
                                                        : booking.status === "coach_assigned" ? "bg-[#EFF6FF] text-[#1E40AF]"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {booking.status.replace("_", " ")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-[#059669]">
                                            ₹{booking.totalAmount}
                                        </td>

                                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">

                                            {(booking.status === "pending" || booking.status === "booked") && (
                                                <>
                                                    <button
                                                        onClick={() => navigate(`/players/booking/updatebooking/${booking._id}`)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEF3C7] text-[#B45309] hover:bg-[#FDE68A] transition-colors"
                                                    >
                                                        <FiEdit2 /> Update
                                                    </button>

                                                    <button
                                                        onClick={() => deleteBooking(booking._id)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors"
                                                    >
                                                        <FiX /> Cancel
                                                    </button>
                                                </>
                                            )}

                                            {booking.status === "confirmed" && (
                                                submittedFeedbacks.includes(booking._id) ? (
                                                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700">
                                                        ✅ Feedback Submitted
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => navigate(`/players/addfeedback`, { state: { 
                                                            userId: booking.userId?._id,
                                                            arenaId: booking.arenaId?._id,
                                                            coachId: booking.coachId?._id || "",
                                                            from: "/players/booking",
                                                            bookingId: booking._id
                                                        } })}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#EFF6FF] text-[#1E40AF] hover:bg-[#DBEAFE] transition-colors"
                                                    >
                                                        <FiMessageSquare /> Give Feedback
                                                    </button>
                                                )
                                            )}

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-[#6B7280]">
                                        No bookings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default ManageBooking
