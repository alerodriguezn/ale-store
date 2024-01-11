"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import Image from "next/image";
import { currencyFormat } from "@/utils";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Is loading!!</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size} `} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            style={{
              width: "100px",
              height: "100px",
            }}
            width={100}
            height={100}
            className="mr-5 rounded"
          />
          <div>
            <span>
              {product.title} - Size: {product.size} ({product.quantity})
            </span>
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
