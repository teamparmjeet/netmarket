"use client";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function PendingOrders() {
  const [dateFrom, setDateFrom] = useState("2025-03-09");
  const [dateTo, setDateTo] = useState("2025-03-09");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const allOrders = [
    { id: 1, orderNo: "ORD123", amount: "₹500", paymentMode: "Online", date: "2025-03-08" },
    { id: 2, orderNo: "ORD124", amount: "₹700", paymentMode: "Cash", date: "2025-03-09" },
    { id: 3, orderNo: "ORD125", amount: "₹1000", paymentMode: "Bank Transfer", date: "2025-03-10" },
  ];

  const applyFilter = () => {
    const filtered = allOrders.filter(
      (order) => order.date >= dateFrom && order.date <= dateTo
    );
    setFilteredOrders(filtered);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pending Orders");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "PendingOrders.xlsx");
  };

  return (
    <div className="mx-auto lg:p-6  p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Pending Order List</h2>
      
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
            <th className="border border-gray-300 px-4 py-2">Order No</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Payment Mode</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id} className="text-center bg-white dark:bg-gray-800">
                <td className="border border-gray-300 px-4 py-2">{order.orderNo}</td>
                <td className="border border-gray-300 px-4 py-2">{order.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{order.paymentMode}</td>
                <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.paymentMode === "Online" ? (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Pay Now
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">{order.paymentMode} (Offline)</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <button
        onClick={exportToExcel}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-40"
      >
        Export to Excel
      </button>

      <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-800 border-l-4 border-yellow-500 text-yellow-900 dark:text-yellow-200">
        <p>1. Pay Now option is available only for Online Payment Mode.</p>
        <p>2. For Cash/Bank Transfer, kindly pay through offline medium.</p>
        <p>3. Please remove duplicate/unnecessary orders.</p>
      </div>
    </div>
  );
}
