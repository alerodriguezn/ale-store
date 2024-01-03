"use server";
import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        productImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug
      }
    });

    if(!product){
        return null;
    }


    return {
        ...product,
        images: product.productImage.map((image) => image.url),
    }

  } catch (error) {
    console.log(error);
    throw new Error("We can't get the product");
  }
};
