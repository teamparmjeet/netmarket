"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UserVerify({ data }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ kycVerified: false, usertype: "0" });

    useEffect(() => {
        const fetchData = async () => {
            if (!data?.email) {
                setError("No email provided.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const { data: fetchedData } = await axios.get(`/api/user/find-admin-byemail/${data.email}`);
                setUserData(fetchedData);
                setFormData({
                    kycVerified: fetchedData.kycVerification?.isVerified || false,
                    usertype: fetchedData.usertype || "0",
                });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [data?.email]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data: updatedData } = await axios.patch(`/api/user/update-user/`, {
                id: userData._id,
                kycVerification: { isVerified: formData.kycVerified },
                usertype: formData.usertype,
            });
            setUserData(updatedData);
            toast.success("User updated successfully!", { duration: 3000, style: { background: "#10B981", color: "#fff" } });
            setEditMode(false);
            setIsOpen(false);
            window.location.reload();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update user.", {
                duration: 3000,
                style: { background: "#EF4444", color: "#fff" },
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-gray-500 text-center py-2 animate-pulse">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-2 bg-red-100 rounded">{error}</div>;

    const usertypeLabels = { "0": "Not Allowed", "1": "Allowed" };
    const statusColor = userData?.usertype === "1" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700";

    return (
        <div className="relative font-sans">
            <Toaster />
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-3 py-1  text-white text-sm transition-all hover:scale-105 ${statusColor} shadow`}
                disabled={loading}
            >
                {userData?.usertype === "1" ? "Active" : "In Active"}
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-64 bg-white shadow-lg p-4 z-10 border animate-in fade-in">
                    {editMode ? (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="kycVerified"
                                    checked={formData.kycVerified}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <span className="text-gray-700 text-sm">KYC Verified</span>
                            </label>
                            <select
                                name="usertype"
                                value={formData.usertype}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full border rounded p-1 text-sm focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="0">Not Active</option>
                                <option value="1">Active User</option>
                            </select>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex-1 bg-green-500 text-white py-1 rounded text-sm hover:bg-green-600 ${loading ? "opacity-50" : ""}`}
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditMode(false)}
                                    disabled={loading}
                                    className={`flex-1 bg-gray-500 text-white py-1 rounded text-sm hover:bg-gray-600 ${loading ? "opacity-50" : ""}`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-700">
                                <strong>KYC:</strong>{" "}
                                <span className={userData.kycVerification?.isVerified ? "text-green-600" : "text-red-600"}>
                                    {userData.kycVerification?.isVerified ? "Yes" : "No"}
                                </span>
                            </p>
                            <p className="text-sm text-gray-700">
                                <strong>Status :</strong> <span className="text-blue-600">{usertypeLabels[userData.usertype]}</span>
                            </p>
                            <button
                                onClick={() => setEditMode(true)}
                                className="w-full bg-blue-500 text-white py-1 rounded text-sm hover:bg-blue-600"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}