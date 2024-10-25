"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function UpdateThreshold({ patientId, threshold }) {
  if (!ObjectId.isValid(patientId)) {
    return { error: "Invalid patient ID" };
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });
    if (!patient) {
      return { error: "Patient not found" };
    }

    const existingThreshold = await prisma.threshold.findFirst({
      where: {
        patientId: patientId,
        type: threshold.type,
      },
    });
    if (existingThreshold) {
      const updateThreshold = await prisma.threshold.update({
        where: {
          id: existingThreshold.id,
        },
        data: {
          min: String(threshold.min),
          max: String(threshold.max),
        },
      });
      if (!updateThreshold) {
        return { error: "Failed to update threshold" };
      }
      return { data: updateThreshold };
    } else {
      const createThreshold = await prisma.threshold.create({
        data: {
          patientId: patientId,
          name: threshold.name,
          type: threshold.type,
          min: String(threshold.min),
          max: String(threshold.max),
        },
      });
      if (!createThreshold) {
        return { error: "Failed to create threshold" };
      }
      return { data: createThreshold };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}

export async function deleteThreshold({ thresholdId }) {
  if (!ObjectId.isValid(thresholdId)) {
    return { error: "Invalid Threshold ID" };
  }

  try {
    const patientThresholdId = await prisma.threshold.delete({
      where: {
        id: thresholdId,
      },
    });
    if (!patientThresholdId) {
      return { error: "Patient Medications not found" };
    }
    return { data: patientThresholdId };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}

export async function getThresholds({ patientId }) {
  if (!ObjectId.isValid(patientId)) {
    return { error: "Invalid patient ID" };
  }

  try {
    const patientThresholds = await prisma.threshold.findMany({
      where: {
        patientId: patientId,
      },
    });
    if (!patientThresholds) {
      return { error: "Patient Thresholds not found" };
    }
    return { data: patientThresholds };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}
