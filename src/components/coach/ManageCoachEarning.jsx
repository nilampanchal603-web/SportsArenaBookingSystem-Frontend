import React from 'react'
import { useState } from 'react';
import axios from "../../utils/axiosInstance";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2 } from "react-icons/fi"

const ManageCoachEarning = () => {
    const [earnings, setEarnings] = useState([]);
      
  const getAllEarnings = async () => {
    try {
        const res = await axios.get("/earning/allearnings");
        console.log("Backend response:", res.data);
         console.log("Backend response:", res.data.data);
      console.log("First earning:", JSON.stringify(res.data.data[0], null, 2));

        const earningsArray = Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data.earnings)
        ? res.data.earnings
        : Array.isArray(res.data)
        ? res.data
        : [];

        setEarnings(earningsArray);
    } catch (error) {
        console.error("Error fetching earnings", error);
        toast.error("Failed to fetch earnings ❌");
        setEarnings([]);
    }
  };

  useEffect(() => {
    getAllEarnings();
  }, []);

  const deleteEarning = async (id) => {
    try {
        await axios.delete(`/earning/deleteearnings/${id}`); 
        getAllEarnings();
        toast.success("Delete Successfully")
    } catch (error) {
        console.error("Error deleting earning", error);
        toast.error("Error while deleted..")
    }
  };
  const addEarning = async (coachId, sessionId, date) => {
  try {

    await axios.post("/earning/earnings", {
      coachId,
      sessionId,
      date,
      fee: 500
    });

    getAllEarnings();
    toast.success("Earning Added Successfully")

  } catch (error) {
    console.error("Error adding earning", error);
    toast.error("Error while adding earning")
  }
};



  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">All Coach Earnings</h2>
        <button
          onClick={getAllEarnings}
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
                        <th className="px-6 py-4 font-semibold">Coach Name</th>
                        <th className="px-6 py-4 font-semibold">Session</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Fee</th>
                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-[#E5E7EB]">
                    {Array.isArray(earnings) && earnings.length > 0 ? (
                        earnings.map((earning) => (
                            <tr key={earning._id} className="hover:bg-[#F9FAFB] transition-colors">
                            
                                <td className="px-6 py-4 font-medium text-[#0F172A]">
                                    {earning.coachId?.coachName || "N/A"}
                                </td>
                                
                                <td className="px-6 py-4 text-[#6B7280]">
                                    {earning.sessionId?.sessionTitle || "N/A"}
                                </td>
                                
                                <td className="px-6 py-4 text-[#6B7280]">{new Date(earning.date).toLocaleDateString()}</td>
                                
                                <td className="px-6 py-4 font-semibold text-[#10B981]">₹ {earning.fee || 500}</td>
                                <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                    <button
                                        onClick={() => deleteEarning(earning._id)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors"
                                    >
                                        <FiTrash2 /> Delete
                                    </button>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-[#6B7280]">
                                No earnings found
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
export default ManageCoachEarning
