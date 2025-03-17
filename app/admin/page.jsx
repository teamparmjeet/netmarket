"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/bonanza/fetch/s");
        setImages(response.data.images || []);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {loading ? (
        <div className="h-96 flex justify-center items-center bg-gray-200 animate-pulse">
          <div className="w-full h-full bg-gray-300 rounded-lg"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          removeArrowOnDeviceType={["tablet", "mobile"]}
          containerClass="carousel-container"
          dotListClass="custom-dot-list"
        >
          {images.length > 0 ? (
            images.map((img, index) => (
              <div key={index} className="relative flex justify-center items-center h-full w-full border">
                <Link href={img.image} target="_blank">
                <Image
                  src={img.image}
                  alt={`Trip Bonanza ${index + 1}`}
                  width={900}
                  height={500}
                  className="rounded-lg  object-cover w-fit h-fit"
                  />
                  </Link>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 font-semibold">No images available.</p>
          )}
        </Carousel>
      )}
    </div>
  );
}
