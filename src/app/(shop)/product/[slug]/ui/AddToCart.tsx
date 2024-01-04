"use client";
import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  
  const addProductToCart = useCartStore( state => state.addProductCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
        id: product.id,
        slug: product.slug,
        quantity: quantity,
        title: product.title,
        price: product.price,
        size: size,
        image: product.images[0],
    }

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
    
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500">You need to select a size*</span>
      )}

      <SizeSelector
        onSizeChange={setSize}
        selectedSize={size}
        availableSizes={product.sizes}
      />

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <button className="btn-primary my-5" onClick={addToCart}>
        Add to cart
      </button>
    </>
  );
};
