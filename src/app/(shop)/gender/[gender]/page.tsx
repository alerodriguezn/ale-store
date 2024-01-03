export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  };
}

export default async function GenderPage({ searchParams, params }: Props) {

  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({page, gender: gender as Gender});

  const labels: Record<string, string> = {
    men: "Mens",
    women: "Womens",
    kid: "Kids",
    unisex: "For All",
  };

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title
        title={labels[gender] }
        subtitle={`All products`}
        className="mb-2 capitalize"
      />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages}/>

    </>
  );
}
