import Link from "next/link";
import Header from "./pages/Header/page";


export default function Home() {
  return (
    <>
      <div>
        <Header />

        <div className="flex justify-center items-center h-[2000px] bg-gray-100"></div>
      </div>
    </>
  );
}
