"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        name: "",
        gender: "",
        mobileNo: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateFields = () => {
        let newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (step === 2 && !formData.otp.trim()) newErrors.otp = "OTP is required";
        if (step === 3) {
            if (!formData.name.trim()) newErrors.name = "Full Name is required";
            if (!formData.mobileNo.trim() || formData.mobileNo.length < 12)
                newErrors.mobileNo = "Enter a valid 10-digit mobile number";
            if (!formData.gender) newErrors.gender = "Please select a gender";
            if (!formData.password.trim()) newErrors.password = "Password is required";
            else if (formData.password.length < 6)
                newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;
        try {
            const response = await axios.post("/api/otp", { email: formData.email });
            toast.success(response.data.message);
            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;
        try {
            const response = await axios.post("/api/otp", { email: formData.email, otp: formData.otp });
            toast.success(response.data.message);
            setStep(3);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;
        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/user/create", formData);
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.href = "/signin";
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <Toaster />
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
                    {step === 1 ? "Verify Email" : step === 2 ? "Enter OTP" : "Create an Account"}
                </h2>
                <form onSubmit={step === 1 ? handleEmailSubmit : step === 2 ? handleOtpVerify : handleSubmit} className="grid gap-4">
                    {step === 1 && (
                        <div>
                            <label className="text-gray-700 text-sm font-semibold">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} placeholder="Email Address" className="block w-full px-3 py-2 border rounded-md" required />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <label className="text-gray-700 text-sm font-semibold">Enter OTP</label>
                            <input type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="Enter OTP" className="block w-full px-3 py-2 border rounded-md" required />
                            {errors.otp && <p className="text-red-500 text-xs">{errors.otp}</p>}
                        </div>
                    )}
                    {step === 3 && (
                        <>
                            <div>
                                <label className="text-gray-700 text-sm font-semibold">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="block w-full px-3 py-2 border rounded-md" required />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm font-semibold">Mobile No</label>
                                <PhoneInput country="in" disableDropdown={true} value={formData.mobileNo} onChange={(phone) => setFormData({ ...formData, mobileNo: phone })} inputStyle={{ width: "100%" }} />
                                {errors.mobileNo && <p className="text-red-500 text-xs">{errors.mobileNo}</p>}
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm font-semibold">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className="block w-full px-3 py-2 border rounded-md">
                                    <option value="" disabled>Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm font-semibold">Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="block w-full px-3 py-2 border rounded-md" required />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                            </div>
                        </>
                    )}
                    <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        {isSubmitting ? "Processing..." : step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Sign Up"}
                    </button>
                </form>
            </div>
        </section>
    );
}
