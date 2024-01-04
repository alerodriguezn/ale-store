'use client'

import { titleFont } from "@/config/fonts";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore, useUIStore } from "@/store";


export const TopMenu = () => {

  const [loaded, setLoaded] = useState(false);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const openSideMenu = useUIStore((state) => state.openSideMenu);

  useEffect(() => {
    setLoaded(true);
  
  }, [])
  

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href={"/"}>
          <span className={`${titleFont.className} antialiased font-bold `}>
            Ale
          </span>
          <span> | Store</span>
        </Link>
      </div>
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/men"}
        >
          Men
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/women"}
        >
          Women
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/kid"}
        >
          Kids
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            {
              ( loaded && totalItemsInCart > 0) && (
                <span className="px-1 bg-blue-700 text-white -right-2 absolute text-xs rounded-full  font-bold -top-2">
                  {totalItemsInCart}
                </span>
              )
            }
          
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button 
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          onClick={() => openSideMenu()}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
