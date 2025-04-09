"use client";

import React, { useState, useEffect } from "react";
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
                    setDsId(response.data.dscode);
                    setTimeout(() => {
                        handleSearch(response.data.dscode);
                    }, 500);
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserData();
    }, [session?.user?.email]);

    const handleSearch = async (customDsId) => {
        const idToSearch = customDsId ?? dsId;
        if (!idToSearch.trim()) return;

        setLoading(true);
        setError(null);
        setSearchResult(null);

        try {
            const response = await axios.get(`/api/dscode/findtwobydscode/${idToSearch}`, {
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
        <div className="p-6 max-w-5xl mx-auto">
            <div className=" rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Search D.S. Network</h2>
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={dsId || ""}
                        onChange={(e) => setDsId(e.target.value)}
                        placeholder="Enter D.S. ID..."
                        className="border border-gray-300 p-2 rounded-lg w-full text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        onClick={() => handleSearch()}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        <Search size={20} />
                    </button>
                </div>
            </div>

            {loading && (
                <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-gray-300"></div>
                    <div className="h-20 bg-gray-300"></div>
                </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {searchResult && (
  <div className="space-y-6 px-4 sm:px-6 lg:px-8">

    {/* Main User Box */}
    <div className="border border-gray-300 dark:border-gray-600 p-4 shadow-sm bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition">
      <h2 className="text-base font-semibold mb-3 text-blue-700 dark:text-blue-400 border-b border-gray-200 dark:border-gray-600 pb-1">
        Main User
      </h2>
      <div className="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-3 md:space-y-0">
        {searchResult.user?.image ? (
          <Image
            src={searchResult.user.image}
            alt="User"
            width={48}
            height={48}
            className="w-12 h-12 object-cover border border-gray-300 dark:border-gray-500 rounded-full"
          />
        ) : (
          <User className="w-12 h-12 text-blue-600 dark:text-blue-400 border border-gray-300 dark:border-gray-500 p-2 rounded-full" />
        )}

        <table className="text-sm w-full text-gray-700 dark:text-gray-300">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            <tr><td className="font-bold w-28 py-1">Name:</td><td>{searchResult.user.name || "-"}</td></tr>
            <tr><td className="font-bold py-1">Email:</td><td>{searchResult.user.email || "-"}</td></tr>
            <tr><td className="font-bold py-1">Mobile:</td><td>{searchResult.user.mobileNo || "-"}</td></tr>
            <tr><td className="font-bold py-1">Address:</td><td>{searchResult.user?.address?.addressLine1 || "-"}</td></tr>
            <tr>
              <td className="font-bold py-1">DS Code:</td>
              <td className="flex flex-wrap items-center gap-2 py-1">
                <span>{searchResult.user.dscode}</span>
                <button
                  className="text-blue-600 dark:text-blue-400 underline text-xs hover:text-blue-800 dark:hover:text-blue-300"
                  onClick={() => {
                    setDsId(searchResult.user.dscode);
                    handleSearch(searchResult.user.dscode);
                  }}
                >
                  Search This
                </button>
              </td>
            </tr>
            <tr><td className="font-bold py-1">Group:</td><td>{searchResult.user.group}</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Members List */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {searchResult.members.map((member, index) => (
        <div key={index} className="border border-gray-300 dark:border-gray-600 p-4 shadow-sm bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition">
          <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2 border-b border-gray-200 dark:border-gray-600 pb-1">
            Member
          </h3>
          <div className="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-3 md:space-y-0">
            {member?.image ? (
              <Image
                src={member.image}
                alt="Member"
                width={48}
                height={48}
                className="w-12 h-12 object-cover border border-gray-300 dark:border-gray-500 rounded-full"
              />
            ) : (
              <User className="w-12 h-12 text-blue-600 dark:text-blue-400 border border-gray-300 dark:border-gray-500 p-2 rounded-full" />
            )}

            <table className="text-sm w-full text-gray-700 dark:text-gray-300">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr><td className="font-bold w-28 py-1">Name:</td><td>{member.name || "-"}</td></tr>
                <tr><td className="font-bold py-1">Email:</td><td>{member.email || "-"}</td></tr>
                <tr><td className="font-bold py-1">Mobile:</td><td>{member.mobileNo || "-"}</td></tr>
                <tr><td className="font-bold py-1">Address:</td><td>{member?.address?.addressLine1 || "-"}</td></tr>
                <tr>
                  <td className="font-bold py-1">DS Code:</td>
                  <td className="flex flex-wrap items-center gap-2 py-1">
                    <span>{member.dscode}</span>
                    <button
                      className="text-blue-600 dark:text-blue-400 underline text-xs hover:text-blue-800 dark:hover:text-blue-300"
                      onClick={() => {
                        const ds = member.dscode;
                        setDsId(ds);
                        handleSearch(ds);
                      }}
                    >
                      Search This
                    </button>
                  </td>
                </tr>
                <tr><td className="font-bold py-1">Group:</td><td>{member.group}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        </div>
    );

}
