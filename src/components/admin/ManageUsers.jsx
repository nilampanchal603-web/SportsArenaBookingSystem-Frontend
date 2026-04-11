import axios from "../../utils/axiosInstance"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FiCheck, FiX, FiTrash2 } from "react-icons/fi"

const ManageUsers = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/admin/users")
            setUsers(res.data.data || [])
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to fetch users")
        }
    }

    const approveUser = async (id) => {
        try {
            await axios.patch(`/admin/users/${id}/approve`)
            toast.success("User approved")
            fetchUsers()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Approve failed")
        }
    }

    const blockUser = async (id) => {
        try {
            await axios.patch(`/admin/users/${id}/block`)
            toast.success("User blocked")
            fetchUsers()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Block failed")
        }
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/admin/users/${id}`)
            toast.success("User deleted")
            fetchUsers()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Delete failed")
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#0F172A]">Manage Users</h2>
                <button onClick={fetchUsers} className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm">
                    Refresh List
                </button>
            </div>
            
            <div className="bg-white rounded-[16px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-[#F9FAFB] text-[#6B7280]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB]">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-[#F9FAFB] transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#0F172A]">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-[#6B7280]">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5E7EB] text-[#374151] uppercase tracking-wide">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                            user.status === 'blocked' 
                                            ? 'bg-red-100 text-red-800' 
                                            : user.status === 'active' || user.status === 'approved'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {user.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                        {/* Status Toggle Actions */}
                                        {user.status !== 'blocked' ? (
                                            <button 
                                                onClick={() => blockUser(user._id)} 
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors"
                                                title="Block User"
                                            >
                                                <FiX /> Block
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => approveUser(user._id)} 
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#D1FAE5] text-[#065F46] hover:bg-[#A7F3D0] transition-colors"
                                                title="Approve User"
                                            >
                                                <FiCheck /> Approve
                                            </button>
                                        )}

                                        <button 
                                            onClick={() => deleteUser(user._id)} 
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] hover:bg-[#FEE2E2] transition-colors"
                                            title="Delete User"
                                        >
                                            <FiTrash2 /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-[#6B7280]">
                                        No users found
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

export default ManageUsers
