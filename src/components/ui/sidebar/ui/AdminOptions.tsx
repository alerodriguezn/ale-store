import { useUIStore } from "@/store";
import Link from "next/link";
import React from "react";
import {
  IoClipboardOutline,
  IoPeopleOutline,
  IoShirtOutline,
} from "react-icons/io5";

export const AdminOptions = () => {
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  return (
    <>
      <div className="w-full h-px bg-gray-200 my-10" />
      <Link
        href={`/admin/products`}
        onClick={() => closeMenu()}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoShirtOutline size={30} />
        <span className="ml-3 text-xl">Products</span>
      </Link>

      <Link
        onClick={() => closeMenu()}
        href={`/admin/orders`}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoClipboardOutline size={30} />
        <span className="ml-3 text-xl">Orders</span>
      </Link>

      <Link
        onClick={() => closeMenu()}
        href={`/admin/users`}
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoPeopleOutline size={30} />
        <span className="ml-3 text-xl">Users</span>
      </Link>
    </>
  );
};
