import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";



interface Props {
  params: {
    id: Category;
  };
}

const products = initialData.products;

export default async function CategoryPage({ params }: Props) {
  const { id } = params;


  const categoryProducts = products.filter((product) => product.gender === id); 

  const labels:Record<Category, string>   = {
    'men' : 'Mens',
    'women' : 'Womens',
    'kid' : 'Kids',
    'unisex': 'For All'
  }

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <>
    <Title title={labels[id]} subtitle={`All products`} className="mb-2 capitalize" />
    <ProductGrid products={categoryProducts} />
  </>
  );
}
