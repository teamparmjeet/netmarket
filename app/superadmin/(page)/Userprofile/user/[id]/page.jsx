"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
export default function UserProfile() {
    const { id } = useParams();
    const decodedId = decodeURIComponent(id);

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/user/find-admin-byemail/${decodedId}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [decodedId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-semibold animate-pulse">Loading...</div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500 font-semibold">{error}</p>;
    }

    if (!userData) {
        return <p className="text-center text-gray-500">No user data available.</p>;
    }

    return (
        <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
           
            <div className="flex items-center gap-6 border-b pb-4 mb-4">
                <Image
                    src={userData.image || "/images/user/icon-5359553_640.webp"}
                    alt="Profile"
                    width={200}
                    height={200}
                    className="w-24 h-24 rounded-full border object-cover shadow-md"
                />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                    <p className="text-gray-600">{userData.email}</p>
                    <p className="text-sm text-gray-500">{userData.gender}</p>
                </div>
            </div>

            
            <Section title="Personal Details">
                <InfoGrid>
                    <InfoCard label="Father/Husband Name" value={userData.fatherOrHusbandName} />
                    <InfoCard label="Date of Birth" value={formatDate(userData.dob)} />
                    <InfoCard label="Profession" value={userData.profession} />
                    <InfoCard label="Marital Status" value={userData.maritalStatus} />
                    <InfoCard label="Mobile Number" value={userData.mobileNo} />
                    <InfoCard label="DS Code" value={userData.dscode} />
                    <InfoCard label="PDS Code" value={userData.pdscode} />
                </InfoGrid>
            </Section>

            
            <Section title="Address">
                <p className="text-gray-600">{userData.address?.addressLine1 || "N/A"}</p>
                <p className="text-gray-600">
                    {userData.address?.city}, {userData.address?.state} - {userData.address?.pinCode}
                </p>
            </Section>

          
            <Section title="KYC Verification">
                <p className={`font-semibold ${userData.kycVerification?.isVerified ? "text-green-600" : "text-red-600"}`}>
                    {userData.kycVerification?.isVerified ? "Verified ✅" : "Not Verified ❌"}
                </p>
                <InfoGrid>
                    <InfoCard label="Proof Type" value={userData.kycVerification?.proofType} />
                    <InfoCard label="Document No" value={userData.kycVerification?.documentNo} />
                </InfoGrid>
            </Section>

            
            <Section title="Bank Details">
                <InfoGrid>
                    <InfoCard label="Bank Name" value={userData.bankName} />
                    <InfoCard label="Account Number" value={userData.acnumber} />
                    <InfoCard label="IFSC Code" value={userData.ifscCode} />
                </InfoGrid>
            </Section>

            
            <Section title="Nominee Information">
                <InfoGrid>
                    <InfoCard label="Nominee Name" value={userData.nomineeName} />
                    <InfoCard label="Relation" value={userData.nomineeRelation} />
                    <InfoCard label="Date of Birth" value={formatDate(userData.nomineeDOB)} />
                    <InfoCard label="Bank Name" value={userData.nomineebankName} />
                    <InfoCard label="Account No." value={userData.nomineeacnumber} />
                    <InfoCard label="IFSC Code" value={userData.nomineeifscCode} />
                </InfoGrid>
            </Section>

           
            <Section title="User Status">
                <div className="grid grid-cols-2 gap-4">
                    <StatusCard label="Status" status={userData.status === "1"} />
                    <StatusCard label="User Type" text={getUserType(userData.usertype)} />
                </div>
            </Section>
        </div>
    );
}

const Section = ({ title, children }) => (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">{title}</h3>
        {children}
    </div>
);

const InfoGrid = ({ children }) => <div className="grid grid-cols-2 gap-4">{children}</div>;

const InfoCard = ({ label, value }) => (
    <div>
        <h3 className="font-semibold text-gray-700">{label}</h3>
        <p className="text-gray-600">{value || "N/A"}</p>
    </div>
);

const StatusCard = ({ label, status, text }) => (
    <div>
        <h3 className="font-semibold text-gray-700">{label}</h3>
        <p className={`text-sm font-bold ${status ? "text-green-600" : "text-red-600"}`}>
            {text || (status ? "Active ✅" : "Inactive ❌")}
        </p>
    </div>
);


const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "N/A");

const getUserType = (type) => {
    switch (type) {
        case "0":
            return "Regular User";
        case "1":
            return "Admin";
        default:
            return "Super Admin";
    }
};
