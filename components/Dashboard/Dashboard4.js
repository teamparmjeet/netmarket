"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
    Wallet,
    Star,
    TrendingUp,
} from "lucide-react";

export default function Dashboard4() {
    const { data: session } = useSession();
    const [dsid, setDsid] = useState("");
    const [data, setData] = useState(null);
    const [rspData, setRspData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!session?.user?.email) return;
            try {
                const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
                setDsid(response.data.dscode);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserData();
    }, [session?.user?.email]);

    useEffect(() => {
        if (!dsid) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch both APIs simultaneously
                const [teamResponse, rspResponse] = await Promise.all([
                    axios.get(`/api/dashboard/teamsp/${dsid}`),
                    axios.get(`/api/dashboard/rsp/${dsid}`)
                ]);

                setData(teamResponse.data);
                setRspData(rspResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dsid]);



    if (loading) return <SkeletonLoader />;
    if (error) return <p className="text-red-500 text-center font-semibold">{error}</p>;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">


                <div className="relative p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border overflow-hidden">
                    <div className={`absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] from-purple-500`}></div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"><Star className="text-purple-500" /></div>
                        <p className="text-gray-700 dark:text-white font-semibold">Current Weak</p>
                    </div>
                    <p className="text-gray-700 dark:text-white font-semibold">SAO SP: <span className="text-blue-800 ms-4">{data?.currentWeekSaoSP || 0}</span></p>
                    <p className="text-gray-700 dark:text-white font-semibold">SGO SP: <span className="text-blue-800 ms-4">{data?.currentWeekSgoSP || 0}</span></p>
                </div>


                <div className="relative p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border overflow-hidden">
                    <div className={`absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] from-purple-500`}></div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"><TrendingUp className="text-purple-500" /></div>
                        <p className="text-gray-700 dark:text-white font-semibold">Current RSP</p>
                    </div>
                    <p className="text-gray-700 dark:text-white font-semibold">Self RSP:{rspData.currentWeekTotal}</p>
                    <p className="text-gray-700 dark:text-white font-semibold">Team RSP:{rspData.teamCurrentWeekTotal}</p>
                </div>

                <div className="relative p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border overflow-hidden">
                    <div className={`absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] from-purple-500`}></div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"><Star className="text-purple-500" /></div>
                        <p className="text-gray-700 dark:text-white font-semibold">Total RSP</p>
                    </div>
                    <p className="text-gray-700 dark:text-white font-semibold">Self RSP: {rspData.totalsp}</p>
                    <p className="text-gray-700 dark:text-white font-semibold">Team RSP: {rspData.teamTotalsp}</p>
                </div>

                <div className="flex justify-center lg:col-span-3 w-full">
                    <div className="relative p-6 w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-transform hover:scale-[1.02] duration-300">

                        {/* Decorative Ribbon */}
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-purple-500"></div>

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 shadow">
                                <Wallet className="text-green-500 w-6 h-6" />
                            </div>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">Income Overview</p>
                        </div>

                        {/* Info Rows */}
                        <div className="space-y-2 text-sm">
                            <p className="text-gray-600 dark:text-gray-300">
                                <span className="font-semibold">Sales Commission:</span> <span className="ml-2 text-gray-800 dark:text-white">10</span>
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                <span className="font-semibold">Sales Growth:</span> <span className="ml-2 text-gray-800 dark:text-white">10</span>
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                <span className="font-semibold">Sales Performance:</span> <span className="ml-2 text-gray-800 dark:text-white">10</span>
                            </p>
                        </div>

                        {/* Total Income */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-md">
                            <p className="text-gray-700 dark:text-white font-semibold">
                                {/* Total Income: <span className="text-blue-700 dark:text-blue-400 ms-2">{data?.totalIncome || 0}</span> */}
                                Total Income: <span className="text-blue-700 dark:text-blue-400 ms-2">30</span>
                            </p>
                        </div>
                    </div>
                </div>





            </div>
        </div>
    )
}

function SkeletonLoader() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="p-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl h-40"></div>
            ))}
        </div>
    );
}