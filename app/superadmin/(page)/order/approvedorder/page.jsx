"use client";
import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function PendingOrders() {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [allOrders, setAllOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);



    useEffect(() => {
        const fetchOrders = async () => {
            setLoadingOrders(true);
            try {
                const response = await fetch(`/api/order/fetchbytype/true`);
                const result = await response.json();
                if (result.success) {
                    setAllOrders(result.data);
                    setFilteredOrders(result.data);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoadingOrders(false);
            }
        };
        fetchOrders();
    }, []);

    const applyFilter = () => {
        const filtered = allOrders.filter((order) => {
            const orderDate = order.date.split("T")[0]; // Extract only the YYYY-MM-DD part
            return orderDate >= dateFrom && orderDate <= dateTo;
        });
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
        <div className="mx-auto lg:p-6 p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4 text-center">Approved Order List</h2>
            <div className="grid grid-cols-3 gap-4 mb-6 items-end">
                <div>
                    <label className="block text-sm font-medium">Date From</label>
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                        className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Date To</label>
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                        className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white" />
                </div>
                <button onClick={applyFilter} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">Show</button>
            </div>

            {loadingOrders ? (
                <div className="animate-pulse">
                    {Array(5).fill(0).map((_, index) => (
                        <div key={index} className="h-10 bg-gray-300 dark:bg-gray-600 my-2 rounded"></div>
                    ))}
                </div>
            ) : (
                <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                            <th className="border border-gray-300 px-4 py-2">Order No</th>
                            <th className="border border-gray-300 px-4 py-2">Amount</th>
                            <th className="border border-gray-300 px-4 py-2">Payment Mode</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <tr key={order._id} className="text-center bg-white dark:bg-gray-800">
                                    <td className="border border-gray-300 px-4 py-2">{order.orderNo}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.netamount}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.paymentmod}</td>
                                    <td className="border border-gray-300 px-4 py-2">{new Date(order.date).toLocaleDateString("en-GB")}</td>
                                    <td className="border border-gray-300 px-4 py-2">{order.status ? "Approved" : "Pending"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            <button onClick={exportToExcel} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-40">Export to Excel</button>
        </div>
    );
}
