"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (
  userId: string,
  role: string
) => {
  const session = await auth();

  const newRole = role === 'admin' ? 'admin' : 'user'

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Invalid User",
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole
      },
    });

    revalidatePath('/admin/users')
    return {
      ok: true,
      user: user,
    };

  } catch (error) {
    return {
      ok: false,
      message: "We cannot update the user",
    };
  }
};
