import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-5xl">404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="border-2 border-gray-300 rounded-md px-4 py-2 mt-4 hover:bg-gray-100 hover:text-black"
      >
        <ArrowLeft className="inline-block mr-2" /> Go Back
      </Link>
    </div>
  );
};

export default NotFound;
