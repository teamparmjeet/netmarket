"use client";

import React, { useState } from "react";
import { Search, User } from "lucide-react";

export default function page() {
    const [dsId, setDsId] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [hoveredUserId, setHoveredUserId] = useState(null);

    const handleSearch = () => {
        if (dsId === "123") {
            setSearchResult({
                superAdmin: {
                    name: "John Doe",
                    role: "Super Admin",
                    dsId: "DS-001",
                    email: "john.doe@example.com",
                    mobile: "+91 98765 43210",
                    address: "123 Main St, New Delhi",
                },
                members: [
                    {
                        name: "Alice Smith",
                        role: "Manager",
                        dsId: "DS-002",
                        email: "alice.smith@example.com",
                        mobile: "+91 91234 56789",
                        address: "456 Market St, Mumbai",
                    },
                    {
                        name: "Bob Johnson",
                        role: "Manager",
                        dsId: "DS-003",
                        email: "bob.johnson@example.com",
                        mobile: "+91 90123 45678",
                        address: "789 Business Rd, Bangalore",
                    },
                ],
            });
        } else {
            setSearchResult(null);
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

            {searchResult && (
                <div className="flex flex-col items-center space-y-8">
                    <div
                        className="relative flex flex-col items-center group"
                        onMouseEnter={() => setHoveredUserId(searchResult.superAdmin.dsId)}
                        onMouseLeave={() => setHoveredUserId(null)}
                    >
                        <div className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center w-48 cursor-pointer">
                            <User className="w-12 h-12 bg-white text-blue-600 rounded-full p-2 mb-2" />
                            <p className="text-lg font-semibold">{searchResult.superAdmin.name}</p>
                            <p className="text-sm opacity-75">{searchResult.superAdmin.role}</p>
                            <p className="text-xs bg-white text-blue-600 px-2 py-1 rounded mt-2">
                                {searchResult.superAdmin.dsId}
                            </p>
                        </div>

                        {hoveredUserId === searchResult.superAdmin.dsId && (
                            <div className="absolute top-20 bg-white border p-4 rounded-lg shadow-lg w-60 text-sm transition-opacity opacity-100">
                                <p><strong>Full Name:</strong> {searchResult.superAdmin.name}</p>
                                <p><strong>Email:</strong> {searchResult.superAdmin.email}</p>
                                <p><strong>Mobile:</strong> {searchResult.superAdmin.mobile}</p>
                                <p><strong>Address:</strong> {searchResult.superAdmin.address}</p>
                            </div>
                        )}

                        <div className="w-[2px] h-8 bg-gray-400"></div>
                    </div>

                    <div className="flex space-x-12 items-start relative">
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[80%] h-[2px] bg-gray-400"></div>

                        {searchResult.members.map((member, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center group"
                                onMouseEnter={() => setHoveredUserId(member.dsId)}
                                onMouseLeave={() => setHoveredUserId(null)}
                            >
                                <div className="w-[2px] h-8 bg-gray-400"></div>

                                <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center w-48 cursor-pointer">
                                    <User className="w-12 h-12 bg-white text-green-500 rounded-full p-2 mb-2" />
                                    <p className="text-lg font-semibold">{member.name}</p>
                                    <p className="text-sm opacity-75">{member.role}</p>
                                    <p className="text-xs bg-white text-green-600 px-2 py-1 rounded mt-2">
                                        {member.dsId}
                                    </p>
                                </div>

                                {hoveredUserId === member.dsId && (
                                    <div className="absolute top-20 bg-white border p-4 rounded-lg shadow-lg w-60 text-sm transition-opacity opacity-100">
                                        <p><strong>Full Name:</strong> {member.name}</p>
                                        <p><strong>Email:</strong> {member.email}</p>
                                        <p><strong>Mobile:</strong> {member.mobile}</p>
                                        <p><strong>Address:</strong> {member.address}</p>
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
