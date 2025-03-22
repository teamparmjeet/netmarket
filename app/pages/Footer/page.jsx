import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Products Range */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b-2 pb-2 border-blue-500">
              Products Range
            </h2>
            <ul className="space-y-2 text-gray-300">
              {[
                "HOME CARE",
                "HAIR CARE",
                "BEAUTY & PERSONAL CARE",
                "MAKEUP MANTRAS",
                "ORAL CARE",
                "AGRICULTURE PRODUCTS",
                "WELLNESS PRODUCT",
                "FOOD PRODUCT",
              ].map((item) => (
                <li key={item} className="hover:text-blue-400 transition-all cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b-2 pb-2 border-blue-500">
              Navigations
            </h2>
            <ul className="space-y-2 text-gray-300">
              {[
                "About Us",
                "Success Stories",
                "Director Message",
                "Achievements",
                "Legals",
                "Downloads",
                "Bankers",
                "Grievance Cell",
                "View Grievance Status",
                "DS Search",
                "DE List",
                "RM Login",
                "Audit Executive Login",
              ].map((item) => (
                <li key={item} className="hover:text-blue-400 transition-all cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b-2 pb-2 border-blue-500">
              Policies
            </h2>
            <ul className="space-y-2 text-gray-300">
              {[
                "Obligations",
                "Prohibitions",
                "Model Code Of Conduct",
                "Terms & Conditions",
                "Other Policies",
              ].map((item) => (
                <li key={item} className="hover:text-blue-400 transition-all cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b-2 pb-2 border-blue-500">
              Contact Us
            </h2>
            <p className="text-gray-300 mb-2">
              <strong>Corporate Office:</strong> Plot No. 18, Pocket-8, Block-C,
              Near HDFC Bank, Sector-17, Dwarka, New Delhi - 110075
            </p>
            <p className="text-gray-300 mb-2">
              <strong>Registered Office:</strong> THIRD FLOOR AT PLOT NO. B-1/7,
              MAIN GANDHIPATH, JAIPUR, Rajasthan, India, 302021
            </p>
            <p className="text-gray-300 mb-2">
              <strong>GST No:</strong> 08AAMCA9419N2ZX
            </p>
            <p className="text-gray-300 mb-2">
              <strong>Phone:</strong> +91 11 28033739
            </p>
            <p className="text-gray-300">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@asclepiuswellness.com"
                className="hover:text-blue-400 transition-all"
              >
                info@asclepiuswellness.com
              </a>
            </p>
          </div>
        </div>

        {/* Download App & Social Links */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6 border-gray-700">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg shadow-md">
            Download App
          </button>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-400 transition-all">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-all">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-all">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-all">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          &copy; {new Date().getFullYear()} Asclepius Wellness Private Limited.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
