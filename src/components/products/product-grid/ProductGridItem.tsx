"use client";
import Image from "next/image";
import { Product } from "@/interfaces";
import Link from "next/link";
import { useState } from "react";
import { ProductImage } from "@/components";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  const onMouseEnterImage = () => {
    setDisplayImage(product.images[1]);
  }
  const onMouseLeaveImage = () => {
    setDisplayImage(product.images[0]);
  }

  return (
    <div className="rounded-md overflow:hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <ProductImage
          src={displayImage}
          alt={product.title}
          onMouseEnter={onMouseEnterImage}
          onMouseLeave={onMouseLeaveImage}
          className="w-full object-cover rounded"
          width={500}
          height={500}
        />
      </Link>

      <div className="p-4 flex flex-col ">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-600">
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
