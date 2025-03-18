"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function TripBonanzaUpload() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true); 
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("/api/upload", formData);
      return response.data.file.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    } finally {
      setUploading(false); 
    }
  };

  const handleSave = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const imageUrl = await handleImageUpload(file);
      if (imageUrl) {
        await axios.post("/api/bonanza/create", {
          image: imageUrl,
        });
        alert("Image uploaded and details updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update image details:", error);
      alert("Image upload or update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Upload Trip Bonanza Image</h1>
      <div className="bg-white dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-600 rounded-lg shadow-md w-96">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 w-full border p-2 rounded"
        />
        {image && (
          <div className="mt-4">
            <img src={image} alt="Trip Bonanza" className="w-full rounded-lg shadow-md" />
          </div>
        )}
        <button
          onClick={handleSave}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600"
          disabled={!file || uploading || loading}
        >
          {loading || uploading ? 'Uploading...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}