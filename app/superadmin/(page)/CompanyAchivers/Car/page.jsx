"use client";
import React, { useState } from "react";

const carAchievers = [
  { id: "906F93", name: "MAHIPAL SINGH", rank: "Crown Ambassador", city: "New Delhi", image: "/images/car/07.jpg" },
  { id: "6F53AB", name: "RAMVIR SINGH", rank: "Royal Ambassador", city: "Jaipur", image: "/images/car/09.jpg" },
  { id: "982123", name: "SHIV KUMAR", rank: "Royal Ambassador", city: "Gurugram", image: "/images/car/34.jpg" },
  { id: "423FF1", name: "AMIT KUMAR DUBEY", rank: "Ambassador", city: "Varanasi", image: "/images/car/35.jpg" },
  { id: "A5D4AD", name: "NASIB KHAN", rank: "Ambassador", city: "Jhunjhunu", image: "/images/car/37.jpg" },
  { id: "4B8FA4", name: "KRUNAL M JADAV", rank: "Ambassador", city: "Ahmedabad", image: "/images/car/07.jpg" },
  { id: "F3E477", name: "DILIP SINGH", rank: "Ambassador", city: "Jaipur", image: "/images/car/34.jpg" },
  { id: "AF166A", name: "ANUJ SHARMA", rank: "Crown Diamond", city: "Greater Noida", image: "/images/car/35.jpg" }
];

export default function CarAchievers() {
  return (
    <div className="mx-auto lg:p-6 p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Car Achievers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carAchievers.map((achiever) => (
          <div key={achiever.id} className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg flex flex-col items-center ">
            <img
              src={achiever.image}
              alt={achiever.name}
              className="w-64 h-64 object-cover rounded-lg border-4 border-gray-300 dark:border-gray-600 shadow-md"
            />
            <div className="mt-3 text-center w-2/3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{achiever.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">ID: {achiever.id}</p>
              <p className="text-md font-medium text-gray-700 dark:text-gray-300">{achiever.rank}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{achiever.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
