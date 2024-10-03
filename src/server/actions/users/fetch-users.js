"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function fetchUsers({ hospitalId }) {
  if (!ObjectId.isValid(hospitalId)) {
    return {
      error: "Invalid Hospital ID format",
    };
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        hospitalId: hospitalId,
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    if (!users || users.length === 0) {
      return {
        error: "No users found",
      };
    }
    return {
      data: users,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
