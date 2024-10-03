"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function deletePatient({ patientId }) {
  try {
    if (!ObjectId.isValid(patientId)) {
      return {
        error: "Invalid patientId",
      };
    }
    const deletedPatient = await prisma.patient.delete({
      where: { id: patientId },
    });

    if (!deletedPatient) {
      return {
        error: "Patient not found",
      };
    }

    return {
      data: deletedPatient,
    };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return {
      error: "Error fetching patients",
    };
  }
}
