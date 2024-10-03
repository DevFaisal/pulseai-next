"use server";

import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function fetchDoctors({ hospitalId }) {
  if (!ObjectId.isValid(hospitalId)) {
    return {
      error: "Invalid hospital ID",
    };
  }

  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        hospitalId: hospitalId,
      },
    });

    if (!doctors.length) {
      return {
        error: "No Doctor found",
      };
    }
    return {
      data: doctors,
    };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return {
      error: "Error fetching patients",
    };
  }
}

export async function fetchDoctorsPatients({ userId }) {
  if (!ObjectId.isValid(userId)) {
    return {
      error: "Invalid doctor ID",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        error: "User not found",
      };
    }
    const doctor = await prisma.doctor.findUnique({
      where: {
        userId: userId,
        email: user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        specialty: true,
        patients: {
          select: {
            id: true,
            name: true,
            age: true,
            gender: true,
            vitalSigns: {
              select: {
                id: true,
                heartRate: true,
                bloodPressure: true,
                temperature: true,
              },
            },
            medications: {
              select: {
                id: true,
                name: true,
                dosage: true,
                frequency: true,
                startDate: true,
                endDate: true,
              },
            },
          },
        },
      },
    });

    if (!doctor) {
      return {
        error: "Doctor not found",
      };
    }
    return {
      data: doctor,
    };
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return {
      error: "Error fetching doctor",
    };
  }
}
