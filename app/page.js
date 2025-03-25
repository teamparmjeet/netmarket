"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronUp,
  ThumbsUp,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Header from "@/components/homepage/Header";
import Footer from "@/components/homepage/Footer";
import Mainbanner from "@/components/homepage/Mainbanner";
import Rimagecard from "@/components/homepage/Rimagecard";
import Limagecard from "@/components/homepage/Limagecard";
import ProductCard from "@/components/homepage/Productcard";
import ContentBtnCard from "@/components/homepage/ContentBtncard";
import ContentCard from "@/components/homepage/ContentCard";
import SecCard from "@/components/homepage/SecCard";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [showSocialIcons, setShowSocialIcons] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const handleScroll = () => {
      setShowScroll(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <Header />
      <Mainbanner />
      <ContentCard
        title="Our Revolutionary Products Range"
        description="Asclepius Wellness is above all a family company. We lead a diverse global management team that supports Independent Business Owners and their goals. Hone in on your goals with the best product combinations for targeted results."
      />
      <Limagecard
        title="Hair Care Range"
        description="Our Hair Care Products are produced using scientific formulations, green ingredients and modern manufacturing processes."
        viewmore="/"
        image="/images/homepage/wel-cat1.jpg"
        sideimage="/images/homepage/wel-side1.jpg"
      />
      <Rimagecard
        title="Beauty Care Range"
        description="Our Beauty Care Products are produced using scientific formulations, green ingredients and modern manufacturing processes."
        viewmore="/"
        image="/images/homepage/wel-cat1.jpg"
        sideimage="/images/homepage/wel-side1.jpg"
      />
      <Limagecard
        title="Wellness Care Range"
        description="Our Wellness Care Products are produced using scientific formulations, green ingredients and modern manufacturing processes."
        viewmore="/"
        image="/images/homepage/wel-cat1.jpg"
        sideimage="/images/homepage/wel-side1.jpg"
      />
      <Rimagecard
        title="Food Product Range"
        description="Our Food Products are produced using scientific formulations, green ingredients and modern manufacturing processes."
        viewmore="/"
        image="/images/homepage/wel-cat1.jpg"
        sideimage="/images/homepage/wel-side1.jpg"
      />
      <ContentBtnCard
        title="About Asclepius Wellness"
        description="We are a Health Products Selling Company founded by business professionals. At Asclepius Wellness, we empower dynamic entrepreneurs by promoting high-quality wellness products. Our products are crafted with scientific formulations, green ingredients, and modern manufacturing processes. We believe in delivering knowledge and education to help consumers make healthy, informed choices."
        knowMoreLink="/"
        contactUsLink="/"
      />
      <ContentCard
        title="Product Reviews"
        description="We are a Health Products Selling company founded by business professionals. At Asclepius Wellness we create dynamic entrepreneurs through the promotion of high quality wellness products."
      />
      <ContentCard
        title="Latest Products"
        description="We are a Health Products Selling company founded by business professionals. At Asclepius Wellness, we create dynamic entrepreneurs through the promotion of high-quality wellness products."
      />
      <ProductCard />

      <Footer />

      <div className="fixed left-4 bottom-20 w-48">
        <Image
          src="/images/homepage/customer-care.png"
          alt="Customer Care"
          width={200}
          height={100}
        />
      </div>

      <div className="fixed right-6 bottom-24 flex flex-col items-center justify-center">
        {/* Main Button */}
        <button
          onClick={() => setShowSocialIcons(!showSocialIcons)}
          className="p-4 bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <ThumbsUp size={28} />
        </button>

        <div
          className={`absolute right-16 flex gap-3 items-center transition-all duration-500 ${
            showSocialIcons ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <a
            href="#"
            className="bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 transition"
          >
            <Facebook size={24} />
          </a>
          <a
            href="#"
            className="bg-blue-500 p-3 rounded-full text-white hover:bg-blue-600 transition"
          >
            <Twitter size={24} />
          </a>
          <a
            href="#"
            className="bg-pink-500 p-3 rounded-full text-white hover:bg-pink-600 transition"
          >
            <Instagram size={24} />
          </a>
          <a
            href="#"
            className="bg-blue-800 p-3 rounded-full text-white hover:bg-blue-900 transition"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>

      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-4 bottom-4 p-3 border-2 border-green-800 text-green-900 rounded-full shadow-lg transition"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
}
