"use client";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
  const router = useRouter();
  const { subTotal, total, tax, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (itemsInCart === 0) {
      router.replace("/empty");
    }
  }, [itemsInCart, router]);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Is loading!!</p>;
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Products</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 item" : `${itemsInCart} items`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Taxes (10%) </span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total:</span>
      <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
    </div>
  );
};
