"use client";

import React, { useState } from "react";

export default function page() {
  const [startDate, setStartDate] = useState("2025-03-07");
  const [endDate, setEndDate] = useState("2025-03-07");
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([]);
  };

  return (
    <div className="lg:p-6 p-2 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">SalesPerformance</h2>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 justify-center items-end">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Date From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg p-2 w-48"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Date To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg p-2 w-48"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md"
        >
          Submit
        </button>
      </form>

      <div className="mt-6 border-t pt-4">
        {data.length === 1 ? (
          <p className="text-center text-gray-600 text-lg font-medium">No Data Found..</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {["S.No", "Date", "Amount", "Status"].map((header, index) => (
                    <th key={index} className="text-left p-3 border">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
            
                {[{ sno: 1, date: "06/03/2025", amount: "$100", status: "Paid" }].map((item) => (
                  <tr key={item.sno} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">{item.sno}</td>
                    <td className="p-3 border">{item.date}</td>
                    <td className="p-3 border">{item.amount}</td>
                    <td className="p-3 border text-green-600 font-semibold">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
