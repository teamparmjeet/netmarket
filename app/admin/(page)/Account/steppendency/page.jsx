"use client";

import React from "react";

const stepPendingData = [
  { id: 1, step: 1, totalSAOSP: 200, totalSGOSP: 100, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 0, remainSGOSP: 0, status: "Complete" },
  { id: 2, step: 2, totalSAOSP: 800, totalSGOSP: 400, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 0, remainSGOSP: 0, status: "Complete" },
  { id: 3, step: 3, totalSAOSP: 2000, totalSGOSP: 1000, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 1153, remainSGOSP: 0, status: "Pending" },
  { id: 4, step: 4, totalSAOSP: 4400, totalSGOSP: 2200, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 3553, remainSGOSP: 0, status: "Pending" },
  { id: 5, step: 5, totalSAOSP: 9200, totalSGOSP: 4600, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 8353, remainSGOSP: 0, status: "Pending" },
  { id: 6, step: 6, totalSAOSP: 21200, totalSGOSP: 10600, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 20353, remainSGOSP: 0, status: "Pending" },
  { id: 7, step: 7, totalSAOSP: 45200, totalSGOSP: 22600, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 44353, remainSGOSP: 0, status: "Pending" },
  { id: 8, step: 8, totalSAOSP: 93200, totalSGOSP: 46600, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 92353, remainSGOSP: 0, status: "Pending" },
  { id: 9, step: 9, totalSAOSP: 189200, totalSGOSP: 94600, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 188353, remainSGOSP: 0, status: "Complete" },
  { id: 10, step: 10, totalSAOSP: 381200, totalSGOSP: 190600, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 380353, remainSGOSP: 85693.25, status: "Pending" },
  { id: 11, step: 11, totalSAOSP: 765200, totalSGOSP: 382600, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 764353, remainSGOSP: 277693.25, status: "Pending" },
  { id: 12, step: 12, totalSAOSP: 1533200, totalSGOSP: 766600, SAOSP: 847, SGOSP: 104906.75, remainSAOSP: 1532353, remainSGOSP: 661693.25, status: "Pending" },
];
const thdata = [
"ID", "Step", "Total SAOSP", "Total SGOSP", "SAOSP", "SGOSP", "Remain SAOSP", "Remain SGOSP", "Status"
]

export default function page() {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-6">Step Pending</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white  border-collapse">
          <thead className="bg-blue-600 text-white text-sm uppercase sticky top-0">
            <tr>
              {thdata.map((header, index) => (
                <th key={index} className="p-3 border border-gray-300 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stepPendingData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b text-gray-700 dark:bg-gray-800 dark:text-white ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                                                  {/*for 6 digit ds code  */}
                <td className="p-3 border text-center">{item.id+100000}</td>
                <td className="p-3 border text-center">{item.step}</td>
                <td className="p-3 border text-right">{item.totalSAOSP.toFixed(2)}</td>
                <td className="p-3 border text-right">{item.totalSGOSP.toFixed(2)}</td>
                <td className="p-3 border text-right">{item.SAOSP.toFixed(2)}</td>
                <td className="p-3 border text-right">{item.SGOSP.toFixed(2)}</td>
                <td className="p-3 border text-right">{item.remainSAOSP.toFixed(2)}</td>
                <td className="p-3 border text-right">{item.remainSGOSP.toFixed(2)}</td>
                <td className={`p-3 border text-center font-semibold ${
                  item.status === "Complete" ? "text-green-600" : "text-red-600"
                }`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-lg font-semibold text-gray-800 dark:text-white text-center mt-4">
        Total Steps: <span className="text-blue-600">{stepPendingData.length}</span>
      </p>
    </div>
  );
}
