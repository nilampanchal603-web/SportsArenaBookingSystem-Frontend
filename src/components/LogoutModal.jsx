import React from 'react';

const LogoutModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-[16px] shadow-2xl p-6 w-full max-w-sm transform scale-100 transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-[#0F172A] text-center mb-2">
          Confirm Logout
        </h3>
        <p className="text-[#6B7280] text-center mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-[#E5E7EB] text-[#1F2937] font-medium rounded-xl hover:bg-[#D1D5DB] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 shadow-md shadow-red-500/20 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
