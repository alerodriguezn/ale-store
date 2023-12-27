import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import Image from "next/image";
import { QuantitySelector } from "@/components";

const productsInCart = [
  initialData.products[0],
  // initialData.products[1],
  // initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify Order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Edit items</span>
            <Link href={"/cart"} className="underline mb-5">
              Edit Cart
            </Link>

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Shipping Address</h2>
            <div className="mb-10">
              <p className="text-xl">Alejandro Rodríguez</p>
              <p>Av. San Francisco</p>
              <p>Col. </p>
              <p>Mexico</p>
              <p>CP 12345</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">3 products</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Taxes (10%) </span>
              <span className="text-right">$10</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right mt-5 text-2xl">$110</span>
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
              <Link
                href={"/orders/123"}
                className="flex btn-primary justify-center"
              >
                Confirm Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
