"use client";
import React from "react";
import {
  Users,
  Wallet,
  Banknote,
  Star,
  TrendingUp,
  Trophy,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import Dashboard1 from "@/components/Dashboard/Dashboard1";
import Dashboard2 from "@/components/Dashboard/Dashboard2";
import Dashboard3 from "@/components/Dashboard/Dashboard3";
export default function page() {
  return (
    <div>

      <Dashboard2 />
      <Dashboard1 />
      <Dashboard3 />


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border overflow-hidden">
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
          <Wallet className="inline-block mr-2 text-green-500" />
          <p className="text-gray-700 dark:text-white font-semibold">
            Current SAO SP:{" "}
            <span className="text-gray-700 dark:text-white">0.00</span>
          </p>
          <p className="text-blue-600 font-semibold">
            Current SGO SP:{" "}
            <span className="text-gray-700 dark:text-white">0.00</span>
          </p>
        </div>

        <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border overflow-hidden">
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
          <TrendingUp className="inline-block mr-2 text-blue-500" />
          <p className="text-gray-700 dark:text-white font-semibold">
            Curr. Self RSP:{" "}
            <span className="text-gray-700 dark:text-white">0.00</span>
          </p>
          <p className="text-gray-700 dark:text-white">
            Curr. Team RSP:{" "}
            <span className="text-gray-700 dark:text-white">0.00</span>
          </p>
        </div>

        <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border overflow-hidden">
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
          <Star className="inline-block mr-2 text-yellow-500" />
          <p className="text-gray-700 dark:text-white font-semibold">
            Curr. SAO RSP:{" "}
            <span className="text-gray-700 dark:text-white">0.00</span>
          </p>
          <p className="text-gray-700 dark:text-white">
            Curr. SGO RSP:{" "}
            <span className="text-gray-700 dark:text-white">0.00</span>
          </p>
        </div>
        <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border overflow-hidden">
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
          <Wallet className="inline-block mr-2 text-green-500" />
          <p className="text-gray-700 dark:text-white font-semibold">
            Total Income:{" "}
            <span className="text-gray-700 dark:text-white">14000.00</span>
          </p>
          <p className="text-blue-600 font-semibold">
            Sales Growth Commission:{" "}
            <span className="text-gray-700 dark:text-white">8000.00</span>
          </p>
        </div>

        <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border overflow-hidden">
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
          <TrendingUp className="inline-block mr-2 text-blue-500" />
          <p className="text-gray-700 dark:text-white font-semibold">
            Sales Performance Commission:{" "}
            <span className="text-gray-700 dark:text-white">6000.00</span>
          </p>
          <p className="text-gray-700 dark:text-white">
            Premium Star Commission: 0.00
          </p>
        </div>

        <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border overflow-hidden">
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
          <Star className="inline-block mr-2 text-yellow-500" />
          <p className="text-gray-700 dark:text-white font-semibold">
            Direct Leg Commission: 0.00
          </p>
          <p className="text-gray-700 dark:text-white">
            Repurchase Commission: 0.00
          </p>
        </div>
      </div>



    </div>
  );
}
