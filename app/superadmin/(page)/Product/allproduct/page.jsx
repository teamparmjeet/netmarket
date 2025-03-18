"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("/api/Product/Product/fetch/s");
        setProducts(response.data.data || []);
        setFilteredProducts(response.data.data || []);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique groups
  const uniqueGroups = [...new Set(products.map((p) => p.group))];

  // Get unique products (if group selected, filter; otherwise, show all)
  const uniqueProducts = [
    ...new Set(
      (selectedGroup ? products.filter((p) => p.group === selectedGroup) : products).map(
        (p) => p.productname
      )
    ),
  ];

  // Filter Logic
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchGroup = selectedGroup ? product.group === selectedGroup : true;
      const matchProduct = selectedProduct
        ? product.productname === selectedProduct
        : true;
      const matchPrice =
        (minPrice ? product.price >= parseFloat(minPrice) : true) &&
        (maxPrice ? product.price <= parseFloat(maxPrice) : true);

      return matchGroup && matchProduct && matchPrice;
    });

    setFilteredProducts(filtered);
  }, [selectedGroup, selectedProduct, minPrice, maxPrice, products]);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        🛍️ Product List
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Group Filter */}
        <select
          className="p-3 border rounded-lg shadow-sm w-full bg-white focus:ring-2 focus:ring-indigo-400 transition"
          value={selectedGroup}
          onChange={(e) => {
            setSelectedGroup(e.target.value);
            setSelectedProduct(""); // Reset product filter when group changes
          }}
        >
          <option value="">All Groups</option>
          {uniqueGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        {/* Product Filter (Shows all if no group selected) */}
        <select
          className="p-3 border rounded-lg shadow-sm w-full bg-white focus:ring-2 focus:ring-indigo-400 transition"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">All Products</option>
          {uniqueProducts.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>

        {/* Min Price Filter */}
        <input
          type="number"
          className="p-3 border rounded-lg shadow-sm w-full bg-white focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        {/* Max Price Filter */}
        <input
          type="number"
          className="p-3 border rounded-lg shadow-sm w-full bg-white focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-blue-500 text-center">Loading products...</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-gray-500 text-center">No products available.</p>
      )}

      {/* Product Table */}
      {filteredProducts.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Product Name</th>
                <th className="py-4 px-6 text-left">Group</th>
                <th className="py-4 px-6 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-100 transition`}
                >
                  <td className="py-4 px-6">{product.productname}</td>
                  <td className="py-4 px-6">{product.group}</td>
                  <td className="py-4 px-6 font-semibold text-indigo-700">
                    ₹{product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
