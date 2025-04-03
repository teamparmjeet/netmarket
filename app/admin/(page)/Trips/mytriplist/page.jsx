"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Page() {
  const { data: session } = useSession();
  const [dscode, setDscode] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await axios.get(`/api/user/find-admin-byemail/${session.user.email}`);
        setDscode(response.data.dscode);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [session?.user?.email]);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!dscode) return;
      try {
        const response = await axios.get(`/api/bonanza/findbyds/${dscode}`);
        setTrips(response.data.data);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [dscode]);

  return (
    <div className="lg:p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-6">
        Trip Achiever List
      </h2>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
      ) : trips.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No trips found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-gray-100 dark:bg-gray-700 shadow-md rounded-lg p-5 border-l-4 border-blue-600 hover:border-blue-700 transition duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{trip.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{trip.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Achieve Date: {trip.achiversDetails[0]?.date || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}