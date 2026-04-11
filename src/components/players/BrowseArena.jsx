import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMapPin } from "react-icons/fi";

const BrowseArena = () => {
  const [arenas, setArenas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArenas = async () => {
      try {
        const res = await axios.get("/arena/allarena");
        setArenas(res?.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArenas();
  }, []);

  const filteredArenas = arenas.filter((arena) =>
    (arena?.arenaName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (arena?.sportsType || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">Browse Arenas</h2>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-[#9CA3AF]" />
          </div>
          <input
            type="text"
            placeholder="Search by name or sport..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A] shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArenas.length > 0 ? (
          filteredArenas.map((arena) => (
            <div key={arena._id} className="bg-white rounded-[16px] shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E5E7EB] flex flex-col group overflow-hidden">

              <div className="relative grid grid-cols-3 gap-1 h-52 overflow-hidden rounded-[16px]">

                {/* Big Image */}
                <div className="col-span-2 h-52 overflow-hidden bg-[#F3F4F6] relative">
                  <img
                    src={arena.imagePath?.[0] || "https://dummyimage.com/600x400/e5e7eb/a3a3a3&text=No+Preview"}
                    className="absolute inset-0 h-full w-full object-cover hover:scale-110 transition duration-500"
                    alt="Arena 1"
                  />
                </div>

                {/* Small Images */}
                <div className="flex flex-col gap-1 h-52">

                  <div className="h-full overflow-hidden bg-[#F3F4F6] relative">
                    <img
                      src={arena.imagePath?.[1] || "https://dummyimage.com/300x200/e5e7eb/a3a3a3&text=NA"}
                      className="absolute inset-0 h-full w-full object-cover hover:scale-110 transition duration-500"
                      alt="Arena 2"
                    />
                  </div>

                  <div className="h-full overflow-hidden bg-[#F3F4F6] relative">
                    <img
                      src={arena.imagePath?.[2] || "https://dummyimage.com/300x200/e5e7eb/a3a3a3&text=NA"}
                      className="absolute inset-0 h-full w-full object-cover hover:scale-110 transition duration-500"
                      alt="Arena 3"
                    />
                  </div>

                </div>

                {/* Sports Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-[#374151] px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide shadow-sm">
                    {arena.sportsType}
                  </span>
                </div>

              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-[#0F172A] line-clamp-1 pr-2">{arena.arenaName}</h3>
                  <div className="text-right shrink-0">
                    <p className="text-[#10B981] font-bold text-lg leading-none">₹{arena.pricePerHour}</p>
                    <span className="text-[#6B7280] text-xs">per hour</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-[#6B7280] text-sm mb-6">
                  <FiMapPin className="shrink-0 mt-0.5" />
                  <p className="line-clamp-2 leading-relaxed">{arena.location}, {arena.cityId?.cityName}, {arena.stateId?.stateName}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => navigate("/players/booking/addbooking", { state: { pricePerHour: arena.pricePerHour, arenaId: arena._id } })}
                    className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white py-2.5 rounded-xl font-semibold shadow-sm shadow-[#2563EB]/20 transition-all duration-200"
                  >
                    Book Arena
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm">
            <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSearch className="text-[#9CA3AF] text-2xl" />
            </div>
            <p className="text-[#4B5563] font-medium text-lg">No arenas found</p>
            <p className="text-[#6B7280] text-sm mt-1">We couldn't find anything matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseArena
