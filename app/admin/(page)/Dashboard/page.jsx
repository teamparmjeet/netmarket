'use client';
import React, { useEffect, useState } from 'react';
import Dashboard1 from "@/components/Dashboard/Dashboard1";
import Dashboard2 from "@/components/Dashboard/Dashboard2";
import Dashboard3 from "@/components/Dashboard/Dashboard3";
import Dashboard4 from "@/components/Dashboard/Dashboard4";
import Image from 'next/image';

export default function page() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <>
      {/* <Dashboard2 /> */}
      <Dashboard1 />
      <Dashboard3 />
      <Dashboard4 />

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="relative w-full h-[500px] mb-4 rounded overflow-hidden">
              <Image
                src="/images/user/17437703181722825926.jpeg"
                alt="User Image"
                fill
                className="object-contain" // Or use "object-cover" based on your preference
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
