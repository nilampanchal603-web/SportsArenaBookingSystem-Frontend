import axios from "../../utils/axiosInstance"
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { FiStar } from 'react-icons/fi'

const ManageFeedback = () => {
    const [feedbacks, setFeedback] = useState([])
    const navigate=useNavigate()
    const location=useLocation()

    const getAllFeedback = async (data) => {
        try {
            const res = await axios.get("/feedback/allfeedback", data)
            setFeedback(res.data.data)
        } catch (error) {
            console.log("Error fetching feedback", error)
        }
    };

    const deleteFeedback= async(id)=>{
         try {
            await axios.delete(`/feedback/deletefeedback/${id}`);
            toast.success("Feedback Deleted ✅");
            getAllFeedback();
        } catch (error) {
            console.error(error);
            toast.error("Delete failed ❌");
        }
    };

    useEffect(() => {
    if (location.state?.updatedFeedback) {
        setFeedback((prev) =>
        prev.map((fb) =>
            fb._id === location.state.id
            ? { ...fb, ...location.state.updatedFeedback }
            : fb
        )
        );
    }
    }, [location]);

    useEffect(() => {
        getAllFeedback();
    }, [])


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#0F172A]">All Feedbacks</h2>
                <button
                    onClick={getAllFeedback}
                    className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm"
                >
                    Refresh List
                </button>
            </div>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#F9FAFB] text-[#6B7280]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">User Name</th>
                                <th className="px-6 py-4 font-semibold">Arena Name</th>
                                <th className="px-6 py-4 font-semibold">Coach</th>
                                <th className="px-6 py-4 font-semibold">Rating</th>
                                <th className="px-6 py-4 font-semibold">Comments</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#E5E7EB]">
                            {feedbacks.length > 0 ? (
                                feedbacks.map((fb) => (
                                    <tr key={fb._id} className="hover:bg-[#F9FAFB] transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0F172A]">
                                            {fb.userId?.firstName && fb.userId?.lastName
                                            ? `${fb.userId.firstName} ${fb.userId.lastName}`
                                            : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-[#6B7280]">{fb.arenaId?.arenaName || "N/A"}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{fb.coachId?.coachName || "N/A"}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-semibold bg-[#FEF9C3] text-[#A16207]">
                                                {fb.rating} <FiStar className="text-[#EAB308] fill-current" />
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#6B7280] max-w-xs truncate" title={fb.comments}>
                                            {fb.comments}
                                        </td>
                                        <td className="px-6 py-4 text-[#6B7280]">
                                            {new Date(fb.feedbackDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-[#6B7280]">
                                        No feedbacks found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CHILD ROUTE */}
            <Outlet />
        </div>
    )
}

export default ManageFeedback
