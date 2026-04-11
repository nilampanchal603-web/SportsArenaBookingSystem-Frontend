import React from 'react'
import axios from "../../utils/axiosInstance";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const AddAvailability = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate()
  const [coaches, setCoaches] = useState([])

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await axios.get("/coach/allcoach")
        setCoaches(res.data.data || [])
      } catch (error) {
        console.log("Error fetching coaches", error)
      }
    }

    fetchCoaches()
  }, [])

  const submitHandler = async (data) => {
    data.startTime = data.startTime + " " + data.startPeriod
    data.endTime = data.endTime + " " + data.endPeriod
    try {
      const res = await axios.post("/avalable/addavailability", data)
      if (res.status === 201) {
        toast.success("Availability Added Successfully")
        reset();
        navigate("/arenamanager/availability", { state: { refresh: true } })
      }
    } catch (error) {
      console.error(error)
      toast.error("Error while adding availability")
    }
  }


  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
      <div className="mb-8 border-b border-[#E5E7EB] pb-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">
          Add Availability
        </h2>
        <p className="text-[#6B7280] text-sm mt-1">Define new coaching schedule slots and details.</p>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Coach Dropdown */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Coach Name
          </label>

          <select
            {...register("coachId")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px]"
          >
            <option value="">Select Coach</option>

            {coaches.map((coach) => (
              <option key={coach._id} value={coach._id}>
                {coach.coachName}
              </option>
            ))}

          </select>
        </div>

        {/* Day */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Day
          </label>
          <select
            {...register("day")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Start Time
          </label>
          <div className="flex gap-2">
            <input
              type="time"
              {...register("startTime")}
              className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            />
            <select
              {...register("startPeriod")}
              className="px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            End Time
          </label>
          <div className="flex gap-2">
            <input
              type="time"
              {...register("endTime")}
              className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            />
            <select
              {...register("endPeriod")}
              className="px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        {/* Sport Type */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Sport Type
          </label>
          <input
            type="text"
            {...register("sportType")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter Sport Type"
          />
        </div>

        {/* Arena Name */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Arena Name
          </label>
          <input
            type="text"
            {...register("arenaName")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter Arena Name"
          />
        </div>

        {/* Status */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        {/* Action Buttons */}
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
            Add Availability
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddAvailability
