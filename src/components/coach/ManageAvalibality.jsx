import React, { useState } from 'react'
import axios from "../../utils/axiosInstance"
import { toast } from 'react-toastify'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"

const ManageAvalibality = () => {

    const [availability, setAvailability] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    const getAllAvailability = async (data) => {
        try {
            const res = await axios.get("/avalable/allavailability", data)
            setAvailability(res.data.data)
        } catch (error) {
            console.log("Error fetching availability", error)
        }
    };

    useEffect(() => {
        if (location.state?.updatedAvailability) {
            setAvailability((prev) =>
                prev.map((item) =>
                    item._id === location.state.id
                        ? { ...item, ...location.state.updatedAvailability }
                        : item
                )
            )
        }
    }, [location]);

    useEffect(() => {
        if (location.state?.refresh || (!location.state)) {
            getAllAvailability();
        }
    }, [location.state]);

    const deleteAvailability = async (id) => {
        try {
            await axios.delete(`/avalable/deleteavailability/${id}`)
            toast.success("Availability Deleted ✅")
            getAllAvailability()
        } catch (error) {
            console.error(error)
            toast.error("Delete failed ❌")
        }
    };

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">Coach Availability</h2>

                <div className="flex items-center gap-3">
                    <button
                        onClick={getAllAvailability}
                        className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm"
                    >
                        Refresh List
                    </button>
                    <button
                        onClick={() => navigate("/arenamanager/availability/addavalibility")}
                        className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                    >
                        <FiPlus /> Add Availability
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#F9FAFB] text-[#6B7280]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Coach</th>
                                <th className="px-6 py-4 font-semibold">Day</th>
                                <th className="px-6 py-4 font-semibold">Start Time</th>
                                <th className="px-6 py-4 font-semibold">End Time</th>
                                <th className="px-6 py-4 font-semibold">Sport</th>
                                <th className="px-6 py-4 font-semibold">Arena</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#E5E7EB]">
                            {availability.length > 0 ? (
                                availability.map((item) => (
                                    <tr key={item._id} className="hover:bg-[#F9FAFB] transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0F172A]">{item.coachId?.coachName}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{item.day}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{item.startTime}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{item.endTime}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{item.sportType}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{item.arenaName}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                                                    item.status === "Available"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        
                                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                            <button
                                                onClick={() => navigate(`updateavalibility/${item._id}`)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEF3C7] text-[#B45309] hover:bg-[#FDE68A] transition-colors"
                                            >
                                                <FiEdit2 /> Edit
                                            </button>
                                            <button
                                                onClick={() => deleteAvailability(item._id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors"
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-[#6B7280]">
                                        No availability found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default ManageAvalibality
