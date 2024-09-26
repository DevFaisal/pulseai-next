import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  const hospitalId = request.nextUrl.searchParams.get("hospitalId");

  if (!hospitalId) {
    return NextResponse.json(
      { error: "Hospital ID is required" },
      { status: 400 }
    );
  }

  //TODO: Validate hospitalId as it mongoDB ObjectID

  try {
    // Fetch patients from the database based on hospitalId
    const patients = await prisma.doctor.findMany({
      where: {
        hospitalId: hospitalId,
      },
    });

    if (!patients.length) {
      return NextResponse.json({ error: "No Doctor found" }, { status: 404 });
    }

    // Return the patients in the response
    return NextResponse.json(patients);
  } catch (error) {
    // Log the error to the server
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}
