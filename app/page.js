import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex space-x-4">
        <Link href="/signin">
          <button className="px-5 py-2 border border-gray-400 text-gray-800 rounded-md hover:bg-gray-200 transition">
            Login
          </button>
        </Link>

      </div>

    </div>
  );
}
