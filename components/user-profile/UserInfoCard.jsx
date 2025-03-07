"use client"
import React, { useState } from "react";
import Image from "next/image";

export default function UserInfocard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-200 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Personal Information
                        </h4>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    DS Name *
                                </p>
                                <div className="flex">
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90 me-2">
                                        Mr.
                                    </p>
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        Musharof Chowdhury
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    D.O.B.
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    01/01/1991
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Email address
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    randomuser@pimjo.com
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Phone
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    +09 363 398 46
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Father&apos;s Name *
                                </p>
                                <div className="flex">
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90 me-2">
                                        S/O
                                    </p>
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        NARAYAN Chowdhury
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Gender
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    Male
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Profession
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    Engineer
                                </p>
                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Marital Status
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    Married
                                </p>

                            </div>
                            <div>
                                <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                    Date Of Marriage
                                </p>
                                <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                    07/04/4024
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
                    className="fixed inset-0 w-full h-full  bg-gray-300 z-50 flex items-center justify-center"
                    onClick={() => setIsModalOpen(false)} // Close modal on background click
                >
                    <div
                        className="relative max-w-[700px]  w-full mx-auto overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <div className="px-2 pr-14">
                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                Edit Personal Information
                            </h4>
                            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                                Update your details to keep your profile up-to-date.
                            </p>
                        </div>
                        <form className="flex flex-col">
                            <div className="h-[450px] overflow-y-auto px-2 pb-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 text-gray-800 dark:text-white/90">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">DS Name *</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Name" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">D.O.B.</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="D.O.B." />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Email address</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Email" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Phone</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Phone No." />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Father's Name *</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Father's Name " />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Gender</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Gender " />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Profession </label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Profession" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Marital Status</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Marital Status" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Date Of Marriage </label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Date Of Marriage " />
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
