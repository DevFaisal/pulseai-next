"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";

export async function fetchPatients({ hospitalId }) {
  if (!ObjectId.isValid(hospitalId)) {
    return {
      error: "Invalid hospitalId",
    };
  }

  try {
    const patients = await prisma.patient.findMany({
      where: {
        hospitalId: hospitalId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        gender: true,
        dateOfBirth: true,
        medicalConditions: true,
        Doctor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!patients.length) {
      return {
        message: "No patients found",
      };
    }

    return {
      data: patients,
    };
  } catch (error) {
    console.error("Error fetching patients:", error);
    return {
      error: "Error fetching patients",
    };
  }
}

//fetch Patients by id
export async function fetchPatientById({ patientId }) {
  console.log("patientId", patientId);
  if (!ObjectId.isValid(patientId)) {
    return {
      error: "Invalid patientId",
    };
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      return {
        message: "No patient found",
      };
    }

    return {
      data: patient,
    };
  } catch (error) {
    console.error("Error fetching patient:", error);
    return {
      error: "Error fetching patient",
    };
  }
}
