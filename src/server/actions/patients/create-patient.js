"use server";

import prisma from "@/lib/prisma";
import { sendEmail } from "../sent-email";
import Onboarding from "@/emails/Onboarding";
import crypto from "crypto";

// export async function createPatient({ formData, hospitalId }) {
//   try {
//     const {
//       name,
//       email,
//       age,
//       gender,
//       weight,
//       height,
//       bloodType,
//       assignedDoctor,
//     } = formData;

//     const doctor = await prisma.doctor.findUnique({
//       where: {
//         id: assignedDoctor,
//       },
//     });

//     if (!doctor) {
//       return {
//         error: "Doctor not found",
//       };
//     }
//     const parsedWeight = weight ? parseInt(weight, 10) : null;
//     const parsedHeight = height ? parseInt(height, 10) : null;

//     const newPatient = await prisma.patient.create({
//       data: {
//         name,
//         email,
//         age: parseInt(age, 10),
//         gender,
//         weight: parsedWeight,
//         height: parsedHeight,
//         bloodType: bloodType || null,
//         token: generateRandomToken(),
//         BMI:
//           parsedWeight && parsedHeight
//             ? calculateBMI(parsedWeight, parsedHeight)
//             : null,
//         hospital: {
//           connect: {
//             id: hospitalId,
//           },
//         },
//         assignedDoctor: {
//           connect: {
//             id: assignedDoctor,
//           },
//         },
//         vitalSigns: {
//           create: {
//             heartRate: 0,
//             bloodPressure: "0/0",
//             temperature: 0,
//             respiratoryRate: 0,
//             oxygenSaturation: 0,
//           },
//         },
//       },
//     });

//     if (!newPatient) {
//       return {
//         error: "Error creating patient",
//       };
//     }

//     const sendMail = await sendEmail({
//       email: newPatient.email,
//       subject: "Welcome to Pulse AI",
//       from: "onboading@brokerless.online",
//       react: Onboarding({ name: newPatient.name, token: newPatient.token }),
//     });

//     return {
//       data: { ...newPatient, assignedDoctor: { name: doctor.name } },
//     };
//   } catch (error) {
//     console.error("Error creating patient:", error);
//     return {
//       error: "Error creating patient",
//     };
//   }
// }

// function calculateBMI(weight, height) {
//   return parseFloat((weight / Math.pow(height / 100, 2)).toFixed(2));
// }

// function generateRandomToken() {
//   return crypto.randomBytes(3).toString("hex");
// }
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
        noKnownHistory,
      },
      currentHealthStatus: {
        symptoms,
        symptomIntensity,
        symptomDuration,
        additionalComments,
        doctorAssigned,
      },
      medicationAllergies: {
        foodAllergies,
        medicationAllergies,
        environmentalAllergies,
        medications,
        otherAllergies,
      },
      lifestyleFactors: {
        smoking,
        alcohol,
        diet,
        exerciseFrequency,
        sleepHours,
      },
      familyHealthHistory: { familyConditions, noKnownFamilyHistory },
    } = formData;

    // Create new patient in the database
    const newPatient = await prisma.patient.create({
      data: {
        firstName,
        email,
        lastName,
        dateOfBirth: dob ? new Date(dob) : null,
        weight: weight ? parseFloat(weight) : null,
        gender,
        height: height ? parseInt(height, 10) : null,
        token: generateRandomToken(),
        bmi: calculateBMI(weight, height),
        // Health Background
        medicalConditions: medicalConditions || null,
        previousSurgeries: previousSurgeries || null,
        ongoingTreatments: ongoingTreatments || null,
        noKnownHistory: noKnownHistory || false,
        // Current Health Status
        symptoms: symptoms || null,
        symptomIntensity: symptomIntensity
          ? parseInt(symptomIntensity, 10)
          : null,
        symptomDuration: symptomDuration || null,
        additionalComments: additionalComments || null,
        // Medication & Allergies
        medications: medications || null,
        foodAllergies: !!foodAllergies,
        medicationAllergies: !!medicationAllergies,
        environmentalAllergies: !!environmentalAllergies,
        otherAllergies: otherAllergies || null,
        // Lifestyle Factors
        smoking: smoking || null,
        alcohol: alcohol || null,
        diet: diet || null,
        exerciseFrequency: exerciseFrequency
          ? parseInt(exerciseFrequency, 10)
          : null,
        sleepHours: sleepHours ? parseInt(sleepHours, 10) : null,
        // Family Health History
        familyConditions: familyConditions || null,
        noKnownFamilyHistory: noKnownFamilyHistory || false,
        // Relationships
        hospitalId: hospitalId,
        doctorId: doctorAssigned,
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
      from: "onboading@brokerless.online",
      react: Onboarding({
        name: newPatient.firstName + " " + newPatient.lastName,
        token: newPatient.token,
      }),
    });

    return {
      success: true,
      data: newPatient,
    };
  } catch (error) {
    console.error("Error creating patient:", error.message || error);
    return {
      success: false,
      error: `Failed to create patient: ${error.message || "Unknown error"}`,
    };
  }
}

function calculateBMI(weight, height) {
  return parseFloat((weight / Math.pow(height / 100, 2)).toFixed(2));
}

function generateRandomToken() {
  return crypto.randomBytes(3).toString("hex");
}
