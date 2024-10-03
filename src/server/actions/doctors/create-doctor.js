"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";
import { createUser } from "../users/create-user";
import { revalidatePath } from "next/cache";

export async function createDoctor({ formData, hospitalId }) {
  console.log("F-Date", formData);
  const { name, specialty, email, contact } = formData;

  console.log(formData);

  try {
    if (!ObjectId.isValid(hospitalId)) {
      return {
        error: "Invalid Hospital ID format",
      };
    }

    const user = await createUser({
      formData: {
        name: "Dr. " + name,
        email: email,
        password: "password",
        role: "DOCTOR",
      },
      hospitalId: hospitalId,
    });

    if (user.error) {
      return {
        error: user.error,
      };
    }
    const doctor = await prisma.doctor.create({
      data: {
        name: "Dr. " + name,
        userId: user.data.id,
        specialty: specialty,
        Hospital: {
          connect: {
            id: hospitalId,
          },
        },
        email: email,
        phone: contact,
      },
    });

    revalidatePath("/admin/doctors");

    return {
      data: doctor,
    };
  } catch (error) {
    console.error("Error creating doctor:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
