"use client"
import React, { useState } from "react";
import Image from "next/image";

export default function NomineeDetails() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRelation, setSelectedRelation] = useState("Wife");
    const relations = ["Brother", "Father", "Friend", "Mother", "Wife", "Sister"];


    return (
        <div>
            <div className="p-5 border bg-white dark:bg-gray-800 border-gray-200 rounded-2xl dark:border-gray-200  lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="w-full">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                                Co-Applicant&apos;s/Nominee Details
                            </h4>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  lg:gap-7 2xl:gap-x-14">
                                <div>
                                    <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                        Nominee Name
                                    </p>
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        ASHA
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                        Relation
                                    </p>
                                    <select
                                        className="w-full px-2 py-1 text-md font-medium text-gray-800 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring focus:ring-blue-200 focus:outline-none"
                                        value={selectedRelation}
                                        onChange={(e) => setSelectedRelation(e.target.value)}
                                    >
                                        {relations.map((relation) => (
                                            <option key={relation} value={relation}>
                                                {relation}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                        DOB
                                    </p>
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        01/01/1990
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 my-3 lg:my-6">
                                Payment Details
                            </h4>

                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-12">
                                <div>
                                    <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                        Bank Name
                                    </p>
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        JILA SAHKARI BANK
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                        Account No
                                    </p>
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        183000561414
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                        IFSC Code
                                    </p>
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        CBIN0MPDCAV
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 my-3 lg:my-6">
                                Kyc Detail&apos;s
                            </h4>

                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-14">
                                <div>
                                    <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                        Pan No
                                    </p>
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        FGJPM8600Q
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                                        Addhar No.
                                    </p>
                                    <p className="text-md font-medium text-gray-800 dark:text-white/90">
                                        329925538953
                                    </p>
                                </div>

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
                    > <div className="px-2 pr-14">
                            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                                Edit Nominee  Detail&apos;s
                            </h4>
                            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                                Update your details to keep your profile up-to-date.
                            </p>
                        </div>
                        <form className="flex flex-col">
                            <div className="h-[450px] overflow-y-auto px-2 pb-3">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 text-gray-800 dark:text-white/90">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Nominee Name</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Nominee Name" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">D.O.B.</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter D.O.B." />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Relation</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Relation" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Bank Name</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Bank Name" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Account No</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Account No." />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">IFSC Code</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter IFSC Code " />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Pan No </label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Pan No" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300">Addhar No.</label>
                                        <input className="border  rounded w-full p-2" type="text" placeholder="Enter Addhar No." />
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
