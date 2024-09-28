import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { userId } = params;

    // Validate userId parameter
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Validate userId format (ObjectId)
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid User ID format" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find doctor by userId
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
            vitalSigns: {
              select: {
                id: true,
                heartRate: true,
                bloodPressure: true,
                temperature: true,
              },
            },
          },
        },
      },
    });
    // If no doctor is found
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Return doctor data
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor data:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
