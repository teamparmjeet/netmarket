"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
export default function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/user/fethall/user");
                setData(response.data.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center mb-6">User List</h2>

            {loading ? (
                <div className="h-96 flex flex-col gap-2">
                    <div className="w-full h-7 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-full h-7 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-full h-7 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="w-full h-7 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            ) : error ? (
                <p className="text-center text-red-500 font-semibold">{error}</p>
            ) : (
                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full border border-gray-200 dark:border-white shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-left">
                                <th className="py-3 px-4 border-r">Ds Code</th>
                                <th className="py-3 px-4 border-r">Name</th>
                                <th className="py-3 px-4 border-r">Email</th>
                                <th className="py-3 px-4 border-r">User Type</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((user, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b ${index % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
                                            } hover:bg-blue-100 dark:hover:bg-gray-600 text-black dark:text-white transition duration-200`}
                                    >
                                        <td className="py-3 px-4 border-r">{user.dscode}</td>
                                        <td className="py-3 px-4 border-r">{user.name}</td>
                                        <td className="py-3 px-4 border-r  font-light">{user.email}</td>
                                        <td className="py-3 px-4 border-r font-medium text-indigo-600 dark:text-sky-400">
                                            {user.usertype === "0" ? "User" : "Admin"}
                                        </td>
                                        <td className="py-3 px-4  font-medium text-indigo-600 dark:text-sky-400">
                                            {user.status === "0" ? "In Active" : "Active"}
                                        </td>
                                        <td className="py-3 px-4 border-r">
                                            <Link href={`/superadmin/Userprofile/user/${user.email}`}>
                                                View
                                            </Link>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500 font-medium">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
