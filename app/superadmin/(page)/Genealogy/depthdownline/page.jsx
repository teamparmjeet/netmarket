"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Page() {
    const { data: session } = useSession();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!session?.user?.email) return;
            try {
                const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
                if (response.data) {
                    setData(response.data.dscode);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserData();
    }, [session?.user?.email]);

    useEffect(() => {
        const handleSearch = async () => {
            if (!data) return;
            setLoading(true);
            setError(null);
            setSearchResult(null);

            try {
                const response = await axios.get(`/api/dscode/findtwobydscode/${data}`);
                if (response.data.success) {
                    setSearchResult({
                        members: response.data.relatedUsers, // Downline members
                    });
                } else {
                    setError("No user found with this D.S. ID.");
                }
            } catch (err) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };
        handleSearch();
    }, [data]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="lg:p-6 p-2 max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg dark:shadow-none rounded-lg border border-white dark:border-gray-600">
            <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-6">Depth Downline</h2>

            {/* Skeleton Loader */}
            {loading && (
                <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-6 bg-gray-200 rounded w-4/6"></div>
                </div>
            )}

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Display Table */}
            {!loading && searchResult && (
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full bg-white dark:bg-gray-800 border-collapse">
                        <thead className="bg-blue-600  text-white dark:text-gray-200 text-sm uppercase sticky top-0">
                            <tr>
                                {[
                                    "S.No",
                                    "DS Code",
                                    "DS Name",
                                    "DOJ",
                                    "Sponsor DS Code",
                                    "Self SP",
                                    "Total SP",
                                    "Curr. Total SP",
                                    "Sale Group",
                                    "Curr. Self RSP",
                                    "Curr. Total RSP",
                                ].map((header, index) => (
                                    <th key={index} className="p-3 border border-gray-300 text-center">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                           
                            {searchResult.members?.map((member, index) => (
                                <tr key={index} className="text-center border-t text-gray-800 dark:text-gray-200">
                                    <td className="p-3 border">{index + 2}</td>
                                    <td className="p-3 border">{member?.dscode}</td>
                                    <td className="p-3 border">{member?.name}</td>
                                    <td className="p-3 border">{member?.createdAt ? new Date(member.createdAt).toLocaleDateString("en-GB") : "N/A"}</td>
                                    <td className="p-3 border">{member?.sponsorDscode}</td>
                                    <td className="p-3 border">{member?.selfSp || "-"}</td>
                                    <td className="p-3 border">{member?.totalSp || "-"}</td>
                                    <td className="p-3 border">{member?.currTotalSp || "-"}</td>
                                    <td className="p-3 border">{member?.saleGroup || "-"}</td>
                                    <td className="p-3 border">{member?.currSelfRsp || "-"}</td>
                                    <td className="p-3 border">{member?.currTotalRsp || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            <p className="text-lg font-semibold  text-gray-800 dark:text-white text-center mt-4">
                Total Direct Seller:{" "}
                <span className="text-blue-600">{searchResult?.members?.length || 0}</span>
            </p>


        </div>
    );
}
