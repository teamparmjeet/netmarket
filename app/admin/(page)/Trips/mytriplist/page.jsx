"use client";

import React from "react";

const tripAchievers = [
  { id: 1, tripName: "THAILAND SELF (3N/4D)", achieveDate: "", status: "Pending" },
  { id: 2, tripName: "DUBAI COUPLE+2 CHILDREN", achieveDate: "", status: "Pending" },
  { id: 3, tripName: "MALAYSIA SELF (3N/4D)", achieveDate: "", status: "Pending" },
  { id: 4, tripName: "MALDIVES COUPLES 3N/4D", achieveDate: "", status: "Pending" },
  { id: 5, tripName: "SWITZERLAND COUPLE+2 CHILDREN (5N/6D)", achieveDate: "", status: "Pending" },
  { id: 6, tripName: "ST. PETERSBURG (RUSSIA) SELF (4N/5D)", achieveDate: "", status: "Pending" },
  { id: 7, tripName: "SINGAPORE/MALAYSIA COUPLE+2 CHILDREN (5N/6D)", achieveDate: "", status: "Pending" },
  { id: 8, tripName: "MOSCOW COUPLE + 2 CHILDREN (4N/5D)", achieveDate: "", status: "Pending" },
  { id: 9, tripName: "AUSTRALIA SELF (5N/6D)", achieveDate: "", status: "Pending" },
  { id: 10, tripName: "AUSTRALIA COUPLE+CHILDREN (5N/6D)", achieveDate: "", status: "Pending" },
];

export default function page() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-6">Trip Achiever List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tripAchievers.map((trip) => (
          <div
            key={trip.id}
            className="bg-gray-100 dark:bg-gray-700  shadow-md rounded-lg p-5 flex items-center justify-between border-l-4 
              border-blue-600 hover:border-blue-700 transition duration-300"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{trip.tripName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Achieve Date: {trip.achieveDate || "N/A"}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                trip.status === "Pending" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {trip.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
