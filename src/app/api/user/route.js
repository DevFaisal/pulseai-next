import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate request body
    const { name, email, password, role, hospitalId } = body;
    if (!name || !email || !role || !hospitalId || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const hospitalCode = await prisma.hospital.findFirst({
      where: { id: hospitalId },
      select: { hospitalCode: true },
    });

    // Check if the user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email,
        Hospital: {
          hospitalCode: hospitalCode.hospitalCode,
        },
      },
    });
    if (userExists) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        Hospital: {
          connect: { id: hospitalId },
        },
      },
    });

    if (role === "DOCTOR") {
      try {
        const doctor = await prisma.doctor.create({
          data: {
            name: name,
            userId: user.id,
            specialty: body.specialty,
            Hospital: {
              connect: {
                id: hospitalId,
              },
            },
            email: email,
            phone: body.contact,
          },
        });
      } catch (error) {
        console.error("Error creating doctor:", error);
        return NextResponse.json(
          { error: "Failed to create doctor" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
