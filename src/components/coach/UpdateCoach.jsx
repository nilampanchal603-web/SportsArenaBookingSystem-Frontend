import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from "../../utils/axiosInstance"

const UpdateCoach = () => {
    const {id}=useParams();
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()
    
    const submitHandler = async (data) => {
        try {
            await axios.put(`coach/updatecoach/${id}`, data)
            toast.success("Coach Updated Successfully")
            navigate("/coach/dashboard",{state: { updatedCoach: data, id }})
        } catch (error) {
            console.log(error)
            toast.error("Error While Updating Coach")
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
            <div className="mb-8 border-b border-[#E5E7EB] pb-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">
                    Update Coach
                </h2>
                <p className="text-[#6B7280] text-sm mt-1">Modify the coach profile and availability.</p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Coach Name</label>
                    <input
                        {...register("coachName")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="Enter coach name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Sport Type</label>
                    <input
                        {...register("sportType")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="e.g. Tennis"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Experience (Years)</label>
                    <input
                        {...register("experience")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="Enter experience"
                    />
                </div>

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

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Earnings/Rate (₹)</label>
                    <input
                        type="number"
                        {...register("earnings")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="Enter earnings"
                    />
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
                        Update Coach
                    </button>
                </div>

            </form>
        </div>
    )
}

export default UpdateCoach
