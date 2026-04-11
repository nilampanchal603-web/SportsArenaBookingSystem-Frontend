import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { FiCheck, FiX, FiUserPlus } from "react-icons/fi";

const BookingRequests = () => {
    const [requests, setRequests] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [selectedCoachMap, setSelectedCoachMap] = useState({});

    useEffect(() => {
        axios.get("/booking/allbooking")
            .then((res) => setRequests(res.data.data || []))
            .catch((err) => console.error(err));

        axios.get("/coach/allcoach")
            .then((res) => setCoaches(res.data.data || []))
            .catch((err) => console.error(err));
    }, []);

    const handleAssignCoach = (id) => {
        const coachId = selectedCoachMap[id];
        if (!coachId) {
            toast.error("Please select a coach first");
            return;
        }
        axios.put(`/booking/updatebooking/${id}`, { status: "coach_assigned", coachId: coachId })
            .then(() => {
                setRequests((prev) =>
                    prev.map((r) => (r._id === id ? { ...r, status: "coach_assigned", coachId } : r))
                );
            })
            .catch((err) => console.error(err));
    };

    const handleApprove = (id) => {
        axios.put(`/booking/updatebooking/${id}`, { status: "confirmed" })
            .then(() => {
                setRequests((prev) =>
                    prev.map((r) => (r._id === id ? { ...r, status: "confirmed" } : r))
                );
            })
            .catch((err) => console.error(err));
    };

    const handleDecline = (id) => {
        axios.put(`/booking/updatebooking/${id}`, { status: "cancelled" })
            .then(() => {
                setRequests((prev) =>
                    prev.map((r) => (r._id === id ? { ...r, status: "cancelled" } : r))
                );
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#0F172A]">
                    Booking Requests
                </h2>
                <span className="px-3 py-1 bg-[#EFF6FF] text-[#2563EB] rounded-full text-sm font-semibold border border-[#BFDBFE]">
                    Total Requests: {requests.length}
                </span>
            </div>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="overflow-x-auto">
                    {requests.length > 0 ? (
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-[#F9FAFB] text-[#6B7280]">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Player</th>
                                    <th className="px-6 py-4 font-semibold">Slot Details</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Assign Coach</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#E5E7EB]">
                                {requests.map((r) => (
                                    <tr key={r._id} className="hover:bg-[#F9FAFB] transition-colors">

                                        <td className="px-6 py-4 font-medium text-[#0F172A]">
                                            {r.userId?.firstName} {r.userId?.lastName}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {r.slotId
                                                    ? `${r.slotId.slotTime} - ${r.slotId.endTime}`
                                                    : "-"
                                                }
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-[#6B7280]">
                                            {new Date(r.bookingDate).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            {r.status === "pending" ? (
                                                <select
                                                    className="w-full min-w-[140px] border border-[#D1D5DB] rounded-lg px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none text-[#0F172A]"
                                                    value={selectedCoachMap[r._id] || ""}
                                                    onChange={(e) => setSelectedCoachMap(prev => ({ ...prev, [r._id]: e.target.value }))}
                                                >
                                                    <option value="">Select Coach...</option>
                                                    {coaches.map(c => (
                                                        <option key={c._id} value={c._id}>{c.coachName} - {c.sportType}</option>
                                                    ))}
                                                </select>
                                            ) : r.coachId ? (
                                                <span className="text-sm font-semibold text-[#10B981]">
                                                    {coaches.find(c => c._id === r.coachId)?.coachName || "Assigned"}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-[#9CA3AF]">-</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${r.status === "confirmed" ? "bg-green-100 text-green-800"
                                                    : r.status === "cancelled" ? "bg-red-100 text-red-800"
                                                        : r.status === "coach_assigned" ? "bg-blue-100 text-blue-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {r.status.replace("_", " ")}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            {r.status === "pending" ? (
                                                <div className="flex justify-end items-center gap-2">
                                                    <button
                                                        onClick={() => handleAssignCoach(r._id)}
                                                        className="inline-flex items-center justify-center p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] transition-colors shadow-sm"
                                                        title="Assign Coach"
                                                    >
                                                        <FiUserPlus />
                                                    </button>
                                                    <button
                                                        onClick={() => handleApprove(r._id)}
                                                        className="inline-flex items-center justify-center p-2 rounded-lg bg-[#D1FAE5] text-[#059669] hover:bg-[#A7F3D0] transition-colors shadow-sm"
                                                        title="Confirm Booking"
                                                    >
                                                        <FiCheck />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDecline(r._id)}
                                                        className="inline-flex items-center justify-center p-2 rounded-lg bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA] transition-colors shadow-sm"
                                                        title="Decline Booking"
                                                    >
                                                        <FiX />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-[#9CA3AF] text-sm italic mr-4">Processed</span>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-12 text-[#6B7280]">
                            No pending booking requests available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingRequests;