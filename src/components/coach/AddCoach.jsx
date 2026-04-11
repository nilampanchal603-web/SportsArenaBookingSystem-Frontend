import React, { useEffect, useState } from 'react'
import axios from "../../utils/axiosInstance";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddCoach = () => {
    const{register,handleSubmit,reset,setValue}=useForm();
    const navigate=useNavigate()
    const [managerId, setManagerId] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            if (parsed.id) {
                setManagerId(parsed.id);
                setValue("userId", parsed.id);
            }
        }
    }, [setValue]);

    const submihandler = async (data) => {
        try {
            const res = await axios.post("/coach/newcoach", data)
            if (res.status === 201) {
                toast.success("Add new coach successfully")
                reset();
                navigate("/arenamanager/coaches", { state: { refresh: true } });
            }
        } catch (error) {
            console.error(error)
            toast.error("Error while add new coach ")
        }
    };

    return (
       <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
          <div className="mb-8 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-2xl font-bold text-[#0F172A]">
               Add New Coach
            </h2>
            <p className="text-[#6B7280] text-sm mt-1">Register a new coach to the platform.</p>
          </div>
          <form
            onSubmit={handleSubmit(submihandler)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Manager ID (Auto-filled) */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
               Assigned Manager User ID
              </label>
              <input
                type="text"
                {...register("userId")}
                readOnly
                className="w-full px-4 py-2.5 bg-[#E5E7EB] border border-[#D1D5DB] rounded-[12px] text-[#6B7280] cursor-not-allowed outline-none"
                placeholder="Auto-filled from Session"
              />
            </div>

            {/* Coach Email */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Coach Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                placeholder="Enter coach contact email"
              />
            </div>

            {/* Coach Name */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
               Coach Name
              </label>
              <input
                type="text"
                {...register("coachName")}
                className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                placeholder="Enter coach name"
              />
            </div>

            {/* Sports Type */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Sports Type
              </label>
              <input
                type="text"
                {...register("sportType")}
                className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                placeholder="e.g. Football, Tennis"
              />
            </div>

            {/* Experience*/}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Experience (Years)
              </label>
              <input
                type="number"
                {...register("experience")}
                className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                placeholder="Enter years of experience"
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
                  <option value="not available">Not Available</option>
                </select>
            </div>

            {/* Earnings */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Initial Earnings/Rate (₹)
              </label>
              <input
                type="number"
                {...register("earnings")}
                className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                placeholder="Enter rate or initial earnings"
              />
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
                Add Coach
              </button>
            </div>
          </form>
        </div>     
    )
}

export default AddCoach
