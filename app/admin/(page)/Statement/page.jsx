"use client";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function CommissionStatement() {
  const [dateFrom, setDateFrom] = useState("2025-03-09");
  const [dateTo, setDateTo] = useState("2025-03-09");
  const [filteredData, setFilteredData] = useState([]);

  const allData = [
    { date: "2025-03-05", amount: "₹1200", description: "Level 1 Commission" },
    { date: "2025-03-06", amount: "₹1500", description: "Level 2 Commission" },
    { date: "2025-03-07", amount: "₹2000", description: "Referral Bonus" },
    { date: "2025-03-08", amount: "₹500", description: "Monthly Incentive" },
    { date: "2025-03-09", amount: "₹750", description: "Special Reward" }
  ];

  const applyFilter = () => {
    const filtered = allData.filter(
      (entry) => entry.date >= dateFrom && entry.date <= dateTo
    );
    setFilteredData(filtered);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Commission Statement");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "CommissionStatement.xlsx");
  };

  return (
    <div className="mx-auto lg:p-6 p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Commission Statement</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4 items-end">
        <div>
          <label className="block text-sm font-medium">Date From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"
          />
        </div>
      </div>
      
      <button
        onClick={applyFilter}
        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-lg mb-4 min-w-20 max-w-44"
      >
        Show
      </button>
      
      {filteredData.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-600">
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr key={index} className="text-center bg-white dark:bg-gray-800">
                <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center p-4 text-gray-500">No Data Found.. No records</p>
      )}
      
      {filteredData.length > 0 && (
        <button
          onClick={exportToExcel}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-40"
        >
          Export to Excel
        </button>
      )}
    </div>
  );
}