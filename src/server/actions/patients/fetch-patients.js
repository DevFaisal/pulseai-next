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
      // select: {
      //   id: true,
      //   name: true,
      //   age: true,
      //   hospitalId: true,
      //   gender: true,
      //   assignedDoctor: {
      //     select: {
      //       name: true,
      //     },
      //   },
      //   assignedDoctorId: true,
      // },
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

    console.log("Patients", patients);

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
