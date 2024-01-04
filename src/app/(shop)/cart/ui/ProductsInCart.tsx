'use client';
import {  use, useEffect, useState } from "react";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";



export const ProductsInCart = () => {
  
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProductFromCart = useCartStore((state) => state.removeProduct);

  const [loaded, setLoaded] = useState(false)
  const [quantity, setQuantity] = useState<number>(1);
  const productsInCart = useCartStore((state) => state.cart );

  useEffect(() => {
    setLoaded(true)
  },[])



  if(!loaded){
    return <p>Is loading!!</p>
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
            <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
               {product.title} - Size: {product.size} 
            </Link>
            <p>${product.price}</p>
            <QuantitySelector quantity={product.quantity} onQuantityChange={ quantity => updateProductQuantity(product, quantity) } />
            <button 
              className="underline mt-3"
              onClick={() => removeProductFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
