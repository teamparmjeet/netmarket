"use client";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react"; 

export default function Mainbanner() {
  const imagePath = "/images/homepage/Shiitake-Shake.jpg";
  const images = Array(4).fill(imagePath);
  const [hover, setHover] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div
      className="w-full mx-auto mt-24 p-0 relative group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        afterChange={(currentSlide) => setActiveIndex(currentSlide)} // ✅ Properly updates active dot
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="carousel-container"
        customLeftArrow={
          <button
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 text-black text-3xl transition-opacity duration-300 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          >
            <ChevronLeft size={40} />
          </button>
        }
        customRightArrow={
          <button
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 text-black text-3xl transition-opacity duration-300 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          >
            <ChevronRight size={40} />
          </button>
        }
      >
        {images.map((img, index) => (
          <div key={index} className="h-full w-full p-0 relative">
            <Link href={img} target="_blank">
              <Image
                src={img}
                alt={`Image ${index + 1}`}
                width={1500}
                height={500}
                className="rounded-lg object-cover w-full z-0"
              />
            </Link>
          </div>
        ))}
      </Carousel>

      {/* Fixed Active Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex % images.length === idx ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
