import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      age,
      gender,
      hospitalId,
      assignedDoctor,
      weight,
      height,
      bloodType,
    } = body;

    if (!name || !age || !gender || !hospitalId || !assignedDoctor) {
      return NextResponse.json(
        {
          error:
            "Name, age, gender, hospitalId, and assignedDoctorId are required.",
        },
        { status: 400 }
      );
    }

    const newPatient = await prisma.patient.create({
      data: {
        name,
        age: parseInt(age, 10),
        gender,
        weight: body.weight ? parseInt(body.weight, 10) : null,
        height: body.height ? parseInt(body.height, 10) : null,
        bloodType: body.bloodType || null,
        BMI: calculateBMI(body.weight, body.height),
        hospital: {
          connect: {
            id: hospitalId,
          },
        },
        assignedDoctor: {
          connect: {
            id: assignedDoctor,
          },
        },
        vitalSigns: {
          create: {
            heartRate: 0,
            bloodPressure: "0/0",
            temperature: 0,
            respiratoryRate: 0,
            oxygenSaturation: 0,
          },
        },
      },
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json(
      { error: "Failed to create patient." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const hospitalId = request.nextUrl.searchParams.get("hospitalId");
  console.log(hospitalId);
  if (!hospitalId) {
    return NextResponse.json(
      { error: "Hospital ID is required" },
      { status: 400 }
    );
  }

  // TODO: Validate hospitalId as needed, for example, using a regex or a library.

  try {
    // Fetch patients from the database based on hospitalId
    const patients = await prisma.patient.findMany({
      where: {
        hospitalId: hospitalId,
      },
      select: {
        id: true,
        name: true,
        age: true,
        hospitalId: true,
        gender: true,
        assignedDoctor: {
          select: {
            name: true,
          },
        },
        assignedDoctorId: true,
      },
    });

    if (!patients.length) {
      return NextResponse.json({ error: "No patients found" }, { status: 404 });
    }

    // Return the patients in the response
    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

function calculateBMI(weight, height) {
  return parseFloat((weight / Math.pow(height / 100, 2)).toFixed(2));
}
