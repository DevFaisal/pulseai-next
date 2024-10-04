"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function DiagnosePatient({
  patientId,
  diagnose,
  medication,
  thresholds,
}) {
  if (!ObjectId.isValid(patientId)) {
    return { error: "Invalid patient ID" };
  }

  console.log("DiagnosePatient");
  console.log(patientId);
  console.log(diagnose);
  console.log(medication);
  console.log(thresholds);

  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });
    if (!patient) {
      return { error: "Patient not found" };
    }
    const updatedPatient = await prisma.patient.update({
      where: {
        id: patientId,
      },
      data: {
        icdCode: diagnose?.icdCode || "",
        doctorNote: diagnose?.doctorNote || "",
        medications: {
          create: medication,
        },
        Threshold: {
          create: thresholds,
        },
      },
    });
    if (!updatedPatient) {
      return { error: "Failed to update patient" };
    }
    return { data: updatedPatient };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}
