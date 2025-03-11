"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Printer } from "lucide-react";
import { useSession } from "next-auth/react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function page() {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(true);
    const { data: session, update } = useSession();
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
   

    useEffect(() => {
        const fetchUserData = async () => {
            if (!session?.user?.email) return;
            try {
                const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
                if (response.data?.name) {
                    setData(response.data);

                }
            } catch (error) {
                console.error("Failed to fetch user name:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchUserData();
    }, [session?.user?.email]);
    return (
        <>
            <div className="flex justify-start bg-white dark:bg-gray-900 p-6">
                <button
                  onClick={() => reactToPrintFn()}
                    className="flex items-center justify-center w-36 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden"
                >
                    <Printer className="w-5 h-5 mr-2" />
                    Print ID Card
                </button>
            </div>

            <div ref={contentRef} className="flex flex-col items-center justify-center min-h-screen p-6 bg-white dark:bg-gray-800">
                <div className="relative w-[350px] md:w-[400px] border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-lg p-6 print:p-4">
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Asclepius Wellness Pvt. Ltd.
                        </h2>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            Reg. No. U51909RJ2014PTC084662
                        </p>
                    </div>

                    <div className="border-t my-4 border-gray-300 dark:border-gray-700"></div>

                    <div className="space-y-2 text-gray-800 dark:text-white text-sm">
                        <p><strong>Name:</strong> {data?.name}</p>
                        <p><strong>Address:</strong> {data?.address?.addressLine1}</p>
                        <p><strong>Mobile No.:</strong> {data?.mobileNo}</p>
                        <p><strong>DS Code:</strong> {data?.mobileNo}</p>
                    </div>

                    <div className="border-t my-4 border-gray-300 dark:border-gray-700"></div>

                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Terms & Conditions:</strong> The Direct Seller is not authorized to collect any cheques, demand drafts, or cash in their name from the customer.
                    </p>

                    <div className="mt-4 text-center text-xs text-gray-600 dark:text-gray-400">
                        <p>Registered Office:</p>
                        <p>Third Floor, Plot No. B-1/7, Main Gandhipath, Jaipur, Rajasthan, 302021</p>
                        <p>Website: www.asclepiuswellness.com</p>
                        <p>Contact: +91 11 28031568 | info@asclepiuswellness.com</p>
                    </div>
                </div>
            </div>
        </>
    );
}
