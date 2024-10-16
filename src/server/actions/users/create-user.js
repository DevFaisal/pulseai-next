"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function createUser({ formData, hospitalId }) {
  const { name, email, password, role } = formData;

  if (!name || !email || !role || !password) {
    return {
      error: "All fields are required",
    };
  }

  try {
    const hospitalCode = await prisma.hospital.findFirst({
      where: { id: hospitalId },
      select: { hospitalCode: true },
    });

    if (!hospitalCode) {
      return {
        error: "Hospital not found",
      };
    }

    // Check if the user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email,
        Hospital: {
          hospitalCode: hospitalCode.hospitalCode,
        },
      },
    });
    if (userExists) {
      return {
        error: "User already exists",
      };
    }

    // Hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        Hospital: {
          connect: { id: hospitalId },
        },
      },
    });

    if (!user) {
      return {
        error: "Failed to create user",
      };
    }
    revalidatePath("/");
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
