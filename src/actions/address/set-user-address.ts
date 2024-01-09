"use server";
import prisma from "@/lib/prisma";
import type { Address } from "@/interfaces";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    return {
      ok: false,
      message: "We cannot save the address",
    };
    console.log(error);
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const addressToSave = {
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      postalCode: address.postalCode,
      phone: address.phone,
      userId,
    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where:{
        userId: userId
      },
      data: addressToSave
    })

    return {
      ok: true,
      address: updatedAddress,
    };

  } catch (error) {
    console.log(error);
    throw new Error("We cannot save the address");
  }
};
