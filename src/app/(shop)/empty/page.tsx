import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={80} className="mx-5" />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Your Cart is Empty</h1>
        <Link href={"/"} className="text-blue-500 text-4xl mt-2">
          Go Back
        </Link>
      </div>
    </div>
  );
}
