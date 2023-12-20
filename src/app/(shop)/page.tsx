import { ProductGrid, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";

const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title title={"Shop"} subtitle="All Products" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
