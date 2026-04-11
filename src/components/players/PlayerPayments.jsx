import React from "react";
import { FiCreditCard } from "react-icons/fi";

const PlayerPayments = () => {
  return (
    <div className="h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[20px] shadow-sm border border-[#E5E7EB] text-center max-w-lg w-full">
        
        <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-6">
          <FiCreditCard className="text-[#2563EB] text-3xl" />
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Payments Integration</h2>
        
        <p className="text-[#6B7280] mb-8 leading-relaxed">
          The payment gateway integration is currently disabled and scheduled for a later phase. 
          Please contact the arena manager directly for offline payments.
        </p>
        
        <button
          className="bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] text-[#1F2937] font-medium px-8 py-2.5 rounded-xl shadow-sm transition-colors duration-200"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PlayerPayments;
