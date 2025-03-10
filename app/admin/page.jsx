"use client";
import React from "react";
import { Users, Wallet, Banknote, Star, TrendingUp, Trophy, ArrowUpRight, FileText } from "lucide-react";

export default function Dashboard() {
    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6  bg-white rounded-lg shadow-md border">
                <div className="p-4">
                    <p className="text-gray-700 font-semibold">Status: <span className="text-green-600">Active</span></p>
                    <p className="text-gray-700 font-semibold">KYC Status: <span className="text-blue-600 cursor-pointer">Click Here...</span></p>
                    <p className="text-gray-700 font-semibold">Bank KYC Status: <span className="text-blue-600 cursor-pointer">Click Here...</span></p>
                    <p className="text-gray-700 font-semibold">PHY KYC Status: <span className="text-blue-600 cursor-pointer">Click Here...</span></p>
                </div>
                <div className="p-4 ">
                    <p className="text-gray-700 font-semibold">Sales SAO:</p>
                    <p className="text-gray-700 font-semibold">Sales SGO:</p>
                    <p className="text-gray-700 font-semibold">Repurchase Income:</p>
                    <p className="text-gray-700 font-semibold">Monthly Sales Purchase SP: <span className="text-red-600">0.00</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                    { title: "SAO Team SP", value: "847.00" },
                    { title: "SAO Team ID", value: "34" },
                    { title: "SAO Total Team", value: "23 / 11" }

                ].map((item, index) => (
                    <div key={index} className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                        <p className="text-blue-600 font-semibold">{item.title}: <span className="text-gray-700">{item.value}</span></p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                    { title: "SGO Team SP", value: "104906.75" },
                    { title: "SGO Team ID", value: "2922" },
                    { title: "SGO Total Team", value: "1288 / 1634" }
                ].map((item, index) => (
                    <div key={index} className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                        <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                        <p className="text-blue-600 font-semibold">{item.title}: <span className="text-gray-700">{item.value}</span></p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                    <Wallet className="inline-block mr-2 text-green-500" />
                    <p className="text-gray-700 font-semibold">Current SAO SP: <span className="text-gray-700">0.00</span></p>
                    <p className="text-blue-600 font-semibold">Current SGO SP: <span className="text-gray-700">0.00</span></p>
                </div>

                <div className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                    <TrendingUp className="inline-block mr-2 text-blue-500" />
                    <p className="text-gray-700 font-semibold">Curr. Self RSP: <span className="text-gray-700">0.00</span></p>
                    <p className="text-gray-700">Curr. Team RSP: <span className="text-gray-700">0.00</span></p>
                </div>

                <div className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                    <Star className="inline-block mr-2 text-yellow-500" />
                    <p className="text-gray-700 font-semibold">Curr. SAO RSP: <span className="text-gray-700">0.00</span></p>
                    <p className="text-gray-700">Curr. SGO RSP: <span className="text-gray-700">0.00</span></p>
                </div>
                <div className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                    <Wallet className="inline-block mr-2 text-green-500" />
                    <p className="text-gray-700 font-semibold">Total Income: <span className="text-gray-700">14000.00</span></p>
                    <p className="text-blue-600 font-semibold">Sales Growth Commission: <span className="text-gray-700">8000.00</span></p>
                </div>

                <div className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                    <TrendingUp className="inline-block mr-2 text-blue-500" />
                    <p className="text-gray-700 font-semibold">Sales Performance Commission: <span className="text-gray-700">6000.00</span></p>
                    <p className="text-gray-700">Premium Star Commission: 0.00</p>
                </div>

                <div className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                    <Star className="inline-block mr-2 text-yellow-500" />
                    <p className="text-gray-700 font-semibold">Direct Leg Commission: 0.00</p>
                    <p className="text-gray-700">Repurchase Commission: 0.00</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                    <Trophy className="inline-block mr-2 text-purple-500" />
                    <p className="text-gray-700 font-semibold">Trip Commission: 0.00</p>
                </div>

                <div className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                    <ArrowUpRight className="inline-block mr-2 text-red-500" />
                    <p className="text-gray-700 font-semibold">Current Level: <span className="text-gray-700">SILVER DS</span></p>
                    <p className="text-gray-700">Level Next Target: 12 : 6</p>
                </div>

                <div className="relative p-4 bg-white rounded-lg shadow-md border overflow-hidden">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-sky-500"></div>
                    <FileText className="inline-block mr-2 text-gray-500" />
                    <p className="text-gray-700 font-semibold">Bonanza Status: <span className="text-red-500">Pending</span></p>
                </div>
            </div>


            <div className="p-4 bg-white rounded-lg shadow-md border">
                <p className="text-lg font-semibold">For Direct Sellers</p>
                <p className="text-blue-600 cursor-pointer">SAO Link</p>
                <p className="text-blue-600 cursor-pointer">SGO Link</p>
                <p className="text-lg font-semibold mt-2">For Customers</p>
                <p className="text-blue-600 cursor-pointer">SAO Link</p>
                <p className="text-blue-600 cursor-pointer">SGO Link</p>
            </div>
        </div>
    );
}
