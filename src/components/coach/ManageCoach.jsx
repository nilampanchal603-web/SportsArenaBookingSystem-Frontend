import React, { useState } from 'react'
import axios from "../../utils/axiosInstance"
import { toast } from 'react-toastify'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"


const ManageCoach = () => {
    const [coaches, setCoaches] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    const getAllCoaches = async (data) => {
        try {
            const res = await axios.get("/coach/allcoach", data)
            setCoaches(res.data.data)

        } catch (error) {
            console.log("Error fetching coaches", error)
        }
    };

    useEffect(() => {
        if (location.state?.updatedCoach) {
            setCoaches((prev) =>
                prev.map((coach) =>
                    coach._id === location.state.id
                        ? { ...coach, ...location.state.updatedCoach }
                        : coach
                )
            )
        }
    }, [location]);

    useEffect(() => {
      if (location.state?.refresh || (!location.state)) {
        getAllCoaches();
      }
    }, [location.state]);

    const deleteCoach = async (id) => {
        try {
            await axios.delete(`/coach/deletecoach/${id}`);
            toast.success("Coach Deleted ✅");
            getAllCoaches();
        } catch (error) {
            console.error(error);
            toast.error("Delete failed ❌");
        }
    };

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">All Coaches</h2>

                <div className="flex items-center gap-3">
                    <button  
                        onClick={getAllCoaches}
                        className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm" 
                    >
                        Refresh List
                    </button>
                    <button
                        onClick={() => navigate("/arenamanager/coaches/createcoach")}
                        className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                    >
                        <FiPlus /> Add New Coach
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        
                        <thead className="bg-[#F9FAFB] text-[#6B7280]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Sport</th>
                                <th className="px-6 py-4 font-semibold">Experience</th>
                                <th className="px-6 py-4 font-semibold">Availability</th>
                                <th className="px-6 py-4 font-semibold">Earnings</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#E5E7EB]">
                            {coaches.length > 0 ? (
                                coaches.map((coach) => (
                                    <tr key={coach._id} className="hover:bg-[#F9FAFB] transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0F172A]">{coach.coachName}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{coach.email || "N/A"}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-[#E5E7EB] text-[#374151] px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                                                {coach.sportType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#6B7280]"> {coach.experience} </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                                                coach.availability === "available"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`} >{coach.availability} </span> 
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-[#10B981]"> ₹ {coach.earnings} </td>
                                        
                                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                            <button
                                                onClick={() => navigate(`updatecoach/${coach._id}`)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEF3C7] text-[#B45309] hover:bg-[#FDE68A] transition-colors"
                                            >
                                                <FiEdit2 /> Edit
                                            </button>

                                            <button
                                                onClick={() => deleteCoach(coach._id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors" 
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-[#6B7280]">
                                        No coaches found
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

export default ManageCoach
