import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from "../../utils/axiosInstance";
import { useEffect } from 'react';

const UpdateBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        // Automatically fill userId from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            if (parsed.id) {
                setValue("userId", parsed.id);
            }
        }
    }, [setValue]);

    const submitHandler = async (data) => {
        try {
            await axios.put(`/booking/updatebooking/${id}`, data)
            toast.success("Booking Updated Successfully ✅")
            navigate("/players/booking", { state: { refresh: true, updatedBooking: data, id: id } })
        } catch (error) {
            console.log(error)
            toast.error("Error While Updating Booking ❌")
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
            <div className="mb-8 border-b border-[#E5E7EB] pb-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">
                    Update Booking
                </h2>
                <p className="text-[#6B7280] text-sm mt-1">Modify your reservations and schedules.</p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

                {/* <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Slot ID</label>
                    <input
                        type="text"
                        {...register("slotId")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="Enter slot ID"
                        required
                    />
                </div> */}

                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Booking Date</label>
                    <input
                        type="date"
                        {...register("bookingDate")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        required
                    />
                </div>

                {/* <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Status</label>
                    <select
                        {...register("status")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div> */}

                {/* <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">Total Amount (₹)</label>
                    <input
                        type="number"
                        {...register("totalAmount")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="Enter total amount"
                        required
                    />
                </div> */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                        Number of hours
                    </label>
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
                        Update Booking
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateBooking
