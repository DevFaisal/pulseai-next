"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteDoctor({ userId }) {
  try {
    if (!ObjectId.isValid(userId)) {
      return {
        error: "Invalid User ID format",
      };
    }

    const doctor = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!doctor) {
      return {
        error: "Doctor not found",
      };
    }

    const deletedDoctorData = Promise.all([
      prisma.doctor.delete({
        where: {
          userId: userId,
          email: doctor.email,
        },
      }),
      prisma.user.delete({
        where: {
          id: userId,
        },
      }),
    ]);
    if (!deletedDoctorData) {
      return {
        error: "Doctor not found",
      };
    }

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
