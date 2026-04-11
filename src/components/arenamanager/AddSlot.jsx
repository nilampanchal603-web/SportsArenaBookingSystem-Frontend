import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from "../../utils/axiosInstance"
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'

const AddSlot = () => {
  const { register, handleSubmit, reset, watch } = useForm()
  const navigate = useNavigate()
  const [arenas, setArenas] = useState([])
  const availability = watch("availability");

  useEffect(() => {
    const fetchArenas = async () => {
      try {
        const res = await axios.get("/arena/allarena")
        console.log(res.data.data)
        setArenas(res.data.data)
      } catch (error) {
        console.log("Error fetching arenas", error)
      }
    }
    fetchArenas()
  }, [])

  const submihandler = async (data) => {
     if (!data.slotTime || !data.endTime) {
    toast.error("Please enter both start and end time for the slot");
    return;
  }
    try {
      const finalData = {
        arenaId: data.arenaId,
        sportType: data.sportType,
        slots: [{
          slotTime: data.slotTime,
          endTime: data.endTime,
          availability: data.availability,
        }]
      };
        console.log("Submitting slot:", finalData);

      const res = await axios.post("/slot/addslot", finalData)
      if (res.status === 201) {
        toast.success("Add new slot successfully")
        reset();
        navigate("/arenamanager/schedule", { state: { refresh: true } });
      }

    } catch (error) {
      console.error(error)
      toast.error("Error while add new slot")
    }

  };
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
      <div className="mb-8 border-b border-[#E5E7EB] pb-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">
          Add New Slot
        </h2>
        <p className="text-[#6B7280] text-sm mt-1">Create a new available time slot for an arena.</p>
      </div>

      <form onSubmit={handleSubmit(submihandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Arena</label>
          <select
            {...register("arenaId")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
          >
            <option value="">Select Arena</option>
            {arenas.map((arena) => (
              <option key={arena._id} value={arena._id}>{arena.arenaName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Sports Type
          </label>
          <input
            type="text"
            {...register("sportType")}
            placeholder="Enter sports type"
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
          />
        </div>



        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Slot Time
          </label>
          <input
            type="text"
            {...register("slotTime", { required: "Slot Time is required" })}
            placeholder="08:00 AM"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            End Time
          </label>
          <input
            type="text"
            {...register("endTime", { required: "End Time is required" })}
            placeholder="09:00 AM"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Availability
          </label>
          <select
            {...register("availability")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-4 mt-4 pt-6 border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-[12px] font-medium hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 bg-[#2563EB] text-white rounded-[12px] font-medium hover:bg-[#1E40AF] shadow-sm shadow-[#2563EB]/20 transition-all duration-200"
          >
            Add Slot
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddSlot
