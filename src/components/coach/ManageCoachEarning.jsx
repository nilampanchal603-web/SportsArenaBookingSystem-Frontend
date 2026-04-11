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



    const handlePayment = async (earning) => {
        const res = await new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });

        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

        try {
            const result = await axios.post("/payment/create-order", {
                amount: earning.fee || 500,
                bookingId: earning._id, // acts as reference point
            });

            if (!result.data) {
                toast.error("Server error. Please try again.");
                return;
            }

            const { amount, id: order_id, currency } = result.data.data;
            const parsedUser = JSON.parse(localStorage.getItem("user") || "{}");

            const options = {
                key: "rzp_test_SaEsDiqNsTPKUx", // Reuse the testing key established in previous task
                amount: amount.toString(),
                currency: currency,
                name: "Sports Arena Manager",
                description: "Coach Earning Payout",
                order_id: order_id,
                handler: async function (response) {
                    try {
                        // Triggers the explicitly existing 'CoachEarningRouter.js' status updater logic
                        const updateRes = await axios.put(`/earning/updateearnings/${earning._id}`);
                        if (updateRes.data) {
                            toast.success("Payment Successful! Coach marked as Paid.");
                            getAllEarnings();
                        }
                    } catch (error) {
                        toast.error("Error updating status.");
                    }
                },
                prefill: {
                    name: parsedUser.firstName ? `${parsedUser.firstName} ${parsedUser.lastName || ""}` : "Arena Manager",
                    email: parsedUser.email || "manager@sportsarena.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#2563EB",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.on("payment.failed", function (response) {
                toast.error("Payment failed!");
            });
            paymentObject.open();

        } catch (error) {
            toast.error("Payment initialization failed.");
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
                                <th className="px-6 py-4 font-semibold">Status</th>
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

                                        <td className="px-6 py-4 text-[#6B7280]">{earning.date ? new Date(earning.date).toLocaleDateString("en-IN") : "N/A"} </td>

                                        <td className="px-6 py-4 font-semibold text-[#10B981]">₹ {earning.fee || 500}</td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${earning.status === "Paid"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {earning.status || "Pending"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                                            {earning.status !== "Paid" && (
                                                <button
                                                    onClick={() => handlePayment(earning)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#D1FAE5] text-[#065F46] hover:bg-[#A7F3D0] transition-colors whitespace-nowrap"
                                                >
                                                    Pay Now
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteEarning(earning._id)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors whitespace-nowrap"
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
