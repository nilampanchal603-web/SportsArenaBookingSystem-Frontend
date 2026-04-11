import axios from "../../utils/axiosInstance"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FiEdit2, FiTrash2 } from "react-icons/fi"

const ManageAdminArenas = () => {
    const [arenas, setArenas] = useState([])
    const [formData, setFormData] = useState({ arenaName: "", sportsType: "", location: "", pricePerHour: "" })
    const [editingId, setEditingId] = useState("")

    const fetchArenas = async () => {
        try {
            const res = await axios.get("/admin/arenas")
            setArenas(res.data.data || [])
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to fetch arenas")
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingId) {
                await axios.put(`/admin/arenas/${editingId}`, formData)
                toast.success("Arena updated")
            } else {
                await axios.post("/admin/arenas", formData)
                toast.success("Arena added")
            }
            setFormData({ arenaName: "", sportsType: "", location: "", pricePerHour: "" })
            setEditingId("")
            fetchArenas()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Save failed")
        }
    }

    const onEdit = (arena) => {
        setEditingId(arena._id)
        setFormData({
            arenaName: arena.arenaName || "",
            sportsType: arena.sportsType || "",
            location: arena.location || "",
            pricePerHour: arena.pricePerHour || ""
        })
    }

    const onDelete = async (id) => {
        try {
            await axios.delete(`/admin/arenas/${id}`)
            toast.success("Arena deleted")
            fetchArenas()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Delete failed")
        }
    }

    useEffect(() => {
        fetchArenas()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#0F172A]">Manage Arenas</h2>
                <button onClick={fetchArenas} className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm">
                    Refresh List
                </button>
            </div>

            <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#F9FAFB] text-[#6B7280]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Arena</th>
                                <th className="px-6 py-4 font-semibold">Sport</th>
                                <th className="px-6 py-4 font-semibold">Location</th>
                                <th className="px-6 py-4 font-semibold">Price/Hour</th>
                                {/* <th className="px-6 py-4 font-semibold text-right">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB]">
                            {arenas.map((arena) => (
                                <tr key={arena._id} className="hover:bg-[#F9FAFB] transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#0F172A]">{arena.arenaName}</td>
                                    <td className="px-6 py-4 text-[#6B7280]">{arena.sportsType}</td>
                                    <td className="px-6 py-4 text-[#6B7280]">{arena.location}</td>
                                    <td className="px-6 py-4 text-[#6B7280]">₹{arena.pricePerHour}</td>
                                    {/* <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                        <button 
                                            onClick={() => onEdit(arena)} 
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEF3C7] text-[#B45309] hover:bg-[#FDE68A] transition-colors"
                                        >
                                            <FiEdit2 /> Edit
                                        </button>
                                        <button 
                                            onClick={() => onDelete(arena._id)} 
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors"
                                        >
                                            <FiTrash2 /> Delete
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                            {arenas.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-[#6B7280]">
                                        No arenas found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageAdminArenas
