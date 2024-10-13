"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function fetchMedications({ patientId }) {
  if (!ObjectId.isValid(patientId)) {
    return { error: "Invalid patient ID" };
  }

  try {
    const patientMedications = await prisma.medication.findMany({
      where: {
        patientId: patientId,
      },
    });
    if (!patientMedications) {
      return { error: "Patient Medications not found" };
    }
    return { data: patientMedications };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}

export async function UpdateMedication({ patientId, medication }) {
  if (!ObjectId.isValid(patientId)) {
    return { error: "Invalid patient ID" };
  }
  console.log(patientId, medication);
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });
    if (!patient) {
      return { error: "Patient not found" };
    }

    const med = await prisma.medication.create({
      data: {
        ...medication,
        patientId: patientId,
      },
    });

    // const updateMedication = await prisma.patient.update({
    //   where: {
    //     id: patientId,
    //   },
    //   data: {
    //     Medication: {
    //       update: {
    //         ...medication,
    //       },
    //     },
    //   },
    //   select: {
    //     medications: true,
    //   },
    // });
    if (!med) {
      return { error: "Failed to update patient" };
    }

    return { data: med };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}

export async function deleteMedication({ medicationId }) {
  if (!ObjectId.isValid(medicationId)) {
    return { error: "Invalid Medication ID" };
  }

  try {
    const patientMedications = await prisma.medication.delete({
      where: {
        id: medicationId,
      },
    });
    if (!patientMedications) {
      return { error: "Patient Medications not found" };
    }
    return { data: patientMedications };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}
