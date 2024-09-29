import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { hospitalId } = params;

    if (!hospitalId) {
      return NextResponse.json(
        { error: "hospitalId are required" },
        { status: 400 }
      );
    }
    const data = await prisma.hospital.findMany({
      where: {
        id: hospitalId,
      },
      select: {
        patients: {
          select: {
            id: true,
            name: true,
            age: true,
            gender: true,
            hospitalId: true,
            assignedDoctor: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!data) {
      return NextResponse.json({ error: "No patients found" }, { status: 404 });
    }
    const patients = data[0].patients;

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
