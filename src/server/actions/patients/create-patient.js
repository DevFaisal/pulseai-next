"use server";

import prisma from "@/lib/prisma";
import { sendEmail } from "../sent-email";
import Onboarding from "@/emails/Onboarding";
import crypto from "crypto";

export async function createPatient({ formData, hospitalId }) {
  try {
    // Destructure formData for easy access
    const {
      generalDetails: {
        email,
        firstName,
        lastName,
        dob,
        weight,
        gender,
        height,
      },
      healthBackground: {
        medicalConditions,
        previousSurgeries,
        ongoingTreatments,
        medications,
        allergies,
        noKnownHistory,
      },
      currentHealthStatus: {
        symptoms,
        symptomIntensity,
        symptomDuration,
        doctorAssigned,
        smoking,
        alcohol,
        diet,
        exerciseFrequency,
        sleepHours,
      },
      familyHealthHistory: { familyConditions, noKnownFamilyHistory },
    } = formData;

    const existingEmail = await prisma.patient.findFirst({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return {
        success: false,
        error: "Email already exists",
      };
    }

    const token = generateRandomToken();

    // Create new patient in the database
    const newPatient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        email,
        token,
        dateOfBirth: dob ? new Date(dob) : undefined,
        gender: gender.toUpperCase(),
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseFloat(height) : null,
        bmi: calculateBMI(weight, height),
        hospital: { connect: { id: hospitalId } },
        doctor: doctorAssigned
          ? { connect: { id: doctorAssigned } }
          : undefined,
        medicalHistory: {
          create: {
            medicalConditions: medicalConditions || null,
            previousSurgeries: previousSurgeries || null,
            ongoingTreatments: ongoingTreatments || null,
            medications: medications || null,
            allergies: allergies || null,
            familyConditions: familyConditions || null,
            noKnownHistory: noKnownHistory || false,
            noKnownFamilyHistory: noKnownFamilyHistory || false,
          },
        },
        currentHealthStatus: {
          create: {
            symptoms: symptoms || [],
            symptomIntensity: symptomIntensity
              ? parseInt(symptomIntensity, 10)
              : null,
            symptomDuration: symptomDuration || null,
            smoking: smoking || false,
            alcohol: alcohol || false,
            diet: diet || null,
            exerciseFrequency: exerciseFrequency || null,
            sleepHours: sleepHours ? parseInt(sleepHours, 10) : null,
          },
        },
      },
      include: {
        medicalHistory: true,
        currentHealthStatus: true,
      },
    });

    if (!newPatient) {
      return {
        success: false,
        error: "Failed to create patient",
      };
    }

    const sendMail = await sendEmail({
      email: newPatient.email,
      subject: "Welcome to Pulse AI",
      from: "onboarding@brokerless.online",
      react: Onboarding({
        name: `${newPatient.firstName} ${newPatient.lastName}`,
        token: newPatient.token,
      }),
    });

    return {
      success: true,
      data: newPatient,
    };
  } catch (error) {
    console.error("Error creating patient:", error);
    return {
      success: false,
      error: `Failed to create patient: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}

function calculateBMI(weight, height) {
  if (!weight || !height) return null;
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height) / 100; // convert cm to m
  return parseFloat((weightNum / Math.pow(heightNum, 2)).toFixed(2));
}

function generateRandomToken() {
  return crypto.randomBytes(3).toString("hex");
}

export default createPatient;
