import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiMapPin, FiClock } from "react-icons/fi";

const PlayerHome = () => {
  const [arenas, setArenas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("/arena/allarena");
        // Just slice the first 3 for featured arenas
        setArenas((res?.data?.data || []).slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-[#1E40AF] rounded-[24px] p-10 md:p-14 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Welcome to SportsArena</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 font-light max-w-lg">
            Find and book the best sports facilities around you. Secure your slots in seconds.
          </p>
          <button
            onClick={() => navigate("/players/arenas")}
            className="group flex items-center gap-2 bg-white text-[#2563EB] px-6 py-3.5 rounded-xl font-semibold hover:bg-[#F9FAFB] hover:shadow-lg transition-all shadow-md"
          >
            Explore All Arenas
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/30 to-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full blur-2xl translate-y-1/3 pointer-events-none"></div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0F172A]">Featured Arenas</h2>
        <button 
          onClick={() => navigate("/players/arenas")}
          className="text-[#2563EB] hover:text-[#1E40AF] font-medium text-sm flex items-center gap-1 transition-colors"
        >
          View all
          <FiArrowRight />
        </button>
      </div>

      {/* Featured Arenas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {arenas.map((arena) => (
          <div key={arena._id} className="bg-white rounded-[16px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#E5E7EB] overflow-hidden flex flex-col group">
            
            <div className="relative grid grid-cols-3 gap-1 h-48 overflow-hidden">

  {/* Big Image */}
  <div className="col-span-2 relative overflow-hidden">
    <img
      src={arena.imagePath?.[0] || "https://dummyimage.com/600x400/e5e7eb/a3a3a3&text=No+Preview"}
      alt="Arena 1"
      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-500"
    />
  </div>

  {/* Small Images */}
  <div className="flex flex-col gap-1">

    <div className="relative overflow-hidden h-1/2">
      <img
        src={arena.imagePath?.[1] || "https://dummyimage.com/300x200/e5e7eb/a3a3a3&text=NA"}
        alt="Arena 2"
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-500"
      />
    </div>

    <div className="relative overflow-hidden h-1/2">
      <img
        src={arena.imagePath?.[2] || "https://dummyimage.com/300x200/e5e7eb/a3a3a3&text=NA"}
        alt="Arena 3"
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-500"
      />
    </div>

  </div>

  {/* Price Badge */}
  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#2563EB] shadow-sm">
    ₹{arena.pricePerHour}/hr
  </div>

</div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#0F172A] line-clamp-1">{arena.arenaName}</h3>
                <span className="bg-[#E5E7EB] text-[#1F2937] px-2 py-0.5 rounded-md text-xs font-semibold capitalize whitespace-nowrap ml-2">
                  {arena.sportsType}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-[#6B7280] text-sm mt-3 mb-4 line-clamp-1">
                <FiMapPin className="shrink-0" />
                <span>{arena.location}, {arena.cityId?.cityName}, {arena.stateId?.stateName}</span>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => navigate("/players/arenas")}
                  className="w-full flex justify-center items-center gap-2 bg-[#F9FAFB] text-[#2563EB] border border-[#E5E7EB] py-2.5 rounded-xl hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-colors font-semibold"
                >
                  <FiClock />
                  Book Slot
                </button>
              </div>
            </div>

          </div>
        ))}

        {arenas.length === 0 && (
          <div className="col-span-full bg-white rounded-[16px] border border-[#E5E7EB] p-10 text-center text-[#6B7280]">
            No featured arenas available.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerHome;
