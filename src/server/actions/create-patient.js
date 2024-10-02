"use server";

import prisma from "@/lib/prisma";

export async function createPatient({ formData, hospitalId }) {
  try {
    const { name, age, gender, weight, height, bloodType, assignedDoctor } =
      formData;

    const doctor = await prisma.doctor.findUnique({
      where: {
        id: assignedDoctor,
      },
    });

    if (!doctor) {
      return {
        error: "Doctor not found",
      };
    }
    const parsedWeight = weight ? parseInt(weight, 10) : null;
    const parsedHeight = height ? parseInt(height, 10) : null;

    const newPatient = await prisma.patient.create({
      data: {
        name,
        age: parseInt(age, 10),
        gender,
        weight: parsedWeight,
        height: parsedHeight,
        bloodType: bloodType || null,
        BMI:
          parsedWeight && parsedHeight
            ? calculateBMI(parsedWeight, parsedHeight)
            : null,
        hospital: {
          connect: {
            id: hospitalId,
          },
        },
        assignedDoctor: {
          connect: {
            id: assignedDoctor,
          },
        },
        vitalSigns: {
          create: {
            heartRate: 0,
            bloodPressure: "0/0",
            temperature: 0,
            respiratoryRate: 0,
            oxygenSaturation: 0,
          },
        },
      },
    });

    return {
      data: { ...newPatient, assignedDoctor: { name: doctor.name } },
    };
  } catch (error) {
    console.error("Error creating patient:", error);
    return {
      error: "Error creating patient",
    };
  }
}

function calculateBMI(weight, height) {
  return parseFloat((weight / Math.pow(height / 100, 2)).toFixed(2));
}
