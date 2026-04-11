import axios from "../../utils/axiosInstance"
import React, { useState } from 'react'
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiTrash2 } from "react-icons/fi";

const ManageMySession = () => {
    const [sessions, setSession] = useState()

    const getDynamicStatus = (dateStr, timeStr) => {
        try {
            if (!timeStr || !dateStr) return "Upcoming";
            const parts = timeStr.split('-');
            if (parts.length < 2) return "Upcoming";

            const sessionDate = new Date(dateStr);
            if (isNaN(sessionDate)) return "Upcoming";

            const now = new Date();
            const parseTime = (t) => {
                const [h, m] = t.split(':');
                return { h: parseInt(h || 0, 10), m: parseInt(m || 0, 10) };
            };

            const start = parseTime(parts[0].trim());
            const end = parseTime(parts[1].trim());

            const startDate = new Date(sessionDate);
            startDate.setHours(start.h, start.m, 0, 0);

            const endDate = new Date(sessionDate);
            endDate.setHours(end.h, end.m, 0, 0);

            if (now > endDate) return "Completed";
            if (now >= startDate && now <= endDate) return "Ongoing";
            return "Upcoming";
        } catch (error) {
            return "Upcoming";
        }
    };

    const getAllSession = async () => {
        try {
            const res = await axios.get("/mysession/allsession")

            setSession(res.data.data)

        } catch (error) {
            console.log("STEP 3 - ERROR", error)
        }
    };
    useEffect(() => {
        getAllSession()
    }, [])

    const deletesession = async (id) => {
        try {
            const res = await axios.delete(`/mysession/deletesession/${id}`)

            if (res.status === 200) {
                toast.success("Session Deleted ✅")
                getAllSession()
            }
        } catch (error) {
            console.error(error);
            toast.error("Delete failed ❌");

        }
    }



    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#0F172A]">My Sessions</h2>
                <button
                    onClick={getAllSession}
                    className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#1F2937] rounded-xl font-medium hover:bg-[#F9FAFB] transition-colors shadow-sm"
                >
                    Refresh List
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    sessions?.map((session) => {
                        const displayStatus = session.status === "Cancelled" ? "Cancelled" : getDynamicStatus(session.date, session.time);
                        return (
                            <div key={session._id}
                                className="bg-white rounded-[16px] shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E5E7EB] p-6 flex flex-col relative overflow-hidden group">

                                <div className={`absolute top-0 left-0 w-1 h-full ${displayStatus === "Upcoming" ? "bg-[#2563EB]" :
                                    displayStatus === "Ongoing" ? "bg-[#EAB308]" :
                                        displayStatus === "Completed" ? "bg-[#10B981]" : "bg-[#EF4444]"
                                    }`}></div>

                                <div className="flex justify-between items-start mb-4 pl-2">
                                    <h3 className="text-lg font-bold text-[#0F172A] line-clamp-1 group-hover:text-[#2563EB] transition-colors">
                                        {session.sessionTitle}
                                    </h3>
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider
                                        ${displayStatus === "Upcoming" ? "bg-[#EFF6FF] text-[#2563EB]" : displayStatus === "Ongoing" ? "bg-[#FEF9C3] text-[#A16207]" : displayStatus === "Completed" ? "bg-[#D1FAE5] text-[#059669]" : "bg-[#FEE2E2] text-[#DC2626]"}`}
                                    >
                                        {displayStatus}
                                    </span>
                                </div>

                                <div className="space-y-3 pl-2 text-sm text-[#4B5563] mb-6 flex-1">
                                    <span className="inline-block bg-[#F3F4F6] text-[#374151] px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-2">
                                        {session.sportType}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <FiCalendar className="text-[#9CA3AF] shrink-0" />
                                        <span>{session.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiClock className="text-[#9CA3AF] shrink-0" />
                                        <span>{session.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiMapPin className="text-[#9CA3AF] shrink-0" />
                                        <span className="line-clamp-1">{session.arenaName || session.arenaId?.arenaName || "Sports Arena"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiUsers className="text-[#9CA3AF] shrink-0" />
                                        <span>{session.players} {session.players === 1 ? 'Player' : 'Players'}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-[#E5E7EB] mt-auto">
                                    <button
                                        onClick={() => deletesession(session._id)}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors"
                                    >
                                        <FiTrash2 /> Delete Session
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }

                {(!sessions || sessions.length === 0) && (
                    <div className="col-span-full bg-white rounded-[16px] border border-[#E5E7EB] py-16 text-center text-[#6B7280]">
                        No sessions found for this coach.
                    </div>
                )}
            </div>

        </div>

    )
}

export default ManageMySession
