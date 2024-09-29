import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const { patientId } = params;
  const body = await request.json();
  console.log("Update patient medication with id:", patientId);
  console.log("Request body:", body);


  try {
    const response = await prisma.patient.findFirst({
      where: {
        id: patientId,
      },
    });
    if (!response) {
      return NextResponse.error({
        status: 404,
        message: "Patient not found",
      });
    }
    const updatedPatient = await prisma.patient.update({
      where: {
        id: patientId,
      },
      data: {
        medications: {
          create: {
            name: body.name,
            dosage: body.dosage,
            frequency: body.frequency,
            startDate: new Date(),
            endDate: new Date(),
          },
        },
      },
    });
    if (!updatedPatient) {
      return NextResponse.error({
        status: 400,
        message: "Failed to update patient medication",
      });
    }
    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient medication:", error);
    return NextResponse.error({
      status: 500,
      message: "Failed to update patient medication",
    });
  }
}
