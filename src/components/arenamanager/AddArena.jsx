import React, { useState } from 'react'
import axios from "../../utils/axiosInstance";
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddArena = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);

  const fetchStates = async () => {
    try {
      const res = await axios.get("/state/allstate")
      setStates(res.data.data)
    } catch (error) {
      console.error(error)
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get("/city/allcity");
      setCities(res.data.data);
    } catch (error) {
      console.error(error)
    }
  }

  const submihandler = async (data) => {
    try {
      
      const finalData = { ...data, coordinates: { lat: Number(data.lat), lng: Number(data.lng) } };
      const res = await axios.post("/arena/addarena", finalData)
      if (res.status === 201) {
        toast.success("Arena created successfully")
        reset();
      }
    } catch (error) {
      console.log(error.response?.data)
      toast.error("Error while creating arena")
    }
  };

  useEffect(() => {
    fetchStates();
    fetchCities();
  }, [])

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[16px] p-8 my-8 border border-[#E5E7EB]">
      <div className="mb-8 border-b border-[#E5E7EB] pb-4">
        <h2 className="text-2xl font-bold text-[#0F172A]">
          Create Arena
        </h2>
        <p className="text-[#6B7280] text-sm mt-1">Add a new sports facility to the platform.</p>
      </div>

      <form
        onSubmit={handleSubmit(submihandler)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Arena Name */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Arena Name
          </label>
          <input
            type="text"
            {...register("arenaName")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter arena name"
            required
          />
        </div>

        {/* Sports Type */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Sports Type
          </label>
          <input
            type="text"
            {...register("sportsType")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter sports type"
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            State
          </label>
          <select
            {...register("stateId")}
            onChange={(e) => {
              const stateId = e.target.value;
              setValue("stateId", stateId);
              const filtered = cities.filter(
                (city) => city.stateId?._id === stateId
              );
              setFilteredCities(filtered);
              setValue("cityId", "");
            }}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.stateName}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            City
          </label>
          <select
            {...register("cityId")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            required
          >
            <option value="">Select City</option>
            {filteredCities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.cityName}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Location
          </label>
          <input
            type="text"
            {...register("location")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter location address"
            required
          />
        </div>

        {/* Latitude */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            {...register("lat")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter latitude"
            required
          />
        </div>

        {/* Longitude */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            {...register("lng")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter longitude"
            required
          />
        </div>

        {/* Price Per Hour */}
        <div>
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Price Per Hour (₹)
          </label>
          <input
            type="number"
            {...register("pricePerHour")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all duration-200 text-[#0F172A]"
            placeholder="Enter price per hour"
            required
          />
        </div>

        {/* Arena Images */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#1F2937] mb-2">
            Arena Images
          </label>
          <input
            type="file"
            multiple
            {...register("images")}
            className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex items-center justify-end gap-4 mt-4 pt-6 border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-[12px] font-medium hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 bg-[#2563EB] text-white rounded-[12px] font-medium hover:bg-[#1E40AF] shadow-sm shadow-[#2563EB]/20 transition-all duration-200"
          >
            Create Arena
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddArena
