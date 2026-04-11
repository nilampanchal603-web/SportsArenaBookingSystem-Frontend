import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import { FiCheck, FiX } from "react-icons/fi";

const ManageRequestCoach = () => {
  const [requests, setRequests] = useState([]);

  const getAllRequests = async () => {
    try {
      const res = await axios.get("/booking/allbooking");
      const assignedBookings = (res.data.data || []).filter(
        (b) => b.status === "coach_assigned" || b.status === "confirmed"
      );
      setRequests(assignedBookings);
    } catch (error) {
      console.error("Error fetching coach requests", error);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/booking/updatebooking/${id}`, { status });
      
      if (status === "confirmed") {
        const req = requests.find((r) => r._id === id);
        if (req) {
          const newSession = {
            sessionTitle: req.userId?.firstName ? `Session with ${req.userId.firstName} ${req.userId.lastName || ""}` : "Player Session",
            sportType: req.sportType || "General",
            date: new Date(req.bookingDate).toLocaleDateString(),
            time: req.time || (req.slotId ? `${req.slotId.slotTime} - ${req.slotId.endTime}` : "N/A"),
            players: 1,
            arenaName: req.arenaName || req.arenaId?.arenaName || "Sports Arena",
            coachId: req.coachId?._id || req.coachId
          };
          await axios.post("/mysession/newsession", newSession);
        }
      }

      toast.success(`Booking ${status} ✅`);
      getAllRequests();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status ❌");
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0F172A]">Assigned Bookings</h2>
        <button
          onClick={getAllRequests}
          className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm"
        >
          Refresh List
        </button>
      </div>

      <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#F9FAFB] text-[#6B7280]">
              <tr>
                <th className="px-6 py-4 font-semibold">Player Name</th>
                <th className="px-6 py-4 font-semibold">Arena</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Time</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7EB]">
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr key={req._id} className="hover:bg-[#F9FAFB] transition-colors">
                    
                    <td className="px-6 py-4 font-medium text-[#0F172A]">
                      {req.userId?.firstName} {req.userId?.lastName}
                    </td>
                    
                    <td className="px-6 py-4 text-[#6B7280]">
                      {req.arenaName || req.arenaId?.arenaName || "N/A"}
                    </td>
                    
                    <td className="px-6 py-4 text-[#6B7280]">
                      {new Date(req.bookingDate).toLocaleDateString()}
                    </td>
                    
                    <td className="px-6 py-4 text-[#6B7280]">
                        <span className="bg-[#EFF6FF] text-[#1E40AF] px-2 py-1 rounded-md text-xs font-medium border border-[#BFDBFE]">
                            {req.time || (req.slotId ? `${req.slotId.slotTime} - ${req.slotId.endTime}` : "N/A")}
                        </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          req.status === "coach_assigned"
                            ? "bg-[#FEF3C7] text-[#B45309]"
                            : req.status === "confirmed"
                            ? "bg-[#D1FAE5] text-[#065F46]"
                            : "bg-[#FEE2E2] text-[#B91C1C]"
                        }`}
                      >
                        {req.status === "coach_assigned" ? "Pending Approval" : req.status}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-right space-x-2">
                      {req.status === "coach_assigned" ? (
                        <>
                          <button
                            onClick={() => updateStatus(req._id, "confirmed")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#D1FAE5] text-[#059669] hover:bg-[#A7F3D0] transition-colors shadow-sm"
                          >
                            <FiCheck /> Approve
                          </button>
                          <button
                            onClick={() => updateStatus(req._id, "cancelled")}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA] transition-colors shadow-sm"
                          >
                            <FiX /> Reject
                          </button>
                        </>
                      ) : (
                          <span className="text-[#9CA3AF] text-sm italic mr-4">Processed</span>
                      )}
                    </td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-[#6B7280]">
                    No assigned bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default ManageRequestCoach;
