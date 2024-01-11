"use client";

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { placeOrder } from "@/actions";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {

  const router = useRouter()


  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);


  const address = useAddressStore((state) => state.address);


  const { subTotal, total, tax, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);


  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));


    const resp = await placeOrder(productsToOrder, address);
    if(!resp.ok){
      setIsPlacingOrder(false)
      setErrorMessage(resp.message)
      return
      
    }

    clearCart();
    router.replace('/orders/' + resp.order?.id )
   
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Shipping Address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}{" "}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Order Summary</h2>
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
        <span className="text-right mt-5 text-2xl">
          {currencyFormat(total)}
        </span>
      </div>

      {/* Disclaimer */}
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            By placing your order, you agree to our
            <a href="#" className="underline">
              {" "}
              terms and conditions{" "}
            </a>
            and our{" "}
            <a href="#" className="underline">
              privacy notice
            </a>
            .
          </span>
        </p>

        <p className="text-red-500">{ errorMessage }</p>
        <button
          onClick={onPlaceOrder}
          //   href={"/orders/123"}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};
