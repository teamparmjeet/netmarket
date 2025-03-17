"use client";
import React, { useState } from "react";

export default function page() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    console.log("Password updated successfully", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}