"use server";

import { decryptId } from "@/lib/encryption";
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
        doctor: {
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

// Fetch a patient by their ID and to be associated with a doctor
export async function fetchPatientById({ patientId, userId }) {
  patientId = decryptId(String(patientId));
  // Validate input
  if (!ObjectId.isValid(patientId) || !ObjectId.isValid(userId)) {
    return {
      error: `Invalid patientId or userId`,
    };
  }

  try {
    const result = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Hospital: {
          include: {
            doctors: {
              where: { userId: userId },
              include: {
                patients: {
                  where: { id: patientId },
                  include: {
                    doctor: true,
                    hospital: true,
                    medicalHistory: true,
                    currentHealthStatus: true,
                    medications: true,
                    thresholds: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    // Check if user (doctor) exists
    if (!result || !result.Hospital || result.Hospital.doctors.length === 0) {
      return { error: "Doctor not found or not associated with a hospital" };
    }

    const doctor = result.Hospital.doctors[0];
    const patient = doctor.patients[0];

    if (!patient) {
      return { error: "Patient not found or not associated with this doctor" };
    }

    return { data: patient };
  } catch (error) {
    console.error("Error fetching patient:", error);
    return { error: "An unexpected error occurred while fetching the patient" };
  } finally {
    await prisma.$disconnect();
  }
}
