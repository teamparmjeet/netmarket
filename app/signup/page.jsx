"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        mobileNo: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Remove field error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const response = await axios.post("/api/user/create", formData);
            
            if (response.data.success) {
                toast.success(response.data.message);
                setFormData({
                    name: "",
                    gender: "",
                    mobileNo: "",
                    email: "",
                    password: "",
                });
            } else {
                toast.error(response.data.message);
                setErrors({ general: response.data.message });
            }
        } catch (error) {
           
            if (error.response && error.response.data) {
                setErrors({ general: error.response.data.message });
                toast.error(error.response.data.message);
            } else {
                setErrors({ general: "Something went wrong. Please try again." });
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 bg-[#161950]/10">
            <Toaster />
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-[#161950] mb-4">
                    Create an Account
                </h2>

                {errors.general && (
                    <p className="text-red-500 text-sm text-center mb-2">{errors.general}</p>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="col-span-2">
                        <label className="text-gray-700 text-sm font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="Enter your full name"
                            className={`block w-full px-3 py-2 text-gray-500 border rounded-md focus:border-[#161950] focus:outline-none sm:text-sm ${
                                errors.name ? "border-red-500" : "border-gray-200"
                            }`}
                            required
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>

                    {/* Mobile Number */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="text-gray-700 text-sm font-semibold">Mobile No</label>
                        <input
                            type="text"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="Mobile Number"
                            className={`block w-full px-3 py-2 text-gray-500 border rounded-md focus:border-[#161950] focus:outline-none sm:text-sm ${
                                errors.mobileNo ? "border-red-500" : "border-gray-200"
                            }`}
                            required
                        />
                        {errors.mobileNo && <p className="text-red-500 text-xs">{errors.mobileNo}</p>}
                    </div>

                    {/* Email */}
                    <div className="col-span-2 sm:col-span-1">
                        <label className="text-gray-700 text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="Email Address"
                            className={`block w-full px-3 py-2 text-gray-500 border rounded-md focus:border-[#161950] focus:outline-none sm:text-sm ${
                                errors.email ? "border-red-500" : "border-gray-200"
                            }`}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>

                    {/* Gender */}
                    <div className="col-span-2">
                        <label className="text-gray-700 text-sm font-semibold">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="block w-full px-3 py-2 text-gray-500 border border-gray-200 rounded-md focus:border-[#161950] focus:outline-none sm:text-sm"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Password */}
                    <div className="col-span-2">
                        <label className="text-gray-700 text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            placeholder="Enter password"
                            className={`block w-full px-3 py-2 text-gray-500 border rounded-md focus:border-[#161950] focus:outline-none sm:text-sm ${
                                errors.password ? "border-red-500" : "border-gray-200"
                            }`}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 mt-2">
                        <button type="submit" disabled={isSubmitting} className="w-full bg-[#161950] text-white py-2 rounded-lg hover:bg-[#161950]/80 transition disabled:bg-gray-400">
                            {isSubmitting ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
