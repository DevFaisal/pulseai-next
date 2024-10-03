"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function deleteUser({ userId }) {
  if (!ObjectId.isValid(userId)) {
    return {
      error: "Invalid User ID format",
    };
  }
  try {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        error: "No user found",
      };
    }
    return {
      data: user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
