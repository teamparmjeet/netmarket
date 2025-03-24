import React, { useState } from "react";

export default function Order() {
    const [showTable, setShowTable] = useState(false);

    const orders = [
        { id: 1, customer: "John Doe", product: "Laptop", amount: "$1200" },
        { id: 2, customer: "Jane Smith", product: "Phone", amount: "$800" },
        { id: 3, customer: "Michael Brown", product: "Tablet", amount: "$500" }
    ];

    return (
        <div className="p-4">
            {!showTable ? (
                <button
                    className="bg-blue-500 w-full text-white px-2 py-1"
                    onClick={() => setShowTable(true)}
                >
                    Show Order
                </button>
            ) : (
                <div>
                    <button
                        className="bg-gray-500 w-full text-white px-2 py-1"
                        onClick={() => setShowTable(false)}
                    >
                        Hide Table
                    </button>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Customer</th>
                                <th className="border border-gray-300 p-2">Product</th>
                                <th className="border border-gray-300 p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="text-center">
                                    <td className="border border-gray-300 p-2">{order.id}</td>
                                    <td className="border border-gray-300 p-2">{order.customer}</td>
                                    <td className="border border-gray-300 p-2">{order.product}</td>
                                    <td className="border border-gray-300 p-2">{order.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
