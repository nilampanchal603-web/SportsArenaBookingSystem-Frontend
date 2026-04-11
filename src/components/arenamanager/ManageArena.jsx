import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "../../utils/axiosInstance";
import { toast } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const ManageArena = () => {

  const [arenas, setArenas] = useState([]);
  const navigate = useNavigate()
  const location = useLocation()

  const fetchArenas = async (data) => {
    try {
      const res = await axios.get("/arena/allarena", data);
      setArenas(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.state?.updatedArena) {
      setArenas((prev) =>
        prev.map((arena) =>
          arena._id === location.state.id
            ? { ...arena, ...location.state.updatedArena }
            : arena
        )
      )
    }
  }, [location])

  const deleteArena = async (id) => {
    try {
      await axios.delete(`/arena/deletearena/${id}`);
      toast.success("Arena Deleted ✅");
      fetchArenas();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed ❌");
    }
  };

  useEffect(()=>{
    fetchArenas()
  },[])

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">
          Manage Arenas
        </h2>
        <button
          onClick={() => navigate("/arenamanager/arenas/createarena")}
          className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md"
        >
          <FiPlus /> Add New Arena
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {arenas.length > 0 ? (
          arenas.map((arena) => (
            <div
              key={arena._id}
              className="bg-white rounded-[24px] shadow-md hover:shadow-2xl transition-all duration-500 border border-[#E5E7EB] overflow-hidden flex flex-col group p-2"
            >
              
             <div className="grid grid-cols-3 gap-[3px] overflow-hidden rounded-[20px]">
  
  {/* Big Image */}
  <div className="col-span-2 h-52 overflow-hidden bg-[#F3F4F6] relative">
    <img
      src={arena.imagePath?.[0] || "https://dummyimage.com/600x400/e5e7eb/a3a3a3&text=No+Preview"}
      className="absolute inset-0 h-full w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-700 ease-in-out"
      alt="Arena Preview 1"
    />
  </div>

  {/* Small Images */}
  <div className="flex flex-col gap-[3px] h-52">
    
    <div className="flex-1 overflow-hidden bg-[#F3F4F6] relative rounded-tr-[20px]">
      <img
        src={arena.imagePath?.[1] || "https://dummyimage.com/300x200/e5e7eb/a3a3a3&text=NA"}
        className="absolute inset-0 h-full w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-700 ease-in-out"
        alt="Arena Preview 2"
      />
    </div>

    <div className="flex-1 overflow-hidden bg-[#F3F4F6] relative rounded-br-[20px]">
      <img
        src={arena.imagePath?.[2] || "https://dummyimage.com/300x200/e5e7eb/a3a3a3&text=NA"}
        className="absolute inset-0 h-full w-full object-cover cursor-pointer hover:scale-110 transition-transform duration-700 ease-in-out"
        alt="Arena Preview 3"
      />
    </div>

  </div>

</div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h2 className="text-xl font-bold text-[#0F172A] break-words leading-tight">
                    {arena.arenaName}
                  </h2>
                  <span className="bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide shrink-0 shadow-sm">
                    {arena.sportsType}
                  </span>
                </div>

                <div className="flex items-start gap-2 text-[#6B7280] text-sm mb-6 break-words bg-[#F9FAFB] p-3 rounded-xl border border-[#F3F4F6]">
                  <FiMapPin className="shrink-0 text-[#2563EB] mt-0.5 text-base" />
                  <span className="leading-relaxed">
                     {arena.location}, {arena.cityId?.cityName}, {arena.stateId?.stateName}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-5 border-t border-[#E5E7EB]">
                  <div>
                    <span className="text-[#6B7280] text-xs font-bold uppercase tracking-wider block mb-0.5">Price</span>
                    <p className="text-[#10B981] font-bold text-2xl leading-none">
                      ₹{arena.pricePerHour ?? "0"} <span className="text-[#6B7280] text-sm font-medium">/hr</span>
                    </p>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={() => navigate(`updatearena/${arena._id}`)}
                      className="p-2.5 rounded-xl text-[#B45309] bg-[#FEF3C7] hover:bg-[#FDE68A] hover:scale-105 transition-all duration-300 shadow-sm"
                      title="Update Arena"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteArena(arena._id)}
                      className="p-2.5 rounded-xl text-[#B91C1C] bg-[#FEE2E2] hover:bg-[#FECACA] hover:scale-105 transition-all duration-300 shadow-sm"
                      title="Delete Arena"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-[24px] border border-[#E5E7EB] py-20 text-center shadow-sm">
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">No Arenas Found</h3>
            <p className="text-[#6B7280]">There are no arenas in your management scope.</p>
          </div>
        )}

      </div>
      
      <Outlet />
    </div>
  )
}

export default ManageArena
