"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function UserInfocard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session, update } = useSession();
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        mobileNo: "",
        fatherOrHusbandName: "",
        gender: "",
        profession: "",
        maritalStatus: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            if (!session?.user?.email) return;
            try {
                const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
                if (response.data?._id) {
                    setData(response.data);
                    setFormData({
                        name: response.data.name || "",
                        dob: response.data.dob || "",
                        mobileNo: response.data.mobileNo || "",
                        fatherOrHusbandName: response.data.fatherOrHusbandName || "",
                        gender: response.data.gender || "",
                        profession: response.data.profession || "",
                        maritalStatus: response.data.maritalStatus || "",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setFetching(false);
                setLoading(false);

            }
        };
        fetchUserData();
    }, [session?.user?.email]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!data?._id) return;
        setLoading(true);

        try {
            const response = await axios.patch("/api/user/update-user", {
                id: data._id,
                ...formData,
            });

            if (response.data.success) {
                alert("User updated successfully");
                setIsModalOpen(false);
                update(); // Refresh session data if needed
                window.location.reload();
            }
        } catch (error) {
            console.error("Failed to update user:", error);
            alert("Failed to update user");
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <>
                <div className="text-center text-gray-500 h-8 rounded bg-gray-200 border animate-pulse"></div>
                <div className="text-center text-gray-500 h-8 rounded bg-gray-200 border animate-pulse"></div>
                <div className="text-center text-gray-500 h-8 rounded bg-gray-200 border animate-pulse"></div>
                <div className="text-center text-gray-500 h-8 rounded bg-gray-200 border animate-pulse"></div>
            </>
        );
    }
    return (
        <div>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-200 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Personal Information
                        </h4>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    DS Name *
                                </p>
                                <div className="flex">

                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        {data?.name}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    D.O.B.
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    {data?.dob ? new Date(data.dob).toLocaleDateString("en-GB") : "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Email address
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    {data?.email}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Phone
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    {data?.mobileNo}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Father&apos; Husband&apos; Name *
                                </p>

                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    {data?.fatherOrHusbandName || "Not Provided"}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Gender
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    {data?.gender}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Profession
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    {data?.profession || "Not Provided"}
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Marital Status
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    {data?.maritalStatus || "Not Provided"}

                                </p>

                            </div>

                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative max-w-xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-6 lg:p-10 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-red-500"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>
                        <h4 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white text-center">
                            Edit Personal Information
                        </h4>
                        <form className="flex flex-col" onSubmit={handleUpdate}>
                            <div className="overflow-y-auto px-2 pb-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 text-gray-800 dark:text-white/90">
                                    {[
                                        { label: "DS Name *", name: "name", type: "text" },
                                        { label: "D.O.B.", name: "dob", type: "date" },
                                        { label: "Phone", name: "mobileNo", type: "text" },
                                        { label: "Father's Name *", name: "fatherOrHusbandName", type: "text" },
                                        { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
                                        { label: "Profession", name: "profession", type: "select", options: ["SALARIED", "SELF-EMPLOYED", "STUDENT", "RETIRED", "OTHER"] },
                                        { label: "Marital Status", name: "maritalStatus", type: "select", options: ["Single", "Married", "Divorced", "Widowed"] },
                                    ].map((field) => (
                                        <div key={field.name}>
                                            <label className="block text-gray-700 dark:text-gray-300 font-medium">
                                                {field.label}
                                            </label>
                                            {field.type === "select" ? (
                                                <select
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className="block w-full px-4 py-3 text-gray-500 bg-white border border-gray-200 rounded-md focus:border-[#161950] focus:outline-none focus:ring-[#161950] sm:text-sm"
                                                >
                                                    <option value="">Select {field.label}</option>
                                                    {field.options.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className="block w-full px-4 py-3 text-gray-500 bg-white border border-gray-200 rounded-md focus:border-[#161950] focus:outline-none focus:ring-[#161950] sm:text-sm"
                                                    type={field.type}
                                                    placeholder={field.label}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#161950]/80 text-white px-4 py-2 rounded-lg hover:bg-[#161950] transition disabled:bg-gray-400"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
