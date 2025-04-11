"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function normalizeDate(dateStr) {
  if (!dateStr) return "";
  if (dateStr.includes("-")) return dateStr;

  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return dateStr;
}

export default function Page() {
  const { data: session } = useSession();
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
        if (response.data?.WalletDetails) {
          setRawData(response.data.WalletDetails);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  useEffect(() => {
    const grouped = {};

    rawData.forEach(item => {
      const normDate = normalizeDate(item.date);
      const sc = parseFloat(item.salecommission || 0);
      const sg = parseFloat(item.salesgrowth || 0);
      const perf = parseFloat(item.performance || 0);
      const total = sc + sg + perf;

      if (!grouped[normDate]) grouped[normDate] = 0;
      grouped[normDate] += total;
    });

    let result = Object.entries(grouped).map(([date, total], index) => {
      const tdsAmount = total * 0.05;
      const remaining = total - tdsAmount;

      return {
        id: index + 1,
        from: date,
        to: date,
        amount: total,
        tdsAmount,
        remaining,
      };
    });

    if (fromDate || toDate) {
      result = result.filter(entry => {
        const entryDate = new Date(entry.from);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        // set time to midnight for consistency
        if (from) from.setHours(0, 0, 0, 0);
        if (to) to.setHours(23, 59, 59, 999); // include entire day

        return (!from || entryDate >= from) && (!to || entryDate <= to);
      });
    }


    result.sort((a, b) => (a.from < b.from ? 1 : -1));
    setFilteredData(result);
  }, [rawData, fromDate, toDate]);

  const exportToExcel = () => {
    const csvRows = [
      ["S.No", "From", "To", "Amount (₹)"],
      ...filteredData.map((item) => [
        item.id,
        item.from,
        item.to,
        item.amount.toFixed(2),
      ]),
    ];

    const csvString = csvRows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "total_income.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 text-sm">
      <Toaster />
      <h1 className="text-xl md:text-2xl text-blue-400  border-b pb-2 mb-4 capitalize ">
        TDS Deduction income
      </h1>

      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">From Date</label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border border-gray-500 px-2 py-1 w-40 text-gray-800"
            placeholderText="Select date"
            maxDate={new Date()}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">To Date</label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border border-gray-500 px-2 py-1 w-40 text-gray-800"
            placeholderText="Select date"
            maxDate={new Date()}
          />
        </div>

        {(fromDate || toDate) && (
          <button
            onClick={() => {
              setFromDate(null);
              setToDate(null);
            }}
            className="text-red-600 underline text-sm"
          >
            Clear Filters
          </button>
        )}

        <button
          onClick={exportToExcel}
          className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-1 border border-green-800"
        >
          Export to Excel
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-400 text-left text-gray-800">
            <thead className="bg-gray-100 border-b border-gray-400">
              <tr>
                <th className="px-4 py-2 border-r">S. No.</th>
                <th className="px-4 py-2 border-r">From</th>
                <th className="px-4 py-2 border-r">To</th>
                <th className="px-4 py-2 border-r">Amount</th>
                <th className="px-4 py-2 border-r">TDS (5%)</th>
                <th className="px-4 py-2">Net Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredData.map((item,index) => (
                  <tr key={item.id} className="border-t border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-2 border-r">{index+1}</td>
                    <td className="px-4 py-2 border-r">{item.from}</td>
                    <td className="px-4 py-2 border-r">{item.to}</td>
                    <td className="px-4 py-2 border-r text-green-700 font-semibold">
                      ₹{item.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border-r text-red-600 font-medium">
                      ₹{item.tdsAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-blue-700 font-medium">
                      ₹{item.remaining.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
          {/* TDS Summary */}
          {filteredData.length > 0 && (
            <div className="mt-8 p-4 bg-white  shadow-lg border border-gray-300 max-w-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">TDS Summary</h2>
              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between">
                  <span>First TDS (2%)</span>
                  <span className="text-red-500 font-medium">
                    ₹{filteredData.reduce((acc, curr) => acc + curr.amount * 0.02, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Second TDS (3%)</span>
                  <span className="text-red-500 font-medium">
                    ₹{filteredData.reduce((acc, curr) => acc + curr.amount * 0.03, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2 text-gray-800">
                  <span>Total TDS (5%)</span>
                  <span>
                    ₹{filteredData.reduce((acc, curr) => acc + curr.tdsAmount, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
