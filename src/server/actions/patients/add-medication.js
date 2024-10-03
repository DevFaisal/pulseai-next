"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function addMedication({ formData, patientId }) {
  const { name, dosage, frequency } = formData;

  if (!ObjectId.isValid(patientId)) {
    return {
      error: "Invalid patient ID",
    };
  }
  if (!patientId) {
    return {
      error: "Invalid patient ID",
    };
  }
  try {
    const response = await prisma.patient.findFirst({
      where: {
        id: patientId,
      },
    });

    if (!response) {
      return {
        error: "Patient not found",
      };
    }
    const updatedMedication = await prisma.medication.create({
      data: {
        name: name,
        dosage: dosage,
        frequency: frequency,
        startDate: new Date(),
        endDate: new Date(),
        patient: {
          connect: {
            id: patientId,
          },
        },
      },
    });

    if (!updatedMedication) {
      return {
        error: "Error adding medication",
      };
    }
    return {
      data: updatedMedication,
    };
  } catch (error) {
    console.error("Error adding medication:", error);
    return {
      error: "Error adding medication",
    };
  }
}
