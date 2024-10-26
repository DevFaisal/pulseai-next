"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function DiagnosePatient({ patientId, icdCode, diagnosisNote }) {
  if (!ObjectId.isValid(patientId)) {
    return { error: "Invalid patient ID" };
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return { error: "Patient not found" };
    }

    const diagnosis = await prisma.patient.update({
      where: { id: patient.id },
      data: {
        icdCode,
        diagnosisNote,
      },
    });
    return { data: diagnosis };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}
