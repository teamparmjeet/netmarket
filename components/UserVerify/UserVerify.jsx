"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UserVerify({ data }) {
    const [userData, setUserData] = useState(null);
    const [level, setLevel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ kycVerified: false, usertype: "0", level: "" });

    useEffect(() => {
        axios.get("/api/level/fetch/level")
            .then((response) => setLevel(response.data.data || []))
            .catch(() => setError("Failed to load levels."))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!data?.email) {
            setError("No email provided.");
            setLoading(false);
            return;
        }
        axios.get(`/api/user/find-admin-byemail/${data.email}`)
            .then(({ data }) => {
                setUserData(data);
                setFormData({
                    kycVerified: data.kycVerification?.isVerified || false,
                    usertype: data.usertype || "0",
                    level: data.level || ""
                });
            })
            .catch((err) => setError(err.response?.data?.message || "Failed to load user data."))
            .finally(() => setLoading(false));
    }, [data?.email]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data: updatedData } = await axios.patch("/api/user/update-user/", {
                id: userData._id,
                kycVerification: { isVerified: formData.kycVerified },
                usertype: formData.usertype,
                level: formData.level,
            });
            setUserData(updatedData);
            toast.success("User updated successfully!");
            setEditMode(false);
            setIsOpen(false);
            window.location.reload();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update user.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-gray-500 text-center py-2 animate-pulse">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-2 bg-red-100 rounded">{error}</div>;

    return (
        <div className="relative w-full font-sans">
            <Toaster />
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-2 mt-2 text-white text-sm transition-all rounded-lg shadow-md ${userData?.usertype === "1" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                disabled={loading}
            >
                {userData?.usertype === "1" ? "Active" : "DeActive"}
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-full bg-white shadow-lg p-4 z-10 border rounded-lg animate-in fade-in">
                    {editMode ? (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="kycVerified"
                                    checked={formData.kycVerified}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                KYC Verified
                            </label>
                            <select
                                name="usertype"
                                value={formData.usertype}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="0">Not Active</option>
                                <option value="1">Active User</option>
                            </select>
                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="" disabled>Select A Level</option>
                                {level.length > 0 ? (
                                    level.sort((a, b) => a.sao - b.sao).map((lvl, index) => (
                                        <option key={index} value={lvl.level_name}>{lvl.level_name} </option>
                                    ))
                                ) : (
                                    <option disabled>No Level found.</option>
                                )}
                            </select>
                            <div className="flex gap-2">
                                <button type="submit" disabled={loading} className="flex-1 bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600">
                                    {loading ? "Saving..." : "Save"}
                                </button>
                                <button type="button" onClick={() => setEditMode(false)} disabled={loading} className="flex-1 bg-gray-500 text-white py-2 rounded text-sm hover:bg-gray-600">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-2">
                           
                            <p className="text-sm text-gray-700"><strong>KYC:</strong> <span className={userData.kycVerification?.isVerified ? "text-green-600" : "text-red-600"}>{userData.kycVerification?.isVerified ? "Yes" : "No"}</span></p>
                            <p className="text-sm text-gray-700"><strong>Status:</strong> <span className="text-blue-600">{userData.usertype === "1" ? "Allowed" : "Not Allowed"}</span></p>
                            <p className="text-sm text-gray-700"><strong>Level:</strong> <span className="text-blue-800">{userData.level}</span></p>
                            <button onClick={() => setEditMode(true)} className="w-full bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600">
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
