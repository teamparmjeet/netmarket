"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Mail, Lock, User, Phone, Users } from "lucide-react";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    name: "",
    gender: "",
    mobileNo: "",
    password: "",
    group: "",
    pdscode: "",
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
      if (!formData.group) newErrors.gender = "Please select a Group";
      if (!formData.pdscode) newErrors.pdscode = "Please Enter Referral";
      if (!formData.password.trim())
        newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/otp", { email: formData.email });
      toast.success(response.data.message);
      setStep(2);
      setIsSubmitting(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/otp", {
        email: formData.email,
        otp: formData.otp,
      });
      toast.success(response.data.message);
      setIsSubmitting(false);
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      setIsSubmitting(false);
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
    <>
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-blue-50 to-indigo-100">
      <Toaster />
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl border border-gray-200 transform transition-all duration-500 hover:shadow-3xl">
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#161950] to-indigo-800 bg-clip-text text-transparent mb-6 tracking-wide">
          {step === 1
            ? "Verify Email"
            : step === 2
            ? "Enter OTP"
            : "Create an Account"}
        </h2>

        <form
          onSubmit={
            step === 1
              ? handleEmailSubmit
              : step === 2
              ? handleOtpVerify
              : handleSubmit
          }
          className="grid gap-4"
        >
          {step === 1 && (
            <div>
              <label className="text-gray-700 text-sm font-semibold">
                Email
              </label>
              <div className="flex items-center border border-gray-200 rounded-md px-3 py-3 focus-within:border-[#161950]">
                <Mail className="text-gray-500 mr-2" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Email Address"
                  className="w-full text-gray-500 focus:outline-none"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="text-gray-700 text-sm font-semibold">
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full px-4 py-3 text-gray-500 bg-white border border-gray-200 rounded-md focus:border-[#161950] focus:outline-none focus:ring-[#161950]"
                required
              />
              {errors.otp && (
                <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="text-gray-700 text-sm font-semibold">
                  Full Name
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-3 py-3 focus-within:border-[#161950]">
                  <User className="text-gray-500 mr-2" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full text-gray-500 focus:outline-none"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="text-gray-700 text-sm font-semibold">
                  Mobile No
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-3 py-3 focus-within:border-[#161950]">
                  <Phone className="text-gray-500 mr-2" size={20} />
                  <PhoneInput
                    country="in"
                    disableDropdown={true}
                    value={formData.mobileNo}
                    onChange={(phone) =>
                      setFormData({ ...formData, mobileNo: phone })
                    }
                    inputClass="w-full text-gray-500 focus:outline-none"
                  />
                </div>
                {errors.mobileNo && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 text-sm font-semibold">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-500 bg-white border border-gray-200 rounded-md focus:border-[#161950] focus:outline-none focus:ring-[#161950]"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold">
                    Group
                  </label>
                  <select
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-500 bg-white border border-gray-200 rounded-md focus:border-[#161950] focus:outline-none focus:ring-[#161950]"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="SAO">SAO</option>
                    <option value="SGO">SGO</option>
                  </select>
                  {errors.group && (
                    <p className="text-red-500 text-xs mt-1">{errors.group}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-gray-700 text-sm font-semibold">
                  Password
                </label>
                <div className="flex items-center border border-gray-200 rounded-md px-3 py-3 focus-within:border-[#161950]">
                  <Lock className="text-gray-500 mr-2" size={20} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full text-gray-500 focus:outline-none"
                    required
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#161950] to-indigo-800 text-white py-3 rounded-full shadow-lg hover:from-indigo-900 hover:to-[#161950] transition-all duration-300 disabled:bg-gray-400"
          >
            {isSubmitting
              ? "Processing..."
              : step === 1
              ? "Send OTP"
              : step === 2
              ? "Verify OTP"
              : "Sign Up"}
          </button>

          <Link
            href="/signin"
            className="block text-center text-sm text-gray-600 font-semibold hover:underline hover:text-[#161950]"
          >
            Already have an account? Sign in
          </Link>
        </form>
      </div>
    </section>
    </>
  );
}
