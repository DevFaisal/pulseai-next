"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function fetchDoctors({ hospitalId }) {
  if (!ObjectId.isValid(hospitalId)) {
    return NextResponse.json(
      { error: "Invalid Hospital ID format" },
      { status: 400 }
    );
  }

  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        hospitalId: hospitalId,
      },
    });

    if (!doctors.length) {
      return {
        error: "No Doctor found",
      };
    }
    return {
      data: doctors,
    };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return {
      error: "Error fetching patients",
    };
  }
}
