import axios from "../../utils/axiosInstance"
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"


const ManageSlot = () => {
  const [slots, setSlots] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const fetchSlot = async (data) => {
    try {
      const res = await axios.get("/slot/allslot", data)
      console.log("Fetched slots:", res.data.data); 
      setSlots(res.data.data)
    } catch (error) {
      console.log("Error fetching slots", error)
    }
  };

  const deleteSlot = async (id) => {
    try {
      await axios.delete(`/slot/deleteslot/${id}`);
      toast.success("Slot Deleted ✅");
      fetchSlot();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    if (location.state?.updatedSlot) {
      setSlots((prev) =>
        prev.map((slot) =>
          slot._id === location.state.id
            ? { ...slot, ...location.state.updatedSlot }
            : slot
        )
      )
    }
  }, [location]);

  useEffect(() => {
    if (location.state?.refresh || (!location.state)) {
      fetchSlot();
    }
  }, [location.state]);

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">All Slots</h2>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSlot}
            className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm"
          >
            Refresh List
          </button>
          <button
            onClick={() => navigate("/arenamanager/schedule/addslot")}
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            <FiPlus /> Add New Slot
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">

            <thead className="bg-[#F9FAFB] text-[#6B7280]">
              <tr>
                <th className="px-6 py-4 font-semibold">Arena</th>
                <th className="px-6 py-4 font-semibold">Sport Type</th>
                <th className="px-6 py-4 font-semibold">Start Time</th>
                <th className="px-6 py-4 font-semibold">End Time</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7EB]">
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <tr key={slot._id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4 font-medium text-[#0F172A]">
                      {slot.arenaId?.arenaName}
                    </td>

                    <td className="px-6 py-4 text-[#6B7280]">
                      {slot.sportType}
                    </td>

                    <td className="px-6 py-4 text-[#6B7280]">
                      {slot.slots[0]?.slotTime}
                    </td>

                    <td className="px-6 py-4 text-[#6B7280]">
                      {slot.slots[0]?.endTime}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize
                          ${slot.slots?.[0]?.availability === "available" ? "bg-green-100 text-green-800"
                          : slot.slots?.[0]?.availability === "booked" ? "bg-red-100 text-red-800"
                            : "bg-[#E5E7EB] text-[#374151]"}`
                      }
                      >
                        {slot.slots?.[0]?.availability}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`updateslot/${slot._id}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEF3C7] text-[#B45309] hover:bg-[#FDE68A] transition-colors"
                      >
                        <FiEdit2 /> Edit
                      </button>

                      <button
                        onClick={() => deleteSlot(slot._id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-[#6B7280]">
                    No slots found
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

export default ManageSlot
