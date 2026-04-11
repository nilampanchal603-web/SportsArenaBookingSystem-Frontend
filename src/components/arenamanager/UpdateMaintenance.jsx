import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from "../../utils/axiosInstance";

const UpdateMaintenance = () => {
    const {id}=useParams();
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()

    const submitHandler = async (data) => {
        try {
            const res= await axios.put(`maintenance/updatemaintenance/${id}`, data)
            toast.success("Maintenance Updated Successfully")
            navigate("/arenamanager/maintenance",{  state: {
                id: id,
                updatedMaintenance: res.data.data
            }})
        } catch (error) {
            console.log(error.response?.data)
            toast.error("Error While Updating Maintenance")
        }
    }
    
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
        <div className="mb-8 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-2xl font-bold text-[#0F172A]">
            Update Maintenance
            </h2>
            <p className="text-[#6B7280] text-sm mt-1">Modify the schedule or status of a maintenance task.</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Maintenance ID</label>
                <input
                    type="number"
                    {...register("maintenanceId")}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                    placeholder='Enter your Maintenance Id'
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Arena ID</label>
                <input
                    {...register("arenaId")}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                    placeholder="Enter arena ID"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Type</label>
                <select
                    {...register("type")}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                >
                    <option value="repair">Repair</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="inspection">Inspection</option>
                    <option value="upgrade">Upgrade</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Start Date</label>
                <input
                    type="date"
                    {...register("startDate")}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">End Date</label>
                <input
                    type="date"
                    {...register("endDate")}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Status</label>
                <select
                    {...register("status")}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                >
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Is Arena Closed?</label>
                <select
                    {...register("isClosed")}
                    className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1F2937] mb-2">Remarks</label>
                <textarea
                    {...register("remarks")}
                    className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                    placeholder="Enter remarks..."
                    rows={3}
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
                    Update Maintenance
                </button>
            </div>

        </form>
    </div>
  )
}

export default UpdateMaintenance
