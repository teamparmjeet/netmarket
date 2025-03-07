import React from 'react'

export default function PanCardDetails() {
    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <p className="my-4 text-2xl font-light text-gray-700 dark:text-white/90">Pan card </p>
                <div className="grid grid-cols-2 ">
                    <div className="col-span-2">
                        <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                            PAN No.
                        </p>
                        <input
                            type="text"
                            placeholder="Enter PAN Number"
                            className="p-2 rounded-md text-md font-medium bg-black/10 text-gray-800 dark:text-white/90 border border-gray-300 dark:border-gray-700 focus:border-transparent focus:ring-0 focus:outline-none w-full"
                        />
                    </div>
                    <div className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-center bg-black/10 dark:bg-gray-800 h-40 mt-4">
                        <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                            PAN Card Image
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
