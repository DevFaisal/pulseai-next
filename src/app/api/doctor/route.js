import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

export async function GET(request) {
  const hospitalId = request.nextUrl.searchParams.get("hospitalId");

  if (!hospitalId) {
    return NextResponse.json(
      { error: "Hospital ID is required" },
      { status: 400 }
    );
  }

  if (!ObjectId.isValid(hospitalId)) {
    return NextResponse.json(
      { error: "Invalid Hospital ID format" },
      { status: 400 }
    );
  }

  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        hospitalId: hospitalId,
      },
    });

    if (!doctors.length) {
      return NextResponse.json({ error: "No Doctor found" }, { status: 404 });
    }

    // Return the patients in the response
    return NextResponse.json(doctors);
  } catch (error) {
    // Log the error to the server
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch Doctors" },
      { status: 500 }
    );
  }
}
