"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Page() {
  const [achievers, setAchievers] = useState([]);
  const [filteredAchievers, setFilteredAchievers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedType, setSelectedType] = useState("");
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    const fetchAchievers = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("/api/achivers/fetch/s");
        setAchievers(response.data.data || []);
        setFilteredAchievers(response.data.data || []);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch achievers.");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievers();
  }, []);

  // Get unique achievement types
  const uniqueTypes = [...new Set(achievers.map((a) => a.achivementtype1))];

  // Get unique names (if type selected, filter; otherwise, show all)
  const uniqueNames = [
    ...new Set(
      (selectedType
        ? achievers.filter((a) => a.achivementtype1 === selectedType)
        : achievers
      ).map((a) => a.name)
    ),
  ];

  // Filter Logic
  useEffect(() => {
    let filtered = achievers.filter((achiever) => {
      const matchType = selectedType ? achiever.achivementtype1 === selectedType : true;
      const matchName = selectedName ? achiever.name === selectedName : true;
      return matchType && matchName;
    });

    setFilteredAchievers(filtered);
  }, [selectedType, selectedName, achievers]);

  return (
    <div className="mx-auto p-8 bg-white dark:bg-gray-900 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-8">
        🏆 Achievers List
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Achievement Type Filter */}
        <select
          className="p-3 border rounded-lg shadow-sm w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition"
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setSelectedName("");
          }}
        >
          <option value="">All Achievement Types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Name Filter */}
        <select
          className="p-3 border rounded-lg shadow-sm w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value="">All Names</option>
          {uniqueNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-blue-500 dark:text-blue-400 text-center">Loading achievers...</p>}
      {!loading && !error && filteredAchievers.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center">No achievers available.</p>
      )}

      {/* Achievers Table */}
      {filteredAchievers.length > 0 && (
        <div className="overflow-x-auto mt-6 border border-gray-100 dark:border-gray-600 rounded-lg">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white dark:bg-indigo-700">
              <tr>
                <th className="py-4 px-6 text-left">Image</th>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Achievement Type</th>
                <th className="py-4 px-6 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredAchievers.map((achiever) => (
                <tr
                  key={achiever.dsid}
                  className="border-b dark:border-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
                >
                  <td className="py-4 px-6">
                    <Image
                      src={achiever.image}
                      alt={achiever.name}
                      width={50}
                      height={50}
                      className="rounded-lg shadow-md"
                    />
                  </td>
                  <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{achiever.name}</td>
                  <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{achiever.achivementtype1}
                    <span className=" font-semibold ms-2">
                      {achiever.achivementtype1 === "Rank Achiever" ? `(${achiever.ranktype})` : ""}
                      {achiever.achivementtype1 === "Trip Achiever" ? `(${achiever.triptype})` : ""}
                    </span>

                  </td>
                  <td className="py-4 px-6 text-gray-800 dark:text-gray-200">{achiever.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}