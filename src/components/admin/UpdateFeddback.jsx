import React from 'react'
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

const UpdateFeddback = () => {
     const {id}=useParams();
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()
    
    const submitHandler = async (data) => {
  try {
    await axios.put(`/feedback/updatefeedback/${id}`, data)

    toast.success("Feedback Updated Successfully")

    navigate("/admin/feedback",{ state: { updatedFeedback: data, id } })

  } catch (error) {
    console.log(error)
    toast.error("Error While Updating Feedback")
  }
}
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
      <div className="mb-8 border-b border-[#E5E7EB] pb-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">
          Update Feedback
        </h2>
        <p className="text-[#6B7280] text-sm mt-1">Modify existing feedback details.</p>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        
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

     
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Rating (1-5)
          </label>
          <input
            type="number"
            {...register("rating", { min: 1, max: 5 })}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter rating"
            required
          />
        </div>

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
            Update Feedback
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateFeddback
