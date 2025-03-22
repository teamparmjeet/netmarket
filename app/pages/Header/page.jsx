"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Search, ShoppingCart, Truck } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [language, setLanguage] = useState("Products");

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`bg-white shadow-md py-4 px-6 grid grid-cols-3 items-center justify-between w-full z-50 transition-transform duration-800 ${
          isFixed ? "fixed top-0 left-0 right-0 translate-y-0" : "relative"
        }`}
      >

        <div className="flex items-center space-x-4 ">
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 text-gray-700 focus:outline-none"
          >
            <Menu size={28} />
          </button>
          <div className="hidden lg:flex space-x-4">
            <select
              className="appearance-none p-2 border border-gray-300 text-gray-700 cursor-pointer rounded-md"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <p className="p-2 text-gray-700 cursor-pointer">Register Now</p>
          </div>
        </div>

        <div className="flex items-center justify-center ">
          <Link href="/">
            <Image
              src="/images/logo/logo-blank.png"
              alt="Logo"
              width={60}
              height={60}
              className="hover:opacity-80 transition"
            />
          </Link>
        </div>

    
        <div className="flex items-center justify-end space-x-4 ">
          <div className="hidden lg:block relative">
            <input
              type="text"
              placeholder="Search product..."
              className="p-2 pl-10 pr-4 border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>

          <Link href="/signin">
            <button className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600 transition hidden md:block">
              Login
            </button>
          </Link>
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition" />
          <Truck className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition" />
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 w-3/5 max-w-sm h-full bg-white shadow-lg transform transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >

          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-red-500"
            >
              <X size={28} />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-4 text-gray-800">
              <li>
                <Link href="/" className="hover:text-blue-500 block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-blue-500 block">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500 block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-500 block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-blue-500 block">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search product..."
                className="w-full p-2 pl-10 pr-4 border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
