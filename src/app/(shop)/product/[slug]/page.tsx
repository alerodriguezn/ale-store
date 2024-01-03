export const revalidate = 604800;

import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { ProductMobileSlideshow, SizeSelector, StockLabel } from "@/components";
import { QuantitySelector } from "@/components";
import { ProductSlideshow } from "@/components";
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "Product not found",
    openGraph: {
      images: [`/products/${product?.productImage[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* {Mobile Slideshow } */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* {Desktop Slideshow} */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1
          className={`${titleFont.className} antialiased font-bold text-xl  `}
        >
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        <QuantitySelector quantity={2} />

        <button className="btn-primary my-5">Add to cart</button>

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
