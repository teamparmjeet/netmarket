"use client";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const tripData = {
  "THAILAND SELF (3N/4D)": [
    { id: "FE745F", name: "SONI YADAV", city: "PRAYAGRAJ", achieveDate: "06/03/2025", status: "Pending", deliveryDate: "" },
    { id: "9F00720", name: "REENA MISHRA", city: "REWA", achieveDate: "06/03/2025", status: "Pending", deliveryDate: "" },
  ],
  "DUBAI COUPLE+2 CHILDREN": [
    { id: "77718C4", name: "JAYANTA KUMAR RAY", city: "KOKRAJHAR", achieveDate: "06/03/2025", status: "Pending", deliveryDate: "" },
    { id: "88054DB", name: "SALPA NANDA TRIPURA", city: "AGARTALA", achieveDate: "06/03/2025", status: "Pending", deliveryDate: "" },
  ]
};

export default function page() {
  const [selectedTrip, setSelectedTrip] = useState("THAILAND SELF (3N/4D)");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(tripData[selectedTrip].length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = tripData[selectedTrip].slice(startIndex, startIndex + itemsPerPage);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tripData[selectedTrip]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trip Achievers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "TripAchievers.xlsx");
  };

  return (
    <div className="mx-auto lg:p-6 p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Trip Achiever List</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium">Select Trip</label>
        <select
          value={selectedTrip}
          onChange={(e) => {
            setSelectedTrip(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
        >
          {Object.keys(tripData).map((trip) => (
            <option key={trip} value={trip}>{trip}</option>
          ))}
        </select>
      </div>
      
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-600">
            <th className="border border-gray-300 px-4 py-2">Sno</th>
            <th className="border border-gray-300 px-4 py-2">DirectSellerId</th>
            <th className="border border-gray-300 px-4 py-2">DirectSellerName</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">AchieveDate</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">DeliveryDate</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((achiever, index) => (
            <tr key={achiever.id} className="text-center bg-white dark:bg-gray-800">
              <td className="border border-gray-300 px-4 py-2">{startIndex + index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{achiever.id}</td>
              <td className="border border-gray-300 px-4 py-2">{achiever.name}</td>
              <td className="border border-gray-300 px-4 py-2">{achiever.city}</td>
              <td className="border border-gray-300 px-4 py-2">{achiever.achieveDate}</td>
              <td className="border border-gray-300 px-4 py-2">{achiever.status}</td>
              <td className="border border-gray-300 px-4 py-2">{achiever.deliveryDate}</td>
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
