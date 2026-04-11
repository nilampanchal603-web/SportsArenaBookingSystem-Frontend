import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "../../utils/axiosInstance";

const AddBooking = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const arenaId = location.state?.arenaId;             // Arena auto-selected from previous page
  const [arenaName, setArenaName] = useState(location.state?.arenaName || "");       // Arena name (for display)
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
 

  

  // Auto-fill userId from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.id) {
        setValue("userId", parsed.id);
      }
    }
  }, [setValue]);

  // Fetch slots for selected arena
  useEffect(() => {
    const fetchArenaName = async () => {
      if (!arenaId) return;

      try {
        const res = await axios.get(`/arena/${arenaId}`);
        setArenaName(res.data.data.arenaName);
      } catch (error) {
        console.log("Error fetching arena name:", error);
        setArenaName(location.state?.arenaName || "Unknown Arena");
      }
    };

    fetchArenaName();
  }, [arenaId]);

  //Fetch slots for selected arena
  useEffect(() => {
    const fetchArenaSlots = async () => {
      if (!arenaId) return;

      try {
        const res = await axios.get(`/slot/arena/${arenaId}`); // backend se slots fetch
        console.log("Fetched Slots:", res.data.data);
        setSlots(res.data.data || []); // slots state me save
      } catch (error) {
        console.log("Error fetching slots:", error);
        setSlots([]);
      }
    };

    fetchArenaSlots();
  }, [arenaId]);



  const submihandler = async (data) => {

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const price = location.state?.pricePerHour || 500;
      const hours = parseInt(data.hours) || 1;

      // Find the selected slot object to extract time string
      let selectedTimeString = "";
      for (const slotDoc of slots) {
        const found = slotDoc.slots.find(s => s._id === selectedSlot);
        if (found) {
          selectedTimeString = `${found.slotTime} - ${found.endTime}`;
          break;
        }
      }

      const finalData = {
        userId: data.userId,
        userEmail: storedUser.email,
        bookingDate: data.bookingDate,
        hours: hours,
        totalAmount: hours * price,
        arenaId: arenaId,
        arenaName: arenaName,
        time: selectedTimeString,
        slotId: selectedSlot,
        sportType: location.state?.sportType || "General",
      };



      const res = await axios.post("/booking/newbooking", finalData);

      if (res.status === 201) {
        toast.success("New Booking successfully");
        reset();
        setBookingSubmitted(true);
      }
    } catch (error) {
      console.log("Backend Error:", error.response?.data);
      toast.error("Error while new Booking");
    }
  };
 
    

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
      <div className="mb-8 border-b border-[#E5E7EB] pb-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">Add New Booking</h2>
        <p className="text-[#6B7280] text-sm mt-1">Book your slots for arenas and coaches securely.</p>
      </div>

      <form onSubmit={handleSubmit(submihandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* User ID */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">User ID</label>
          <input
            type="text"
            {...register("userId")}
            readOnly
            className="w-full px-4 py-2.5 bg-[#E5E7EB] border border-[#D1D5DB] rounded-[12px] text-[#6B7280] cursor-not-allowed outline-none"
            placeholder="Auto-filled from Session"
          />
        </div>

        {/* Booking Date */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Booking Date</label>
          <input
            type="date"
            {...register("bookingDate")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            required
          />
        </div>

        {/* Number of Hours */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Number of hours</label>
          <input
            type="number"
            {...register("hours")}
            defaultValue="1"
            min="1"
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter hours (e.g. 2)"
            required
          />
        </div>

        {/* Arena Name (auto-selected, read-only) */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Arena</label>
          <input
            type="text"
            value={arenaName || ""}
            readOnly
            className="w-full px-4 py-2.5 bg-[#E5E7EB] border border-[#D1D5DB] rounded-[12px] text-[#6B7280] cursor-not-allowed outline-none"
          />
        </div>

        {/* Slot Dropdown */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">Select Slot</label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            required
            disabled={!arenaId} // Enable only if arena exists
          >
            <option value="">--Select Slot--</option>
            {slots.map(slotDoc => (
              slotDoc.slots.map(s => (
                <option key={s._id} value={s._id}>
                  {s.slotTime} - {s.endTime}
                </option>
              ))
            ))}

          </select>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex items-center justify-end gap-4 mt-4 pt-6 border-t border-[#E5E7EB]">
          {bookingSubmitted ? (
            <button
              type="button"
              onClick={() => navigate("/players/payments")}
              className="hidden px-8 py-2.5 bg-[#059669] text-white rounded-[12px] font-medium hover:bg-[#047857] shadow-sm shadow-[#059669]/20 transition-all duration-200 w-full md:w-auto"
            >
              Pay Now
            </button>
          ) : (
            <>
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
                Confirm Booking
              </button>
            </>
          )}
        </div>
      </form>
                
    </div>
  )
}

export default AddBooking;
