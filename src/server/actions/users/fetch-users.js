"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { UserPasswordSchema } from "@/lib/inputValidation";

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

export async function getUserData({ userId }) {
  if (!ObjectId.isValid(userId)) {
    return {
      error: "Invalid User ID format",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) {
      return {
        error: "User not found",
      };
    }
    return {
      data: user,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function updateUserName({ id, name }) {
  try {
    if (!ObjectId.isValid(id)) {
      return { error: "Invalid User ID format" };
    }

    if (!name) {
      return { error: "Name cannot be empty" };
    }
    if (name.length < 2) {
      return { error: "Name must be at least 2 characters long" };
    }
    if (name.length > 50) {
      return { error: "Name must be less than 50 characters long" };
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (user.role === "DOCTOR") {
      const doctor = await prisma.doctor.findUnique({
        where: {
          userId_hospitalId_email: {
            userId: id,
            hospitalId: user.hospitalId,
            email: user.email,
          },
        },
      });
      if (!doctor) {
        return { error: "Doctor not found" };
      }
      await prisma.doctor.update({
        where: { id: doctor.id },
        data: { name },
      });
    }
    await prisma.user.update({
      where: { id },
      data: { name },
    });
    return { success: "Name updated successfully" };
  } catch (error) {
    console.error("Error updating name:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}

export async function updateUserPassword({
  id,
  currentPassword,
  confirmPassword,
  newPassword,
}) {
  if (!ObjectId.isValid(id)) {
    return {
      error: "Invalid User ID format",
    };
  }

  const { error } = UserPasswordSchema.safeParse({
    currentPassword,
    newPassword,
    confirmPassword,
  });

  if (error) {
    return {
      error: error.message,
    };
  }
  console.log("Old pAssword", currentPassword)
  console.log("New pAssword", newPassword)
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return {
      error: "User not found",
    };
  }
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) {
    return {
      error: "Incorrect password",
    };
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return {
      data: "Password updated successfully",
    };
  } catch (error) {
    console.error("Error updating password:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
