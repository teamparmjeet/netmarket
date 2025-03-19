"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const InputField = ({ label, name, type = "text", placeholder, onChange, required = false, defaultValue, disabled = false }) => (
  <div>
    <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">{label} {required && "*"}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white disabled:bg-gray-300 disabled:dark:bg-gray-600"
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}  // Ensure disabled prop is applied
    />
  </div>
);


const SelectField = ({ label, name, options, onChange, required = false }) => (
  <div>
    <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">{label} {required && "*"}</label>
    <select
      name={name}
      onChange={onChange}
      className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"
      required={required}
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const RadioField = ({ label, name, options, onChange }) => (
  <div className="col-span-2">
    <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">{label} *</label>
    <div className="flex gap-4">
      {options.map((option, index) => (
        <label key={index} className="inline-flex items-center text-gray-700 dark:text-white">
          <input type="radio" name={name} value={option} onChange={onChange} className="mr-2" />
          {option}
        </label>
      ))}
    </div>
  </div>
);

export default function OrderForm() {
  const { data: session, update } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
        if (response.data?.name) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchUserData();
  }, [session?.user?.email]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/order/create", formData);
      toast.success(response.data.message);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:p-6 p-2 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-6">Order Form</h2>
      <Toaster />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Date" name="date" type="date" onChange={handleChange} required defaultValue={new Date().toISOString().split("T")[0]} disabled={true} />
        <InputField label="Transaction ID" name="transactionId" placeholder="Enter Transaction ID" onChange={handleChange} required />
        <InputField label="DS Code" defaultValue={data?.dscode} name="dsCode" placeholder="Enter DS Code" onChange={handleChange} required disabled={true} />
        <InputField label="DS Name" name="dsName" placeholder="Enter DS Name" onChange={handleChange} defaultValue={data?.name} required disabled={true} />
        <InputField label="Address" name="address" placeholder="Enter Address" onChange={handleChange} defaultValue={data?.address.addressLine1} required disabled={true} />
        <InputField label="Mobile" name="mobile" placeholder="Enter Mobile" onChange={handleChange} defaultValue={data?.mobileNo} required disabled={true} />
        <InputField label="Shipping Address" name="shippingAddress" placeholder="Enter Shipping Address" onChange={handleChange} required />
        <InputField label="Shipping Mobile" name="shippingMobile" placeholder="Enter Shipping Mobile" type="tel" onChange={handleChange} required />
        <InputField label="Shipping Pincode" name="shippingPincode" placeholder="Enter Pincode" onChange={handleChange} required />
        <SelectField label="Medium of Payment" name="paymentMethod" options={["Online", "Cash"]} onChange={handleChange} required />
        <SelectField label="C&F Type" name="cfType" options={["Type A", "Type B"]} onChange={handleChange} required />
        <SelectField label="State" name="state" options={["State 1", "State 2"]} onChange={handleChange} required />
        <SelectField label="District" name="district" options={["District 1", "District 2"]} onChange={handleChange} required />
        <SelectField label="Product Group" name="productGroup" options={["Group 1", "Group 2"]} onChange={handleChange} required />
        <SelectField label="Color" name="color" options={["Red", "Blue"]} onChange={handleChange} required />
        <SelectField label="Product" name="product" options={["Product A", "Product B"]} onChange={handleChange} required />
        <RadioField label="Sale Group" name="saleGroup" options={["SAO", "SGO"]} onChange={handleChange} />
        <InputField label="Quantity" name="quantity" type="number" placeholder="Enter Quantity" onChange={handleChange} required />
        <InputField label="Shipping Charge" name="shippingCharge" placeholder="Enter Shipping Charge" onChange={handleChange} />
        <InputField label="Net Amount" name="netAmount" placeholder="Enter Net Amount" onChange={handleChange} />
        <div className="col-span-2">
          <label className="block text-gray-700 dark:text-white text-sm font-medium mb-1">Remarks</label>
          <textarea name="remarks" placeholder="Enter Remarks (Optional)" onChange={handleChange} className="border dark:border-gray-600 rounded-lg p-2 w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white"></textarea>
        </div>
        <div className="col-span-2 flex justify-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md">Submit Order</button>
        </div>
      </form>
    </div>
  );
}
