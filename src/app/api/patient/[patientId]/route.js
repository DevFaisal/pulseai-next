import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { patientId } = params;

    if (!patientId) {
      return NextResponse.json(
        { error: "patientId is required" },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        assignedDoctor: {
          select: {
            name: true,
          },
        },
        medications: true,
        vitalSigns: {
          select: {
            heartRate: true,
            bloodPressure: true,
            temperature: true,
            respiratoryRate: true,
            oxygenSaturation: true,
            timestamp: true,
          },
          orderBy: {
            timestamp: "desc",
          },
          take: 1,
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: "Patient not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch patient." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

