"use client";
import React from "react";

const categories = {
  "HOME CARE": [
    { code: "100", name: "POWER FLUSH TOILET CLEANER", dp: "₹83.00", sp: "0.25", rsp: "0.25" },
    { code: "101", name: "LIMFRESH LIQUID DISH WASH", dp: "₹89.00", sp: "0.25", rsp: "0.25" },
    { code: "103", name: "BATHVEDA GLYCERIN & NATURAL OIL BAR", dp: "₹169.00", sp: "0.25", rsp: "0.25" },
    { code: "104", name: "BATHVEDA BEAUTY CREAM BAR", dp: "₹167.00", sp: "0.25", rsp: "0.25" },
    { code: "105", name: "BATHVEDA GOAT MILK BAR", dp: "₹300.00", sp: "0.50", rsp: "0.50" }
  ],
  "AGRICULTURE PRODUCTS": [
    { code: "126", name: "VEDIK AGRO PGPR", dp: "₹515.00", sp: "3.00", rsp: "3.00" },
    { code: "128", name: "VEDIK AGRO AGRO 90", dp: "₹494.00", sp: "2.00", rsp: "2.00" },
    { code: "129", name: "VEDIK AGRO ECO HARIYALI", dp: "₹1015.00", sp: "6.00", rsp: "6.00" },
    { code: "130", name: "VEDIK AGRO BHUVITA SOIL CONDITIONER", dp: "₹496.00", sp: "2.00", rsp: "2.00" },
    { code: "131", name: "VEDIK AGRO BIO NPK", dp: "₹620.00", sp: "3.00", rsp: "3.00" }
  ],
  "BEAUTY & PERSONAL CARE": [
    { code: "131", name: "MAKEUP MANTRAS LIP BALM", dp: "₹31.00", sp: "0.10", rsp: "0.10" },
    { code: "133", name: "MAKEUP MANTRAS KIWI FRUIT FACE WASH", dp: "₹139.00", sp: "0.50", rsp: "0.50" },
    { code: "134", name: "MAKEUP MANTRAS STRAWBERRY FACE WASH", dp: "₹140.00", sp: "0.50", rsp: "0.50" },
    { code: "135", name: "MAKEUP MANTRAS DAY CREAM FOR MEN", dp: "₹231.00", sp: "1.00", rsp: "1.00" },
    { code: "136", name: "MAKEUP MANTRAS NIGHT CREAM FOR WOMEN", dp: "₹236.00", sp: "1.00", rsp: "1.00" }
  ],
  "HAIR CARE": [
    { code: "11", name: "MAKEUP MANTRAS HAIRDOC OIL", dp: "₹215.00", sp: "1.00", rsp: "1.00" },
    { code: "12", name: "MAKEUP MANTRAS EXE HAIR CLEANSER", dp: "₹210.00", sp: "1.00", rsp: "1.00" },
    { code: "147", name: "MAKEUP MANTRAS HAIRDOC OIL 200 ML", dp: "₹404.00", sp: "2.00", rsp: "2.00" },
    { code: "60", name: "MAKEUP MANTRAS EXE HAIR SHINE OINT", dp: "₹236.00", sp: "1.00", rsp: "1.00" },
    { code: "61", name: "MAKEUP MANTRAS HAIR SERUM", dp: "₹299.00", sp: "1.50", rsp: "1.50" }
  ],
  "SPICES": [
    { code: "180", name: "ECO AROGYAM CHILLI POWDER-100 GM", dp: "₹54.00", sp: "0.10", rsp: "0.10" },
    { code: "181", name: "ECO AROGYAM CHILLI POWDER-200 GM", dp: "₹105.00", sp: "0.20", rsp: "0.20" },
    { code: "182", name: "ECO AROGYAM CHILLI POWDER-500 GM", dp: "₹256.00", sp: "0.50", rsp: "0.50" },
    { code: "183", name: "ECO AROGYAM CHILLI POWDER-1 KG", dp: "₹507.00", sp: "1.00", rsp: "1.00" },
    { code: "184", name: "ECO AROGYAM TURMERIC POWDER-100 GM", dp: "₹38.00", sp: "0.10", rsp: "0.10" }
  ],
};

export default function ProductList() {
  return (
    <div className="mx-auto lg:p-5 p-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg text-gray-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Product List</h2>
      {Object.entries(categories).map(([category, products]) => (
        <div key={category} className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{category}</h3>
          <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-600">
                <th className="border border-gray-300 px-4 py-2">S.NO.</th>
                <th className="border border-gray-300 px-4 py-2">Product Code</th>
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">DP</th>
                <th className="border border-gray-300 px-4 py-2">SP</th>
                <th className="border border-gray-300 px-4 py-2">RSP</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.code} className="text-center bg-white dark:bg-gray-800">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.code}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.dp}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.sp}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.rsp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}