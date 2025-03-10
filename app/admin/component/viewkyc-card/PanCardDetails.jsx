import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function PanCardDetails() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <p className="my-4 text-2xl font-light text-gray-700 dark:text-white/90">Pan card </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <p className="mb-2 text-md leading-normal text-gray-500 dark:text-gray-400">
                            PAN No
                        </p>
                        <input
                            type="text"
                            placeholder="Enter PAN Number"
                            className="p-2 rounded-md text-md font-medium bg-black/10 text-gray-800 dark:text-white/90 border border-gray-300 dark:border-gray-700 focus:border-transparent focus:ring-0 focus:outline-none w-full"
                        />
                    </div>
                    <div 
                        className="border border-gray-300 dark:border-gray-700 rounded-md p-4 flex items-center justify-center bg-black/10 dark:bg-gray-800 h-40 mt-4 overflow-hidden relative cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Image 
                            src="/Images/doc/aadhar.webp" 
                            alt="Pan Card" 
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md" 
                        />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-white dark:bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={() => setIsModalOpen(false)}>
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute top-2 right-2 text-white text-6xl"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X size={24} />
                        </button>
                        <Image 
                            src="/Images/doc/aadhar.webp" 
                            alt="Pan Card" 
                            width={500} 
                            height={300} 
                            className="rounded-md" 
                        />
                    </div>
                </div>
            )}
        </>
    )
}
