"use client";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function ViewGrievanceStatus() {
  const [dateFrom, setDateFrom] = useState("2025-01-01");
  const [dateTo, setDateTo] = useState("2025-03-09");
  const [filteredGrievances, setFilteredGrievances] = useState([]);

  const allGrievances = [
    { id: 1, grievanceNo: "GRV101", status: "Pending", date: "2025-02-15" },
    { id: 2, grievanceNo: "GRV102", status: "Resolved", date: "2025-03-05" },
    { id: 3, grievanceNo: "GRV103", status: "In Progress", date: "2025-03-07" },
  ];

  const applyFilter = () => {
    const filtered = allGrievances.filter(
      (grievance) => grievance.date >= dateFrom && grievance.date <= dateTo
    );
    setFilteredGrievances(filtered);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredGrievances);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grievance Status");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "GrievanceStatus.xlsx");
  };

  return (
    <div className="mx-auto lg:p-6 p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white ">
      <h2 className="text-2xl font-semibold mb-4 text-center">View Grievance/Request Status</h2>

      <div className="grid grid-cols-3 gap-4 mb-6 items-end">
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
      <div className="w-40 mb-6">
        <button
          onClick={applyFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Show
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-600">
            <th className="border border-gray-300 px-4 py-2">Grievance No</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrievances.length > 0 ? (
            filteredGrievances.map((grievance) => (
              <tr key={grievance.id} className="text-center bg-white dark:bg-gray-800">
                <td className="border border-gray-300 px-4 py-2">{grievance.grievanceNo}</td>
                <td className="border border-gray-300 px-4 py-2">{grievance.status}</td>
                <td className="border border-gray-300 px-4 py-2">{grievance.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {filteredGrievances.length > 0 && (
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