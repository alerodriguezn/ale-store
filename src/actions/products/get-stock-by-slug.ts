"use server"

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const stock = await prisma.product.findFirst({
      select: {
        inStock: true,
      },
      where: {
        slug,
      },
    });

    if (!stock) {
      return 0;
    }

    return stock.inStock;

  } catch (error) {
    return 0;
  }
};
