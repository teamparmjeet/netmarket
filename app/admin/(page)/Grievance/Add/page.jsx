"use client";
import React, { useState } from "react";

export default function AddGrievance() {
  const [formData, setFormData] = useState({
    name: "SHAMBHUDAYAL MEENA",
    fatherSpouse: "NARAYAN",
    email: "narendrashinghmeena@gmail.com",
    phone: "7771089874",
    address: "GRAM DANTARDA KALAN, SHEOPUR",
    grievance: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Grievance Submitted:", formData);
  };

  const handleCancel = () => {
    setFormData({ ...formData, grievance: "" });
  };

  return (
    <div className="mx-auto lg:p-6 p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Grievance/Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" name="name" value={formData.name} readOnly className="border rounded-lg p-2 w-full bg-gray-200 dark:bg-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium">Father's/Spouse</label>
            <input type="text" name="fatherSpouse" value={formData.fatherSpouse} readOnly className="border rounded-lg p-2 w-full bg-gray-200 dark:bg-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" value={formData.email} readOnly className="border rounded-lg p-2 w-full bg-gray-200 dark:bg-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input type="text" name="phone" value={formData.phone} readOnly className="border rounded-lg p-2 w-full bg-gray-200 dark:bg-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea name="address" value={formData.address} readOnly className="border rounded-lg p-2 w-full bg-gray-200 dark:bg-gray-600"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">Grievance/Request</label>
            <textarea name="grievance" value={formData.grievance} onChange={handleChange} className="border rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Save</button>
        </div>
      </form>
    </div>
  );
}
