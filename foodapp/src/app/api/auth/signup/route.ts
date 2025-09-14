import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";


export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const avatarUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`;

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        image:avatarUrl,
        password: hashedPassword,
        emailVerified: new Date(), // Auto-verify for simplicity
      },
    });

    console.log("user of api ",user)

    return NextResponse.json(
      { success:true, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}