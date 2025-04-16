"use client";

import Header from "@/components/homepage/Header";
import Footer from "@/components/homepage/Footer";
import Mainbanner from "@/components/homepage/Mainbanner";
import Rimagecard from "@/components/homepage/Rimagecard";
import Limagecard from "@/components/homepage/Limagecard";
import ProductCard from "@/components/homepage/Productcard";
import ContentBtnCard from "@/components/homepage/ContentBtncard";
import ContentCard from "@/components/homepage/ContentCard";
import FloatingActions from "@/components/homepage/FloatingActions";

export default function Home() {

  return (
    <>
      <FloatingActions />
      <Header />
      <Mainbanner />
      <ContentCard
        title="Our Revolutionary Products Range"
        description="ANAADIPRO WELLNESS PRIVATE LIMITED is, above all, a family-driven company. We are guided by a dynamic and diverse global leadership team dedicated to empowering Independent Business Owners in achieving their dreams. Stay focused on your goals with our expertly curated product combinations designed for impactful and targeted results."
      />
      <Limagecard
        title="Hair Care Range"
        description="Our Hair Care Products are produced using scientific formulations, green ingredients and modern manufacturing processes."
        viewmore="/"
        image="/images/homepage/f063399f-23d2-4015-bc54-6e578501d177.webp"
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
        title="ABOUT ANAADIPRO WELLNESS"
        description="We are a Health Products Selling Company founded by business professionals. At Asclepius Wellness, we empower dynamic entrepreneurs by promoting high-quality wellness products. Our products are crafted with scientific formulations, green ingredients, and modern manufacturing processes. We believe in delivering knowledge and education to help consumers make healthy, informed choices."
        knowMoreLink="/"
        contactUsLink="/"
      />
      <ContentCard
        title="Latest Products"
        description="We are a Health Products Selling company founded by business professionals. At Asclepius Wellness, we create dynamic entrepreneurs through the promotion of high-quality wellness products."
      />
      <ProductCard />
      <Footer />
    </>
  );
}
