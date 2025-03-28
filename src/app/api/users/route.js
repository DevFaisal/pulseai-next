import { NextResponse } from "next/server";
import { adminDatabase } from "@/lib/firebase-admin";

export async function GET() {
  try {
    console.log("Attempting to fetch users...");
    const usersRef = adminDatabase.ref("Prod/users");
    console.log("Database reference created");

    const snapshot = await usersRef.once("value");
    console.log("Snapshot received");

    const usersData = snapshot.val();

    if (!usersData) {
      console.log("No users data found");
      return NextResponse.json({ users: [] }, { status: 200 });
    }

    const users = Object.entries(usersData).map(([id, userData]) => ({
      id,
      email: userData.email || "",
      dob: userData.dob || "",
      name: userData.first || "",
      gender: userData.gender || "",
      imageUrl: userData.imageUrl || "",
      address: userData.address || "",
    }));

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Detailed error in GET /api/users:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return NextResponse.json({ error: `Failed to fetch users: ${error.message}` }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    console.log("Attempting to add user...");
    const body = await request.json();
    console.log("Request body:", body);

    // Extract required fields
    const { email, dob } = body;
    if (!email || !dob) {
      return NextResponse.json({ error: "Email and date of birth are required" }, { status: 400 });
    }

    const usersRef = adminDatabase.ref("Prod/users");
    console.log("Database reference created");

    const newUserRef = await usersRef.push(body);
    console.log("User added with ID:", newUserRef.key);

    return NextResponse.json(
      {
        message: "User added successfully",
        userId: newUserRef.key,
        email,
        dob,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Detailed error in POST /api/users:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return NextResponse.json({ error: `Failed to add user: ${error.message}` }, { status: 500 });
  }
}
