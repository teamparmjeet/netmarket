"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Search, ShoppingCart, Truck } from "lucide-react";

export default function Header() {
  const [language, setLanguage] = useState("Products");
  const [country, setCountry] = useState("Discover");

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between fixed top-0 w-full z-50">
     
      <div className="flex space-x-4">
        <div className="relative">
          <select
            className="appearance-none p-2  text-gray-700 cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <div className="relative">
          <select
            className="appearance-none p-2  text-gray-700 cursor-pointer"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>USA</option>
            <option>India</option>
            <option>Germany</option>
          </select>
        </div>
        <div>
          <p className="p-2 text-gray-700 cursor-pointer">Discover</p>
        </div>
      </div>

      {/* Middle: Logo */}
      <div className="text-2xl font-bold text-blue-600">
        <Link href="/">
          <Image src="/images/logo/logo-blank.png" alt="Logo" width={60} height={60} className="hover:opacity-80 transition" />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search product..."
            className="p-2 pl-10 pr-4 border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>
        <Link href="/signin">
          <button className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">
            Login
          </button>
        </Link>
        <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition" />
        <Truck className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition" />
      </div>
    </header>



  );
}
