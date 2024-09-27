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

    const patientExists = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patientExists) {
      return NextResponse.json(
        { error: "Patient not found." },
        { status: 404 }
      );
    }

    const deletedPatient = await prisma.patient.delete({
      where: { id: patientId },
    });

    return NextResponse.json(deletedPatient, { status: 200 });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete patient." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request, { params }) {
  try {
    const { patientId } = params;
    const body = await request.json();
    console.log("Update patient data:", body);

    console.log("Update patient data:", body);

    if (!patientId) {
      return NextResponse.json(
        { error: "patientId is required" },
        { status: 400 }
      );
    }

    const patientExists = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patientExists) {
      return NextResponse.json(
        { error: "Patient not found." },
        { status: 404 }
      );
    }

    const updatedPatient = await prisma.patient.update({
      where: { id: patientId },
      data: {
        ...body,
        age: parseInt(body.age, 10),
        assignedDoctor: {
          connect: { id: body.assignedDoctor },
        },
      },
    });

    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update patient." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
