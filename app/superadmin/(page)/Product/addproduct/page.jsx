"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    productname: "",
    group: "",
    price: "",
  });

  const [productGroups, setProductGroups] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchProductGroups = async () => {
      setFetching(true);
      setFetchError("");
      try {
        const response = await axios.get("/api/Product/Group/fetch/s");
        setProductGroups(response.data.data || []);
      } catch (error) {
        setFetchError(
          error.response?.data?.message || "Failed to fetch product groups."
        );
      } finally {
        setFetching(false);
      }
    };

    fetchProductGroups();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.productname.trim() ||
      !formData.group.trim() ||
      !formData.price.trim() ||
      loading
    )
      return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "/api/Product/Product/create",
        formData
      );
      setSuccess(response.data.message || "Product added successfully.");
      setFormData({ productname: "", group: "", price: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 bg-white dark:bg-gray-800 shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-600 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Product</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {fetchError && <p className="text-red-500">{fetchError}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
      >
        {/* Product Name Input */}
        <input
          type="text"
          name="productname"
          placeholder="Product Name"
          value={formData.productname}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-500"
          required
        />

        {/* Select Group */}
        <select
          name="group"
          value={formData.group}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-500"
          required
          disabled={fetching || productGroups.length === 0}
        >
          <option value="" className="text-gray-700 dark:text-gray-300">
            Select Group
          </option>
          {productGroups.map((group) => (
            <option
              key={group._id}
              value={group.groupname}
              className="text-gray-700 dark:text-gray-300"
            >
              {group.groupname}
            </option>
          ))}
        </select>

        {/* Price Input */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-500"
          required
        />

        {/* Centered Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-40 col-span-full justify-self-center text-white p-2 rounded transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
