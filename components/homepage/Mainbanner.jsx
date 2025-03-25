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

  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 p-2 rounded-full transition-all ${
        hover ? "opacity-100" : "opacity-0"
      }`}
    >
      <ChevronLeft size={32} />
    </button>
  );

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 p-2 rounded-full transition-all ${
        hover ? "opacity-100" : "opacity-0"
      }`}
    >
      <ChevronRight size={32} />
    </button>
  );

  return (
    <div
      className="w-full mx-auto p-0 relative group "
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        keyBoardControl
        afterChange={(currentSlide) => setActiveIndex(currentSlide)}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="carousel-container"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {images.map((img, index) => (
          <div key={index} className="h-full w-full p-0 relative">
            <Link href={img} target="_blank">
              <Image
                src={img}
                alt={`Image ${index + 1}`}
                width={800}
                height={313}
                className="rounded-lg object-cover w-full min-h-[300px] md:min-h-[450px] lg:min-h-[550px]"
              />
            </Link>
          </div>
        ))}
      </Carousel>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              activeIndex % images.length === idx ? "bg-gray-900" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
