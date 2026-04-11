import axios from "../../utils/axiosInstance"
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"

const ManageMaintenance = () => {
    const [maintenance, setMaintenance] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    const fetchMaintenance = async (data) => {
        try {
            const res = await axios.get("/maintenance/allmaintenance", data)
            setMaintenance(res.data.data)
        } catch (error) {
            console.error(error);
        }
    };

    const deleteMaintenance = async (id) => {
        try {
            await axios.delete(`/maintenance/deletemaintenance/${id}`);
            toast.success("Maintenance Deleted ✅");
            fetchMaintenance()
        } catch (error) {
            console.error(error);
            toast.error("Delete failed ❌");
        }
    }

    useEffect(() => {
        if (location.state?.updatedMaintenance) {
            setMaintenance((prev) =>
                prev.map((item) =>
                    item._id === location.state.id
                        ? location.state.updatedMaintenance
                        : item
                )
            );
        }
    }, [location.state]);

    useEffect(() => {
        if (location.state?.refresh || (!location.state)) {
            fetchMaintenance();
        }
    }, [location.state]);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">Maintenance Records</h2>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchMaintenance}
                        className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm"
                    >
                        Refresh List
                    </button>
                    <button
                        onClick={() => navigate("/arenamanager/maintenance/addmaintenance")}
                        className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                    >
                        <FiPlus /> Add Maintenance
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#F9FAFB] text-[#6B7280]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">ID</th>
                                <th className="px-6 py-4 font-semibold">Arena</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Start</th>
                                <th className="px-6 py-4 font-semibold">End</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Closed</th>
                                <th className="px-6 py-4 font-semibold">Remarks</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#E5E7EB]">
                            {maintenance.length > 0 ? (
                                maintenance.map((m) => (
                                    <tr key={m._id} className="hover:bg-[#F9FAFB] transition-colors">
                                        <td className="px-6 py-4 font-medium text-[#0F172A]">{m.maintenanceId}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{m.arenaId?.arenaName || "N/A"}</td>
                                        <td className="px-6 py-4 text-[#6B7280] capitalize">{m.type}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{new Date(m.startDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-[#6B7280]">{new Date(m.endDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium capitalize 
                                                ${m.status === "completed" ? "bg-green-100 text-green-800" 
                                                : m.status === "in-progress" ? "bg-yellow-100 text-yellow-800"
                                                : "bg-[#EFF6FF] text-[#2563EB]"}`
                                            }>
                                                {m.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium 
                                                ${m.isClosed === "Yes" ? "bg-red-100 text-red-800" : "bg-[#E5E7EB] text-[#374151]"}`
                                            }>
                                                {m.isClosed}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#6B7280] max-w-[150px] truncate" title={m.remarks}>
                                            {m.remarks}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                            <button
                                                onClick={() => navigate(`updatemaintenance/${m._id}`)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEF3C7] text-[#B45309] hover:bg-[#FDE68A] transition-colors">
                                                <FiEdit2 /> Edit
                                            </button>
                                            <button
                                                onClick={() => deleteMaintenance(m._id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors">
                                                <FiTrash2 /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="px-6 py-8 text-center text-[#6B7280]">
                                        No maintenance records found
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

export default ManageMaintenance
