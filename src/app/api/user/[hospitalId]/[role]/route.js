import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { hospitalId } = params;
    const { role } = params;

    if (!hospitalId && !role) {
      return NextResponse.json(
        { error: "hospitalId and role are required" },
        { status: 400 }
      );
    }

    if (role.toUpperCase() === "DOCTOR") {
      const doctors = await prisma.doctor.findMany({
        where: {
          Hospital: {
            id: hospitalId,
          },
        },
      });

      if (!doctors) {
        return NextResponse.json(
          { error: "No doctors found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        doctors.map((doctor) => ({
          id: doctor.id,
          name: doctor.name,
          specialty: doctor.specialty,
          contact: doctor.phone,
        }))
      );
    } else {
      const users = await prisma.user.findMany({
        where: {
          role: role.toUpperCase(),
          Hospital: {
            id: hospitalId,
          },
        },
      });

      if (!users) {
        return NextResponse.json({ error: "No users found" }, { status: 404 });
      }

      return NextResponse.json(users);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
