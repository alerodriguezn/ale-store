"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!updatedOrder) {
      return {
        ok: false,
        message: "We cannot update the order",
      };
    }

    return {
      ok: true,
      updatedOrder: updatedOrder,
    };
  } catch (error) {
    return {
      ok: false,
      message: "We cannot update the order",
    };
  }
};
