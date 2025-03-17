"use client";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const rankData = {
  "TOPAZ DS": [
    { id: "69C765", name: "KULDEEP", city: "Delhi 9711190019" },
    { id: "555245", name: "VIKAS", city: "Charkhi Dadri" },
    { id: "52A896", name: "ANILVIR", city: "Bhiwani" },
  ],
  "RUBY STAR DS": [
    { id: "B8C1B2", name: "RISHI RAM SAHU", city: "Nawapara" },
    { id: "58D038", name: "KOMAL PRASAD SAHU", city: "Nawapara" },
    { id: "7DE261", name: "PRADEEP NAMDEO DHOTE", city: "Nagpur" },
  ],
  "DIAMOND DS": [
    { id: "6F53AB", name: "RAMVIR SINGH", city: "Jaipur" },
    { id: "0733FA", name: "RATNAMALA RAVINDRA SANGOLKAR", city: "Nagpur" },
    { id: "3D9888", name: "SAJJNA", city: "Pilani" },
  ]
};

export default function page() {
  const [selectedRank, setSelectedRank] = useState("TOPAZ DS");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(rankData[selectedRank].length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = rankData[selectedRank].slice(startIndex, startIndex + itemsPerPage);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rankData[selectedRank]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rank Achievers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "RankAchievers.xlsx");
  };

  return (
    <div className="mx-auto lg:p-6 p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Rank Achiever List</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium">Select Rank</label>
        <select
          value={selectedRank}
          onChange={(e) => {
            setSelectedRank(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
        >
          {Object.keys(rankData).map((rank) => (
            <option key={rank} value={rank}>{rank}</option>
          ))}
        </select>
      </div>
      
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-600">
            <th className="border border-gray-300 px-4 py-2">Sno</th>
            <th className="border border-gray-300 px-4 py-2">DS ID</th>
            <th className="border border-gray-300 px-4 py-2">DS Name</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((achiever, index) => (
            <tr key={achiever.id} className="text-center bg-white dark:bg-gray-800">
              <td className="border border-gray-300 px-4 py-2">{startIndex + index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{achiever.id}</td>
              <td className="border border-gray-300 px-4 py-2">{achiever.name}</td>
              <td className="border border-gray-300 px-4 py-2">{achiever.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
      <button
        onClick={exportToExcel}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-40"
      >
        Export to Excel
      </button>
    </div>
  );
}
