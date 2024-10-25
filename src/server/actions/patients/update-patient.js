"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function updatePatient({ formData, patientId }) {
  console.log("formData", formData);

  if (!ObjectId.isValid(patientId)) {
    return {
      error: "Invalid patientId",
    };
  }

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: formData.assignedDoctor },
    });

    if (!doctor) {
      return {
        error: "Doctor not found.",
      };
    }

    const patientExists = await prisma.patient.findUnique({
      where: { id: patientId },
    });
    if (!patientExists) {
      return {
        error: "Patient not found.",
      };
    }

    const updatedPatient = await prisma.patient.update({
      where: { id: patientId },
      data: {
        ...formData,
        age: parseInt(formData.age, 10),
        assignedDoctor: {
          connect: { id: formData.assignedDoctor },
        },
      },
    });
    if (!updatedPatient) {
      return {
        error: "Failed to edit patient",
      };
    }
    return {
      data: {
        ...updatedPatient,
        assignedDoctor: { name: doctor.name },
      },
    };
  } catch (error) {
    console.error("Failed to edit patient", error);
    return {
      error: "Failed to edit patient",
    };
  }
}
