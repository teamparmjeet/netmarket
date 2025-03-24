"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import Order from "@/components/Order/Order";
export default function UserProfile() {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/user/find-admin-byemail/${decodedId}`
        );
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
    <div className=" mx-auto p-6 bg-white dark:bg-gray-800 dark:shadow-none dark:border shadow-lg rounded-lg mt-6">
      <div className="flex items-center gap-6 border-b pb-4 mb-4">
        <Image
          src={userData.image || "/images/user/icon-5359553_640.webp"}
          alt="Profile"
          width={200}
          height={200}
          className="w-24 h-24 rounded-full border object-cover shadow-md"
        />
        <div className="order-3 xl:order-2 bg-white dark:bg-gray-800">
          <h4 className="mb-3 text-xl font-semibold text-center xl:text-left text-gray-900 dark:text-white">
            {userData?.name || "Unknown"}
          </h4>
          <div className="flex items-center justify-center xl:justify-start space-x-3">
            <h2 className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium px-3 py-1 rounded-lg text-sm shadow">
              DsId : {userData?.dscode}
            </h2>
            <h3 className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-medium px-3 py-1 rounded-lg text-sm shadow">
              Group : {userData?.group}
            </h3>
            <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md">
              Not Approved
            </span>
          </div>
        </div>
      </div>
      <Order />
      <Section title="Personal Details">
        <InfoGrid>
          <InfoCard
            label="Father/Husband Name"
            value={userData.fatherOrHusbandName}
          />
          <InfoCard label="Date of Birth" value={formatDate(userData.dob)} />
          <InfoCard label="Profession" value={userData.profession} />
          <InfoCard label="Marital Status" value={userData.maritalStatus} />
          <InfoCard label="Mobile Number" value={userData.mobileNo} />
          <InfoCard label="Whatsapp Number" value={userData.whatsappNo} />
          <InfoCard label="DS Code" value={userData.dscode} />
          <InfoCard label="PDS Code" value={userData.pdscode} />
        </InfoGrid>
      </Section>

      <Section title="Address">
        <InfoGrid>
          <p className="text-gray-600 dark:text-gray-200">
            {userData.address?.addressLine1 || "N/A"}
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            {userData.address?.addressLine2 || "N/A"}
          </p>
        </InfoGrid>
        <p className="text-gray-600 dark:text-gray-200">
          {userData.address?.city}, {userData.address?.state} -{" "}
          {userData.address?.pinCode}
        </p>
      </Section>

      <Section title="KYC Verification">
        <p
          className={`font-semibold ${userData.kycVerification?.isVerified
            ? "text-green-600"
            : "text-red-600"
            }`}
        >
          {userData.kycVerification?.isVerified
            ? "Verified ✅"
            : "Not Verified ❌"}
        </p>
        <InfoGrid>
          <InfoCard
            label="Proof Type"
            value={userData.kycVerification?.proofType}
          />
          <InfoCard
            label="Document No"
            value={userData.kycVerification?.documentNo}
          />
        </InfoGrid>
      </Section>

      <Section title="Uploaded Documents">
        <InfoGrid4>
          {[
            {
              label: "PAN Card",
              image: userData.panimage,
              value: userData.panno,
            },
            {
              label: "Aadhar Card",
              image: userData.aadharimage,
              value: userData.aadharno,
            },
            {
              label: "Address Proof",
              image: userData.addressproofimage,
              value: userData.addressproofno,
            },
          ].map((doc, index) => (
            <ImageCard
              key={index}
              label={doc.label}
              image={doc.image}
              value={doc.value}
              showValue={true}
            />
          ))}
        </InfoGrid4>
      </Section>

      <Section title="Bank Details">
        <InfoGrid>
          <InfoCard label="Bank Name" value={userData.bankName} />
          <InfoCard label="Account Number" value={userData.acnumber} />
          <InfoCard label="IFSC Code" value={userData.ifscCode} />
          <InfoGrid>
            <ImageCard
              label="Bank Document"
              image={userData.bankimage}
              value={userData.acnumber}
              showValue={false}
            />
          </InfoGrid>
        </InfoGrid>
      </Section>

      <Section title="Nominee Information">
        <InfoGrid>
          <InfoCard label="Nominee Name" value={userData.nomineeName} />
          <InfoCard label="Relation" value={userData.nomineeRelation} />
          <InfoCard
            label="Date of Birth"
            value={formatDate(userData.nomineeDOB)}
          />
          <InfoCard label="Bank Name" value={userData.nomineebankName} />
          <InfoCard label="Account No." value={userData.nomineeacnumber} />
          <InfoCard label="IFSC Code" value={userData.nomineeifscCode} />
          <InfoCard
            label="Nominee Pan Card No."
            value={userData.nomineeipanno}
          />
          <InfoCard
            label="Nominee Aadhar No."
            value={userData.nomineeiaadharno}
          />
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
  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 dark:shadow-none dark:border rounded-lg shadow-sm">
    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b pb-2 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const InfoGrid = ({ children }) => (
  <div className="grid grid-cols-2 gap-4 ">{children}</div>
);
const InfoGrid4 = ({ children }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">{children}</div>
);

const InfoCard = ({ label, value }) => (
  <div>
    <h3 className="font-semibold text-gray-700 dark:text-gray-100">{label}</h3>
    <p className="text-gray-600 dark:text-gray-400">{value || "N/A"}</p>
  </div>
);

const ImageCard = ({ label, image, value, showValue = false }) => (
  <div className="">
    <h3 className="text-md font-medium text-gray-800 dark:text-gray-300 mb-2">
      {label}
    </h3>
    {image ? (
      <a href={image} target="_blank" rel="noopener noreferrer">
        <Image
          src={image}
          alt={label}
          width={300}
          height={200}
          className="w-full h-42 rounded-md object-cover shadow-md cursor-pointer"
        />
      </a>
    ) : (
      <p className="text-gray-500 dark:text-gray-400">No document uploaded</p>
    )}

    {showValue && value && (
      <div className="mt-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md">
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          <strong>{label} No:</strong> {value}
        </p>
      </div>
    )}
  </div>
);

const StatusCard = ({ label, status, text }) => (
  <div>
    <h3 className="font-semibold text-gray-700 dark:text-gray-200">{label}</h3>
    <p
      className={`text-sm font-bold ${status ? "text-green-600" : "text-red-600"
        }`}
    >
      {text || (status ? "Active ✅" : "Inactive ❌")}
    </p>
  </div>
);

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString() : "N/A";

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
