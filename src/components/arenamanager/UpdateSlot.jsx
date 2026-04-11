import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";

const UpdateSlot = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm();
  const availability = watch("availability");

  const [slot, setSlot] = useState(null);
  const [arenas, setArenas] = useState([]);

 // Fetch slot details
  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const res = await axios.get("/slot/allslot");
        const slotData = res.data.data.find(s => s._id === id);
        if (!slotData) return toast.error("Slot not found");
        setSlot(slotData);

        // Prefill form
        reset({
          arenaId: slotData.arenaId?._id,
          sportType: slotData.sportType,
          slotTime: slotData.slots[0]?.slotTime,
          endTime: slotData.slots[0]?.endTime,
          availability: slotData.slots[0]?.availability,
        });
      } catch (error) {
        console.log(error);
        toast.error("Error fetching slot details");
      }
    };
    fetchSlot();
  }, [id, reset]);

  // Fetch arenas for dropdown
  useEffect(() => {
    const fetchArenas = async () => {
      try {
        const res = await axios.get("/arena/allarena");
        setArenas(res.data.data);
      } catch (error) {
        console.log("Error fetching arenas", error);
      }
    };
    fetchArenas();
  }, []);

  const submihandler = async (data) => {
    console.log("Submitting update data:", data);
    try {
      const finalData = {
        arenaId: data.arenaId,
        sportType: data.sportType,
        slots: [
          {
            slotTime: data.slotTime,
            endTime: data.endTime,
            availability: data.availability,
          },
        ],
      };
       console.log("Final payload:", finalData)
      await axios.put(`/slot/updateslot/${id}`, finalData);
      toast.success("Slot Updated Successfully");
      navigate("/arenamanager/schedule", { state: { updatedSlot: finalData, id } });
    } catch (error) {
      console.log(error);
      toast.error("Error while updating slot");
    }
  };

  if (!slot) return <p className="text-center mt-10">Loading slot details...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
      <div className="mb-8 border-b border-[#E5E7EB] pb-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">Update Slot</h2>
        <p className="text-[#6B7280] text-sm mt-1">Modify arena slot schedule and availability.</p>
      </div>

      <form onSubmit={handleSubmit(submihandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Arena */}
        <div>
          <label className="block mb-2">Arena</label>
          <select {...register("arenaId")} className="w-full p-2 border rounded">
            <option value="">Select Arena</option>
            {arenas.map(a => (
              <option key={a._id} value={a._id}>{a.arenaName}</option>
            ))}
          </select>
        </div>
        {/* Sport Type */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Sports Type</label>
          <input
            type="text"
            {...register("sportType")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter sports type"
          />
        </div>

        {/* Slot Time */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Slot Time</label>
          <input
            type="text"
            {...register("slotTime")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="08:00 AM"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">End Time</label>
          <input
            type="text"
            {...register("endTime")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="09:00 AM"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Availability</label>
          <select
            {...register("availability")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* Buttons */}
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
            Update Slot
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSlot;
