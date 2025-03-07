"use client";

import React, { useState } from "react";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    date: "",
    transactionId: "",
    dsCode: "",
    dsName: "",
    address: "",
    mobile: "",
    shippingAddress: "",
    shippingMobile: "",
    shippingPincode: "",
    paymentMethod: "",
    cfType: "",
    state: "",
    district: "",
    cf: "",
    saleGroup: "",
    color: "",
    productGroup: "",
    product: "",
    quantity: "",
    shippingCharge: "",
    netAmount: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="lg:p-6  p-2 mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Order Form</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Date *</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="border rounded-lg p-2 w-full" required />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Transaction Id</label>
          <input type="text" name="transactionId" placeholder="Enter Transaction ID" onChange={handleChange} className="border rounded-lg p-2 w-full" />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">DS Code *</label>
          <input type="text" name="dsCode" placeholder="Enter DS Code" onChange={handleChange} className="border rounded-lg p-2 w-full" required />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">DS Name</label>
          <input type="text" name="dsName" placeholder="Enter DS Name" onChange={handleChange} className="border rounded-lg p-2 w-full" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
          <textarea name="address" placeholder="Enter Address" onChange={handleChange} className="border rounded-lg p-2 w-full"></textarea>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Mobile</label>
          <input type="text" name="mobile" placeholder="Enter Mobile Number" onChange={handleChange} className="border rounded-lg p-2 w-full" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-1">Shipping Address *</label>
          <textarea name="shippingAddress" placeholder="Enter Shipping Address" onChange={handleChange} className="border rounded-lg p-2 w-full" required></textarea>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Shipping Mobile *</label>
          <input type="text" name="shippingMobile" placeholder="Enter Shipping Mobile" onChange={handleChange} className="border rounded-lg p-2 w-full" required />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Shipping Pincode *</label>
          <input type="text" name="shippingPincode" placeholder="Enter Pincode" onChange={handleChange} className="border rounded-lg p-2 w-full" required />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Medium of Payment *</label>
          <select name="paymentMethod" onChange={handleChange} className="border rounded-lg p-2 w-full">
            <option value="">Select Payment Method</option>
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Select C&F Type *</label>
          <input type="text" name="cfType" placeholder="Enter C&F Type" onChange={handleChange} className="border rounded-lg p-2 w-full" />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Select State *</label>
          <input type="text" name="state" placeholder="Enter State" onChange={handleChange} className="border rounded-lg p-2 w-full" />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Select District *</label>
          <input type="text" name="district" placeholder="Enter District" onChange={handleChange} className="border rounded-lg p-2 w-full" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-1">Select Product *</label>
          <input type="text" name="product" placeholder="Enter Product Name" onChange={handleChange} className="border rounded-lg p-2 w-full" />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Quantity *</label>
          <input type="number" name="quantity" placeholder="Enter Quantity" onChange={handleChange} className="border rounded-lg p-2 w-full" required />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Shipping Charge</label>
          <input type="text" name="shippingCharge" placeholder="Enter Shipping Charge" onChange={handleChange} className="border rounded-lg p-2 w-full" />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Net Amount</label>
          <input type="text" name="netAmount" placeholder="Enter Net Amount" onChange={handleChange} className="border rounded-lg p-2 w-full" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-1">Remarks</label>
          <textarea name="remarks" placeholder="Enter Remarks (Optional)" onChange={handleChange} className="border rounded-lg p-2 w-full"></textarea>
        </div>

        <div className="col-span-2 flex justify-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
