import axios from "../../utils/axiosInstance"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

const AdminPricing = () => {
    const [pricing, setPricing] = useState({
        hourlyPricing: "",
        dailyPricing: "",
        monthlyPricing: ""
    })

    const fetchPricing = async () => {
        try {
            const res = await axios.get("/admin/pricing")
            setPricing({
                hourlyPricing: res?.data?.data?.hourlyPricing ?? "",
                dailyPricing: res?.data?.data?.dailyPricing ?? "",
                monthlyPricing: res?.data?.data?.monthlyPricing ?? ""
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to fetch pricing")
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put("/admin/pricing", pricing)
            toast.success("Pricing updated")
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to update pricing")
        }
    }

    useEffect(() => {
        fetchPricing()
    }, [])

    return (
        <div className="p-6 bg-gray-100 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Pricing</h2>
            <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow max-w-lg space-y-4">
                <input
                    value={pricing.hourlyPricing}
                    onChange={(e) => setPricing({ ...pricing, hourlyPricing: e.target.value })}
                    placeholder="Hourly pricing"
                    className="w-full border rounded-lg px-3 py-2"
                />
                <input
                    value={pricing.dailyPricing}
                    onChange={(e) => setPricing({ ...pricing, dailyPricing: e.target.value })}
                    placeholder="Daily pricing"
                    className="w-full border rounded-lg px-3 py-2"
                />
                <input
                    value={pricing.monthlyPricing}
                    onChange={(e) => setPricing({ ...pricing, monthlyPricing: e.target.value })}
                    placeholder="Monthly pricing"
                    className="w-full border rounded-lg px-3 py-2"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Save Pricing</button>
            </form>
        </div>
    )
}

export default AdminPricing
