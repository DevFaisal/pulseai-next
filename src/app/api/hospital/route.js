import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, location, email, password } = body;

    // Validate request body
    if (!name) {
      return NextResponse.json(
        { error: "Hospital name is required" },
        { status: 400 }
      );
    }

    const hospitalCode = name
      .replace(/\s/g, "")
      .slice(0, 2)
      .toUpperCase()
      .concat(crypto.randomBytes(2).toString("hex").toUpperCase());

    // check whether the hospital is already registered

    const hospital = await prisma.hospital.create({
      data: {
        name,
        location,
        hospitalCode,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const masterAdmin = await prisma.user.create({
      data: {
        name: "Admin",
        email: email,
        password: hashedPassword,
        role: "ADMIN",
        hospitalId: hospital.id,
      },
    });

    console.log("Admin created: ", masterAdmin);

    return NextResponse.json(hospital, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create hospital" },
      { status: 500 }
    );
  }
}
