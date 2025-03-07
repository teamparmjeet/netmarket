import React from 'react'

export default function page() {
    return (
        <>
            <div className="rounded-2xl border h-[90vh] border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Upload ID CARD
                </h3>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32 my-6">

                        <div className="col-span-2 md:col-span-1">
                            <label className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400" htmlFor="dsCode">
                                DS CODE
                            </label>
                            <input
                                id="dsCode"
                                type="text"
                                placeholder="Enter DS Code"
                                className="p-2 rounded-md text-md font-medium bg-black/10 text-gray-800 dark:text-white/90 border border-gray-300 dark:border-gray-700 focus:border-transparent focus:ring-0 focus:outline-none w-full"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400" htmlFor="dsName">
                                DS Name
                            </label>
                            <input
                                id="dsName"
                                type="text"
                                placeholder="Enter Name"
                                className="p-2 rounded-md text-md font-medium bg-black/10 text-gray-800 dark:text-white/90 border border-gray-300 dark:border-gray-700 focus:border-transparent focus:ring-0 focus:outline-none w-full"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 dark:text-gray-300" htmlFor="uploadImage">
                                Upload Image
                            </label>
                            <input
                                id="uploadImage"
                                type="file"
                                accept="image/*"
                                className="border rounded w-full p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                            />
                        </div>

                        <div className="col-span-2 flex justify-start">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}
