import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { hospitalId, type } = params;

    if (!hospitalId) {
      return NextResponse.json(
        { error: "hospitalId is required" },
        { status: 400 }
      );
    }

    if (type === "patients") {
      // Fetch patients
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
        return NextResponse.json(
          { error: "No patients found" },
          { status: 404 }
        );
      }
      const patients = data[0].patients;

      return NextResponse.json(patients);
    } else if (type === "users") {
      const users = await prisma.user.findMany({
        where: {
          hospitalId: hospitalId,
          role: "USER",
        },
        select: {
          name: true,
          email: true,
          createdAt: true,
        },
      });
      if (!users || users.length === 0) {
        return NextResponse.json({ error: "No users found" }, { status: 404 });
      }

      return NextResponse.json(users);
    } else {
      return NextResponse.json(
        { error: "Invalid type provided" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
