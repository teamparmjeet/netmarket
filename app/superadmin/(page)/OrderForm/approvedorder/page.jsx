"use client";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function ApprovedOrders() {
  const [dateFrom, setDateFrom] = useState("2025-03-09");
  const [dateTo, setDateTo] = useState("2025-03-09");
  const [year, setYear] = useState("2023-24");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const allOrders = [
    { id: 1, orderNo: "ORD201", amount: "₹1200", paymentMode: "Online", date: "2025-03-08", year: "2023-24" },
    { id: 2, orderNo: "ORD202", amount: "₹1500", paymentMode: "Cash", date: "2025-03-09", year: "2023-24" },
    { id: 3, orderNo: "ORD203", amount: "₹2000", paymentMode: "Bank Transfer", date: "2025-03-10", year: "2023-24" },
  ];

  const applyFilter = () => {
    const filtered = allOrders.filter(
      (order) => order.date >= dateFrom && order.date <= dateTo && order.year === year
    );
    setFilteredOrders(filtered);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Approved Orders");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "ApprovedOrders.xlsx");
  };

  return (
    <div className="mx-auto p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Purchase List</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-4 items-end">
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
        <div>
          <label className="block text-sm font-medium">Select Financial Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white"
          >
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
          </select>
        </div>
      </div>
      
      <button
        onClick={applyFilter}
        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-lg mb-4 min-w-20 max-w-44"
      >
        Show
      </button>
      
      {filteredOrders.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-600">
              <th className="border border-gray-300 px-4 py-2">Order No</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Payment Mode</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="text-center bg-white dark:bg-gray-800">
                <td className="border border-gray-300 px-4 py-2">{order.orderNo}</td>
                <td className="border border-gray-300 px-4 py-2">{order.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{order.paymentMode}</td>
                <td className="border border-gray-300 px-4 py-2">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center p-4 text-gray-500">No Sales Summary Available</p>
      )}
      
      <button
        onClick={exportToExcel}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-40"
      >
        Export to Excel
      </button>
    </div>
  );
}