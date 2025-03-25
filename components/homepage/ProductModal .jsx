"use client";

import Image from "next/image";
import { X } from "lucide-react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-4 sm:p-6 relative border border-gray-300 transform transition-all duration-300 scale-105 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
        >
          <X size={26} />
        </button>

        {/* Product Image */}
        <div className="relative w-full flex justify-center">
          <div className="bg-gray-100 p-3 sm:p-4 rounded-xl shadow-md">
            <Image
              src={product.image || "/images/default.png"}
              width={300}
              height={300}
              className="w-52 sm:w-64 h-52 sm:h-64 object-contain rounded-lg"
              alt={product.productname}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-4 sm:mt-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{product.productname}</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wide">{product.group}</p>

          <div className="mt-4 sm:mt-5 space-y-1 sm:space-y-2">
            <p className="text-sm sm:text-lg font-semibold text-red-500 line-through">MRP: ₹{product.mrp}</p>
            <p className="text-lg sm:text-2xl font-bold text-green-600">
              ₹{product.dp} <span className="text-xs sm:text-sm text-gray-500">(Discounted Price)</span>
            </p>
            <p className="text-sm sm:text-md font-medium text-gray-700">S.P. : ₹{product.sp}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 sm:mt-6 flex justify-center space-x-3 sm:space-x-4">
            <button className="px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold text-white bg-gradient-to-r from-green-700 to-green-500 rounded-full shadow-md hover:from-green-800 hover:to-green-600 transition">
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold text-gray-700 border border-gray-400 rounded-full shadow-md hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
