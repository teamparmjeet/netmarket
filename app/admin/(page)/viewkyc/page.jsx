"use client";
import React from 'react';
import PanCardDetails from '../../component/viewkyc-card/PanCardDetails';
import AadharcardDetails from '../../component/viewkyc-card/AadharcardDetails';
import AddressProof from '../../component/viewkyc-card/AddressProof';
import AgeProof from '../../component/viewkyc-card/AgeProof';
import PhotoIdentity from '../../component/viewkyc-card/PhotoIdentity';
import BankDetails from '../../component/viewkyc-card/BankDetails';
import PhotoGraph from '../../component/viewkyc-card/PhotoGraph';

export default function page() {
    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Uploaded ID Proof&apos;s
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <PanCardDetails />
                    <AadharcardDetails />
                    <AddressProof />
                    <AgeProof />
                    <PhotoIdentity />
                    <BankDetails />
                    <PhotoGraph />
                </div>
            </div>
        </>
    )
}
