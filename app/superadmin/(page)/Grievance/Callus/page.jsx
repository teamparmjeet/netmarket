"use client";
import React from "react";
import { Mail, Phone } from "lucide-react";

const contactSections = [
  { title: "Account Section", phone: "+91 9953354092", email: "accounts@asclepiuswellness.com" },
  { title: "Product Section", phone: "+91 8800397419", email: "products@asclepiuswellness.com" },
  { title: "Admin/Greening Section", phone: "+91 8800396549", email: "idgreening@asclepiuswellness.com" },
  { title: "Payout Section", phone: "+91 9953439499", email: "Payouts@asclepiuswellness.com" },
  { title: "Franchisee Section", phone: "+91 9953350984", email: "franchisee@asclepiuswellness.com" },
  { title: "KYC Section", phone: "+91 8800395899", email: "kyc@asclepiuswellness.com" },
  { title: "Customer Care", phone: "+91 9953354128", email: "customercare@asclepiuswellness.com" }
];

export default function page() {
  return (
    <div className="w-full lg:p-6 p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Contact Us</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactSections.map((section, index) => (
          <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{section.title}</h3>
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Phone size={16} /> {section.phone}
            </p>
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-1">
              <Mail size={16} />
              <a href={`mailto:${section.email}`} className="text-blue-500 hover:underline">
                {section.email}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}