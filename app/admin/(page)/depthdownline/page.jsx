"use client";

import React from "react";

const depthDownlineSellers = [
  {
    sno: 1,
    dsCode: "3266F0D",
    name: "NARENDRA MEENA",
    saleGroup: "SGO",
    doj: "23/09/2020",
    sponsorCode: "C365CF",
    selfSp: "100.00",
    totalSp: "104906.75",
    currTotalSp: "0.00",
    currSelfRsp: "0.00",
    currTotalRsp: "0.00",
  },
  {
    sno: 2,
    dsCode: "9D8B6A",
    name: "RAMMUKAT MEENA",
    saleGroup: "SAO",
    doj: "02/12/2018",
    sponsorCode: "C365CF",
    selfSp: "27.00",
    totalSp: "847.00",
    currTotalSp: "0.00",
    currSelfRsp: "0.00",
    currTotalRsp: "0.00",
  },
];

export default function page() {
  return (
    <div className="lg:p-6 p-2 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Depth Downline</h2>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-blue-600 text-white text-sm uppercase sticky top-0">
            <tr>
              {[
                "S.No",
                "DS Code",
                "DS Name",
                "Sale Group",
                "DOJ",
                "Sponsor DS Code",
                "Self SP",
                "Total SP",
                "Curr. Total SP",
                "Curr. Self RSP",
                "Curr. Total RSP",
              ].map((header, index) => (
                <th key={index} className="p-3 border border-gray-300 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {depthDownlineSellers.map((seller, index) => (
              <tr
                key={seller.sno}
                className={`border-b text-gray-700 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="p-3 border text-center">{seller.sno}</td>
                <td className="p-3 border text-center font-medium text-blue-600">{seller.dsCode}</td>
                <td className="p-3 border text-left">{seller.name}</td>
                <td className="p-3 border text-center">{seller.saleGroup}</td>
                <td className="p-3 border text-center">{seller.doj}</td>
                <td className="p-3 border text-center">{seller.sponsorCode}</td>
                <td className="p-3 border text-right font-semibold">{seller.selfSp}</td>
                <td className="p-3 border text-right font-semibold">{seller.totalSp}</td>
                <td className="p-3 border text-right">{seller.currTotalSp}</td>
                <td className="p-3 border text-right">{seller.currSelfRsp}</td>
                <td className="p-3 border text-right">{seller.currTotalRsp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-lg font-semibold text-gray-800 text-center mt-4">
        Total Direct Seller: <span className="text-blue-600">{depthDownlineSellers.length}</span>
      </p>
    </div>
  );
}
