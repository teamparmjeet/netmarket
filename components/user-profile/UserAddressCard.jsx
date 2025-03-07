"use client"
import React, { useState } from "react";
import Image from "next/image";

export default function UserAddressCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className="p-5 border  border-gray-200 bg-white  rounded-2xl dark:bg-gray-800 dark:border-gray-200 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Address
                        </h4>

                        <div className="grid grid-cols-1 gap-4  lg:grid-cols-2 lg:gap-7  my-5  lg:my-10">
                            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Address
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    GRAM DANTARDA KALAN,SHEOPUR
                                </p>
                            </div>
                            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Permanent Address
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    GRAM DANTARDA KALAN,SHEOPUR
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  lg:gap-7 2xl:gap-x-14">
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Address 2
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90 me-2">
                                    GRAM DANTARDA KALAN,SHEOPUR
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Post Office
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    Murlipura                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Land Mark
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    S.N.M. Hospital
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    State
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    Rajasthan
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    City
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    Jaipur
                                </p>

                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Pin Code
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    302013
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 w-full h-full  bg-gray-300 dark:bg-gray-800 z-50 flex items-center justify-center"
                    onClick={() => setIsModalOpen(false)} // Close modal on background click
                >
                    <div
                        className="relative max-w-[700px]  w-full mx-auto overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <div className="px-2 pr-14">
                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                Edit Address 
                            </h4>
                            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                                Update your details to keep your profile up-to-date.
                            </p>
                        </div>
                        <form className="flex flex-col">
                            <div className="h-[450px] overflow-y-auto px-2 pb-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 text-gray-800 dark:text-white/90">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Address</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Address" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Address 2</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Address 2" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Permanent Address</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Permanent Address" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Post Office</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Post Office" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Land Mark</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Land Mark " />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">State</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter State  " />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">City</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter City " />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Pin Code </label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Pin Code" />
                                    </div>
                                </div>

                            </div>
                            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                                <button
                                    type="button"
                                    className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
