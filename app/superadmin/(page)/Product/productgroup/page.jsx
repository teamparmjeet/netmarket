"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
    const [groupname, setGroupname] = useState("");
    const [productGroups, setProductGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchProductGroups();
    }, []);

    const fetchProductGroups = async () => {
        setFetching(true);
        setError("");
        try {
            const response = await axios.get("/api/Product/Group/fetch/s");
            setProductGroups(response.data.data);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch product groups.");
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!groupname.trim() || loading) return;

        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await axios.post("/api/Product/Group/create", { groupname: groupname.trim() });
            setSuccess(response.data.message || "Product group added successfully.");
            setGroupname("");
            fetchProductGroups();
        } catch (error) {
            setError(error.response?.data?.message || "Failed to add product group.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Add Product Group</h2>
            {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}
            {success && <p className="text-green-500 bg-green-100 p-2 rounded">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupname}
                    onChange={(e) => setGroupname(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Group"}
                </button>
            </form>
            <h2 className="text-lg font-semibold mt-6">Product Groups</h2>
            {fetching ? (
                <div className="space-y-2">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="h-8 bg-gray-300 animate-pulse rounded"></div>
                    ))}
                </div>
            ) : (
                <ul className="mt-2 space-y-2">
                    {productGroups.length > 0 ? (
                        productGroups.map((group) => (
                            <li key={group._id} className="p-2 border rounded bg-gray-100">
                                {group.groupname}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No product groups found.</p>
                    )}
                </ul>
            )}
        </div>
    );
}