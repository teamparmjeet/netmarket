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
    <div className="lg:p-6  p-2 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700  dark:text-white mb-6">Order Form</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Date &#42;</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" required />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Transaction Id</label>
          <input type="text" name="transactionId" placeholder="Enter Transaction ID" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">DS Code &#42;</label>
          <input type="text" name="dsCode" placeholder="Enter DS Code" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" required />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">DS Name</label>
          <input type="text" name="dsName" placeholder="Enter DS Name" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Address</label>
          <textarea name="address" placeholder="Enter Address" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"></textarea>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Mobile</label>
          <input type="text" name="mobile" placeholder="Enter Mobile Number" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Shipping Address &#42;</label>
          <textarea name="shippingAddress" placeholder="Enter Shipping Address" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" required></textarea>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Shipping Mobile &#42;</label>
          <input type="text" name="shippingMobile" placeholder="Enter Shipping Mobile" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" required />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Shipping Pincode &#42;</label>
          <input type="text" name="shippingPincode" placeholder="Enter Pincode" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" required />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Medium of Payment &#42;</label>
          <select name="paymentMethod" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white">
            <option value="">Select Payment Method</option>
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Select C&F Type &#42;</label>
          <select name="cfType" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white">
            <option value="">Select C&F Type</option>
            <option value="Type A">Type A</option>
            <option value="Type B">Type B</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Select State &#42;</label>
          <select name="state" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white">
            <option value="">Select State</option>
            <option value="State 1">State 1</option>
            <option value="State 2">State 2</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Select District &#42;</label>
          <select name="district" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white">
            <option value="">Select District</option>
            <option value="District 1">District 1</option>
            <option value="District 2">District 2</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Select Product Group &#42;</label>
          <select name="productGroup" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white">
            <option value="">Select Product Group</option>
            <option value="Group 1">Group 1</option>
            <option value="Group 2">Group 2</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Select Color &#42;</label>
          <select name="color" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white">
            <option value="">Select Color</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Select Product &#42;</label>
          <select name="product" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white">
            <option value="">Select Product</option>
            <option value="Product A">Product A</option>
            <option value="Product B">Product B</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Sale Group &#42;</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center text-gray-700 dark:text-white">
              <input type="radio" name="saleGroup" value="SAO" onChange={handleChange} className="mr-2" />
              SAO
            </label>
            <label className="inline-flex items-center text-gray-700 dark:text-white">
              <input type="radio" name="saleGroup" value="SGO" onChange={handleChange} className="mr-2" />
              SGO
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Quantity &#42;</label>
          <input type="number" name="quantity" placeholder="Enter Quantity" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" required />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Shipping Charge</label>
          <input type="text" name="shippingCharge" placeholder="Enter Shipping Charge" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Net Amount</label>
          <input type="text" name="netAmount" placeholder="Enter Net Amount" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Remarks</label>
          <textarea name="remarks" placeholder="Enter Remarks (Optional)" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"></textarea>
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
