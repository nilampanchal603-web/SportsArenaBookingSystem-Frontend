import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiShield } from "react-icons/fi";

const PlayerProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser({
          firstName: "Player",
          lastName: "User",
          email: "player@example.com",
          role: "player"
        });
      }
    } catch (e) {
      console.error("Error parsing user info", e);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="bg-white shadow-sm border border-[#E5E7EB] rounded-[16px] overflow-hidden">
        
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] relative">
          <div className="absolute -bottom-12 left-8 border-4 border-white rounded-full bg-white shadow-sm overflow-hidden">
            <div className="w-24 h-24 bg-[#E5E7EB] flex items-center justify-center text-[#6B7280] text-3xl font-bold uppercase">
              {user.firstName?.charAt(0) || "U"}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]">
                {user.firstName} {user.lastName}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] uppercase tracking-wider">
                <FiShield /> {user.role || "Player"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E5E7EB]">
            
            <div className="col-span-1">
              <label className="text-sm font-medium text-[#6B7280] block mb-1">First Name</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px]">
                <FiUser className="text-[#9CA3AF]" />
                <span className="text-[#0F172A] font-medium">{user.firstName}</span>
              </div>
            </div>

            <div className="col-span-1">
              <label className="text-sm font-medium text-[#6B7280] block mb-1">Last Name</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px]">
                <FiUser className="text-[#9CA3AF]" />
                <span className="text-[#0F172A] font-medium">{user.lastName}</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-[#6B7280] block mb-1">Email Address</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px]">
                <FiMail className="text-[#9CA3AF]" />
                <span className="text-[#0F172A] font-medium">{user.email}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PlayerProfile;
