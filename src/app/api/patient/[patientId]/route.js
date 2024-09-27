import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  try {
    const { patientId } = params;
    console.log("Delete patient with id:", patientId);
    if (!patientId) {
      return NextResponse.json(
        { error: "patientId is required" },
        { status: 400 }
      );
    }

    const ifPatientExists = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!ifPatientExists) {
      return NextResponse.json(
        { error: "Patient not found." },
        { status: 404 }
      );
    }

    const patient = await prisma.patient.delete({
      where: {
        id: patientId,
      },
    });

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: "Failed to delete patient." },
      { status: 500 }
    );
  }
}
