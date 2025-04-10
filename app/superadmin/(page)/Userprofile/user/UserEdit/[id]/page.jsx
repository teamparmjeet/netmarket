"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const { id } = useParams();
  const email = decodeURIComponent(id);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    kycVerified: false,
    levelName: "",
    sao: "",
    sgo: ""
  });
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/find-admin-byemail/${email}`);
      setUserData(res.data);
      setFormData((prev) => ({
        ...prev,
        kycVerified: res.data?.kycVerification?.isVerified || false
      }));
    } catch (err) {
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  // Initial Data
  useEffect(() => {
    fetchUser();
  }, [email]);

  useEffect(() => {
    axios
      .get("/api/level/fetch/level")
      .then((res) => setLevels(res.data.data || []))
      .catch(() => setError("Failed to fetch levels."));
  }, []);

  // Handle Level Change
  const handleLevelChange = (value) => {
    const selected = levels.find((level) => level.level_name === value);
    setFormData({
      ...formData,
      levelName: value,
      sao: selected?.sao || "",
      sgo: selected?.sgo || ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const levelExists = userData?.LevelDetails?.some(
      (lvl) => lvl.levelName === formData.levelName
    );
  
    if (levelExists) {
      toast.error("This level has already been assigned to the user.");
      return;
    }
    try {
      setLoading(true);

      const newLevelEntry = {
        levelName: formData.levelName,
        sao: userData?.saosp || "",
        sgo: userData?.sgosp || ""
      };

      const updatedLevelDetails = [...(userData.LevelDetails || []), newLevelEntry];

      const selectedLevel = levels.find(lvl => lvl.level_name === formData.levelName);
      const currentDate = new Date().toLocaleDateString("en-GB");

      const newWalletEntry = {
        salecommission: "",
        salesgrowth: selectedLevel?.bonus_income?.toString() || "0",
        date: currentDate
      };

      if (userData.activesp == "100") {
        newWalletEntry.performance = selectedLevel?.performance_income?.toString() || "";
      }

      const updatedWalletDetails = [...(userData.WalletDetails || []), newWalletEntry];

      const res = await axios.patch("/api/user/update-user/", {
        id: userData._id,
        kycVerification: {
          isVerified: formData.kycVerified
        },
        LevelDetails: updatedLevelDetails,
        WalletDetails: updatedWalletDetails,
        level: formData.levelName
      });

      toast.success("User updated successfully!");
      fetchUser();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const filteredLevels = levels.filter(
    (lvl) =>
      parseInt(lvl.sao) <= parseInt(userData?.saosp || 0) &&
      parseInt(lvl.sgo) <= parseInt(userData?.sgosp || 0)
  );

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">Update User Level</h2>

      {/* Current Info Card */}
      <div className="bg-gray-100 p-4 rounded shadow">
        <p className="font-semibold">Current Level: <span className="text-blue-600">{userData?.level || "N/A"}</span></p>
        <p>SAO Score: <span className="text-green-600 font-semibold">{userData?.saosp}</span></p>
        <p>SGO Score: <span className="text-purple-600 font-semibold">{userData?.sgosp}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-4 rounded shadow">
        {/* KYC Verification */}
        <div>
          <label className="block mb-1 font-medium">KYC Verified</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.kycVerified}
            onChange={(e) =>
              setFormData({ ...formData, kycVerified: e.target.value === "true" })
            }
          >
            <option value="false">Not Verified</option>
            <option value="true">Verified</option>
          </select>
        </div>

        {/* Level Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Eligible Levels</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.levelName}
            onChange={(e) => handleLevelChange(e.target.value)}
          >
            <option value="">Select Level</option>
            {filteredLevels.map((level) => (
              <option key={level._id} value={level.level_name}>
                {level.level_name} (SAO: {level.sao}, SGO: {level.sgo})
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>

      <Toaster />
    </div>
  );
}
