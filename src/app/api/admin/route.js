import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(request) {

  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid Parameters" }, { status: 400 });
    }
    
    const user = await prisma.hospital.create({ data: body });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create hospital" },
      { status: 500 }
    );
  }
}
