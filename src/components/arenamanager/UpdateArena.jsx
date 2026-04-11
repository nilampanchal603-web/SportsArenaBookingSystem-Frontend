import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

const UpdateArena = () => {
    const {id}=useParams();
    const navigate=useNavigate()
    const { register, handleSubmit }=useForm()

    const submihandler = async (data) => {
        try {
            await axios.put(`arena/updatearena/${id}`, data);
            toast.success("Arena Updated Successfully");
            navigate("/arenamanager/arenas", {state: { updatedArena: data, id }});
        } catch (error) {
            toast.error("Error While Upadate arena")
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
            <div className="mb-8 border-b border-[#E5E7EB] pb-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">
                    Update Arena
                </h2>
                <p className="text-[#6B7280] text-sm mt-1">Modify the details of an existing arena facility.</p>
            </div>

            <form onSubmit={handleSubmit(submihandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Arena Name</label>
                    <input 
                        {...register("arenaName")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]" 
                        placeholder="Enter Arena Name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Sports Type</label>
                    <input 
                        {...register("sportsType")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]" 
                        placeholder="e.g. Football, Tennis"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Location Address</label>
                    <input 
                        {...register("location")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]" 
                        placeholder="Full street address"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Latitude</label>
                    <input 
                        {...register("lat")} 
                        placeholder="e.g. 23.0225"
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]" 
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Longitude</label>
                    <input 
                        {...register("lng")} 
                        placeholder="e.g. 72.5714"
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]" 
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Price Per Hour (₹)</label>
                    <input 
                        {...register("pricePerHour")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]" 
                        placeholder="e.g. 500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Manager ID</label>
                    <input 
                        {...register("managerId")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]" 
                        placeholder="Manager ID"
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
                        Update Arena
                    </button>
                </div>

            </form>
        </div>
    )
}

export default UpdateArena
