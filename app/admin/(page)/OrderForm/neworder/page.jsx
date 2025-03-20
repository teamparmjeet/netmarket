"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  onChange,
  required = false,
  defaultValue,
  disabled = false,
}) => (
  <div className="space-y-2">
    <label className="block text-gray-800 dark:text-gray-200 text-sm font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 disabled:bg-gray-200 disabled:dark:bg-gray-700"
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}
    />
  </div>
);

const SelectField = ({ label, name, options, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="block text-gray-800 dark:text-gray-200 text-sm font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        name={name}
        onChange={onChange}
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 appearance-none"
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 pointer-events-none">▼</span>
    </div>
  </div>
);

const RadioField = ({ label, name, options, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="block text-gray-800 dark:text-gray-200 text-sm font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex flex-wrap gap-4">
      {options.map((option, index) => (
        <label
          key={index}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <input
            type="radio"
            name={name}
            value={option}
            onChange={onChange}
            className="hidden peer"
            required={required}
          />
          <div className="w-5 h-5 border-2 border-gray-400 dark:border-gray-500 rounded-full flex items-center justify-center peer-checked:border-blue-500">
            <div className="w-3 h-3 bg-blue-500 rounded-full hidden peer-checked:block"></div>
          </div>
          <span className="text-gray-700 dark:text-white">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export { InputField, SelectField, RadioField };

export default function OrderForm() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [productGroups, setProductGroups] = useState([]);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    transactionId: "",
    dscode: "",
    dsname: "",
    address: "",
    mobileno: "",
    shippingAddress: "",
    shippingmobile: "",
    shippinpPincode: "",
    paymentmod: "",
    cftype: "",
    salegroup: "",
    productgroup: "",
    product: "",
    quantity: "",
    shippingcharge: "",
    netamount: "",
    remarks: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
        if (response.data?.name) {
          setFormData((prev) => ({
            ...prev,
            dscode: response.data.dscode || "",
            dsname: response.data.name || "",
            address: response.data.address?.addressLine1 || "",
            mobileno: response.data.mobileNo || "",
          }));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Unable to fetch user details.");
      } finally {
        setFetching(false);
      }
    };
    fetchUserData();
  }, [session?.user?.email]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/Product/Product/fetch/s");
        if (response.data.success) {
          const products = response.data.data;
          setProducts(products);


          const uniqueGroups = [...new Set(products.map((item) => item.group))];
          setProductGroups(uniqueGroups);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to fetch products.");
      }
    };

    fetchProducts();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      if (name === "product") {
        const selectedProduct = products.find((p) => p.productname === value);
        if (selectedProduct) {
          updatedData = {
            ...updatedData,
            product: value,
            netamount: prev.quantity ? selectedProduct.price * prev.quantity : "",
          };
        }
      }

      if (name === "quantity") {
        const selectedProduct = products.find((p) => p.productname === prev.product);
        if (selectedProduct) {
          updatedData = {
            ...updatedData,
            quantity: value,
            netamount: selectedProduct.price * value,
          };
        }
      }

      return updatedData;
    });
  };


  const filteredProducts = formData.productgroup
    ? products.filter((item) => item.group === formData.productgroup)
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentmod === "Online" && !formData.transactionId) {
      toast.error("Transaction ID is required for online payments!");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/order/create", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:p-6 p-4 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-6xl">
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-6">Order Form</h2>
      <Toaster />
      {fetching && <p className="text-center text-gray-600 dark:text-gray-300">Fetching user details...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Date" name="date" type="date" defaultValue={formData.date} disabled />
        <InputField label="Transaction ID" name="transactionId" placeholder="Enter Transaction ID" onChange={handleChange} />
        <InputField label="DS Code" name="dscode" defaultValue={formData.dscode} disabled required />
        <InputField label="DS Name" name="dsname" defaultValue={formData.dsname} disabled required />
        <InputField label="Address" name="address" defaultValue={formData.address} disabled required />
        <InputField label="Mobile" name="mobileno" defaultValue={formData.mobileno} disabled required />
        <InputField label="Shipping Address" name="shippingAddress" onChange={handleChange} required />
        <InputField label="Shipping Mobile" name="shippingmobile" type="tel" onChange={handleChange} required />
        <InputField label="Shipping Pincode" name="shippinpPincode" onChange={handleChange} required />
        <SelectField label="Medium of Payment" name="paymentmod" options={["Online", "Cash"]} onChange={handleChange} required />
        <SelectField label="C&F Type" name="cftype" options={["Type A", "Type B"]} onChange={handleChange} required />
        <SelectField label="Product Group"
          name="productgroup"
          options={productGroups}
          value={formData.productgroup}
          onChange={handleChange}
          required />
        {formData.productgroup && (
          <SelectField label="Product"
            name="product"
            options={filteredProducts.map((p) => p.productname)}
            value={formData.product}
            onChange={handleChange}
            required />
        )}
        <RadioField label="Sale Group" name="salegroup" options={["SAO", "SGO"]} onChange={handleChange} required />
        <InputField label="Quantity" name="quantity" type="number" onChange={handleChange} required />
        <InputField label="Shipping Charge" name="shippingcharge" onChange={handleChange} required />
        <InputField
          label="Net Amount"
          name="netamount"
          defaultValue={formData.netamount}
          required
          disabled
        />

        <textarea name="remarks" onChange={handleChange} placeholder="Remarks (Optional)" className="w-full p-2 border rounded"></textarea>

        <div className="col-span-2 flex justify-center">
          <button type="submit" disabled={isSubmitting} className="bg-blue-600 w-full hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md">
            {isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
