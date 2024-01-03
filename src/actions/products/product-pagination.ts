"use server";
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  gender?: Gender;
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        productImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender: gender
      }
      
    });

    const totalCount = await prisma.product.count({
      where: {
        gender: gender
      }
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.productImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("We can't get the products ");
  }
};


