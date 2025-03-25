"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Simulating fetching visitor count from API
    setVisitorCount(12345); // Replace this with an actual API call if needed
  }, []);

  return (
    <footer className="bg-gray-200 text-gray-400 text-center py-4 mt-10">
      <p className="text-sm">
        Copyright © {new Date().getFullYear()} Asclepius Wellness Private Limited | All Rights Reserved.
      </p>
      <p className="text-sm mt-1">Visitor No: {visitorCount}</p>
    </footer>
  );
}
