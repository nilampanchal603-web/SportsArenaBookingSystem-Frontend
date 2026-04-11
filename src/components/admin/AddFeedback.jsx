import React from 'react'
import axios from "../../utils/axiosInstance";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiStar } from 'react-icons/fi';
import { useState } from 'react';


const AddFeedback = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [rating, setRating] = useState(0);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            userId: location.state?.userId || "",
            arenaId: location.state?.arenaId || "",
            coachId: location.state?.coachId || ""
        }
    })

    const submihandler = async (data) => {

        if (rating === 0) {
            toast.error("Please select rating ⭐")
            return
        }

        data.rating = rating

        try {

            const res = await axios.post("/feedback/newfeedback", data)

            if (res.status === 201) {
                toast.success("successfully feedback submitted")
                reset();
                setRating(0);
                const from = location.state?.from || "/admin/feedback";
                navigate(from, { state: { refresh: true, submittedFeedbackBookingId: location.state?.bookingId } });
            }

        } catch (error) {
            console.error(error)
            toast.error("Error while add new feedback")
        }

    };
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
            <div className="mb-8 border-b border-[#E5E7EB] pb-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">
                    Add New Feedback
                </h2>
                <p className="text-[#6B7280] text-sm mt-1">Create a new feedback record manually.</p>
            </div>

            <form
                onSubmit={handleSubmit(submihandler)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* User */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                        User ID
                    </label>
                    <input
                        type="text"
                        {...register("userId")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="Enter User ID"
                        required
                    />
                </div>

                {/* Arena */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                        Arena ID
                    </label>
                    <input
                        type="text"
                        {...register("arenaId")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="Enter Arena ID"
                        required
                    />
                </div>

                {/* Coach */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                        Coach ID
                    </label>
                    <input
                        type="text"
                        {...register("coachId")}
                        className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="Enter Coach ID"
                        required
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                        Rating
                    </label>

                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FiStar
                                key={star}
                                size={28}
                                onClick={() => {
                                    setRating(star)
                                }}
                                className={`cursor-pointer transition ${star <= rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>

                    <input
                        type="hidden"
                        {...register("rating", { required: true })}
                        value={rating}
                    />

                </div>

                {/* Comments */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#1F2937] mb-2">
                        Comments
                    </label>
                    <textarea
                        {...register("comments")}
                        className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
                        placeholder="Enter detailed comments..."
                        rows={4}
                        required
                    />
                </div>

                {/* Submit Button */}
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
                        Save Feedback
                    </button>
                </div>
            </form>
        </div>

    )
}

export default AddFeedback
