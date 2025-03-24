import Link from "next/link";
import Header from "./pages/Header/page";
import Footer from "./pages/Footer/page";
import Mainbanner from "./pages/Mainbanner/page";
import Image from "next/image";
import { imageOptimizer } from "next/dist/server/image-optimizer";
export default function Home() {
  return (
    <>
      <Header />
      <Mainbanner />
      <ContentCard
        title="Our Revolutionary Products Range"
        description="Asclepius Wellness is above all a family company. We lead a diverse global management team that supports Independent Business Owners and their goals. Hone in on your goals with the best product combinations for targeted results."
      />
      <Limagecard
        title="Latest Products"
        description="We are a Health Products Selling company founded by business professionals. At Asclepius Wellness, we create dynamic entrepreneurs through the promotion of high-quality wellness products."
        viewmore="/"
        image="/images/homepage/wel-cat1.jpg"
        sideimage="/images/homepage/wel-side1.jpg"
      />
      <Rimagecard
        title="Latest Products"
        description="We are a Health Products Selling company founded by business professionals. At Asclepius Wellness, we create dynamic entrepreneurs through the promotion of high-quality wellness products."
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
        title="Latest Products"
        description="We are a Health Products Selling company founded by business professionals. At Asclepius Wellness, we create dynamic entrepreneurs through the promotion of high-quality wellness products."
      />
      <Footer />
    </>
  );
}

const ContentCard = ({ title, description }) => (
  <div className="flex justify-center py-10">
    <div className="p-8 max-w-4xl text-center">
      <h2 className="text-4xl font-extrabold text-gray-900">{title}</h2>
      <p className="mt-4 text-xl text-gray-700  ">{description}</p>
      <div className="mt-6 w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
    </div>
  </div>
);

const ContentBtnCard = ({
  title,
  description,
  knowMoreLink = "#",
  contactUsLink = "#",
}) => (
  <div className="flex justify-center py-10">
    <div className="p-8 max-w-4xl text-center">
      <h2 className="text-4xl font-extrabold text-gray-900">{title}</h2>
      <p className="mt-4 text-xl text-gray-700 ">{description}</p>
      <div className="mt-6 w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
      <div className="mt-6 flex justify-center space-x-4">
        <Link href={knowMoreLink}>
          <button className="px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
            Know More
          </button>
        </Link>
        <Link href={contactUsLink}>
          <button className="px-6 py-2 text-lg font-semibold text-blue-600 border border-blue-600 rounded-lg shadow-md hover:bg-blue-100 transition">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const Limagecard = ({ title, description, viewmore, image, sideimage }) => (
  <div className="relative overflow-hidden shadow-lg bg-white rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Main Image */}
      <div className="w-full">
        <Image
          src={image}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          alt={title || "Main Image"}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center items-center p-6 text-center md:text-left">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <Link href={viewmore}>
          <button className="mt-4 px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
            Know More
          </button>
        </Link>
      </div>
    </div>

    {/* Side Image (Only on larger screens) */}
    {sideimage && (
      <div className="absolute top-4 right-4 w-20 h-20 md:w-40 md:h-40 lg:w-56 lg:h-72">
        <Image
          src={sideimage}
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg shadow-md"
          alt="Side Image"
        />
      </div>
    )}
  </div>
);

const Rimagecard = ({ title, description, viewmore, image, sideimage }) => (
  <div className="relative overflow-hidden shadow-lg bg-white rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="order-2 md:order-1 flex flex-col justify-center items-center p-6 text-center md:text-left">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <Link href={viewmore}>
          <button className="mt-4 px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">
            Know More
          </button>
        </Link>
      </div>
      <div className="order-1 md:order-2 w-full">
        <Image
          src={image}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-b-lg md:rounded-r-lg md:rounded-b-none"
          alt={title || "Main Image"}
        />
      </div>
    </div>

    {sideimage && (
      <div className="absolute top-4 left-4 w-20 h-20 md:w-40 md:h-40 lg:w-56 lg:h-72">
        <Image
          src={sideimage}
          width={200}
          height={200}
          className="w-full h-full object-cover rounded-lg shadow-md"
          alt="Side Image"
        />
      </div>
    )}
  </div>
);
