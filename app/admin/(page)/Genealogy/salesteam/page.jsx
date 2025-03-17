"use client";

import React, { useState,useEffect } from "react";
import { Search, User } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();

    const [usertype, setUsertype] = useState(null);
    const [dscode, setDscode] = useState(null);
    const [dsId, setDsId] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [hoveredUserId, setHoveredUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            if (!session?.user?.email) return;
            try {
                const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
                if (response.data) {
                    setUsertype(response.data.usertype);
                    setDscode(response.data.dscode);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserData();
    }, [session?.user?.email]);

    const handleSearch = async () => {
        if (!dsId.trim()) return;

        setLoading(true);
        setError(null);
        setSearchResult(null);

        try {
            const response = await axios.get(`/api/dscode/findtwobydscode/${dsId}`, {
                params: { usertype, dscode }, 
            });
            if (response.data.success) {
                setSearchResult({
                    user: response.data.mainUser,
                    members: response.data.relatedUsers,
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

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto relative">
            <div className="flex items-center space-x-2 mb-6">
                <input
                    type="text"
                    value={dsId}
                    onChange={(e) => setDsId(e.target.value)}
                    placeholder="Enter D.S. ID..."
                    className="border p-2 rounded-lg w-full"
                    onKeyDown={handleKeyPress}
                />
                <button
                    onClick={handleSearch}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Search size={20} />
                </button>
            </div>

            {loading && (
                <div className="animate-pulse space-y-4">
                    <div className=" h-20 bg-gray-300 rounded-lg"></div>
                    <div className=" h-20 bg-gray-300 rounded-lg"></div>
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {searchResult && (
                <div className="flex flex-col items-center space-y-8">
                  
                    <div
                        className="relative flex flex-col items-center group"
                        onMouseEnter={() => setHoveredUserId(searchResult.user.dscode)}
                        onMouseLeave={() => setHoveredUserId(null)}
                    >
                        <div className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center w-48 cursor-pointer">
                            {searchResult?.user?.image ? (
                                <Image
                                    src={searchResult.user.image}
                                    alt="User"
                                    width={60}
                                    height={60}
                                    className="w-12 h-12 rounded-full mb-2 object-cover"
                                />
                            ) : (
                                <User className="w-12 h-12 bg-white text-blue-600 rounded-full p-2 mb-2" />
                            )}

                            <p className="text-lg font-semibold text-center">{searchResult.user.name}</p>
                            <p className="text-sm opacity-75">Main User</p>
                            <p className="text-xs bg-white text-blue-600 px-2 py-1 rounded mt-2">
                                {searchResult.user.dscode}
                            </p>
                        </div>

                        {hoveredUserId === searchResult.user.dscode && (
                            <div className="absolute top-20 bg-white border p-4 rounded-lg shadow-lg w-60 text-sm">
                                <p><strong>Full Name:</strong> {searchResult.user.name}</p>
                                <p><strong>Email:</strong> {searchResult.user.email}</p>
                                <p><strong>Mobile:</strong> {searchResult.user.mobileNo}</p>
                                <p><strong>Address:</strong> {searchResult.user?.address?.addressLine1}</p>
                            </div>
                        )}
                        <div className="w-[2px] h-8 bg-gray-400"></div>
                    </div>

                    {/* Members */}
                    <div className="flex space-x-12 items-start relative">
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[80%] h-[2px] bg-gray-400"></div>

                        {searchResult.members.map((member, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center group"
                                onMouseEnter={() => setHoveredUserId(member.dscode)}
                                onMouseLeave={() => setHoveredUserId(null)}
                            >
                                <div className="w-[2px] h-8 bg-gray-400"></div>
                                <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center w-48 cursor-pointer">
                                    <User className="w-12 h-12 bg-white text-green-500 rounded-full p-2 mb-2" />
                                    <p className="text-lg font-semibold">{member.name}</p>
                                    <p className="text-sm opacity-75">{member.role || "Member"}</p>
                                    <p className="text-xs bg-white text-green-600 px-2 py-1 rounded mt-2">
                                        {member.dscode}
                                    </p>
                                </div>
                                {hoveredUserId === member.dscode && (
                                    <div className="absolute top-20 bg-white border p-4 rounded-lg shadow-lg w-60 text-sm">
                                        <p><strong>Full Name:</strong> {member.name}</p>
                                        <p><strong>Email:</strong> {member.email}</p>
                                        <p><strong>Mobile:</strong> {member.mobileNo}</p>
                                        <p><strong>Address:</strong> {member?.address?.addressLine1}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
