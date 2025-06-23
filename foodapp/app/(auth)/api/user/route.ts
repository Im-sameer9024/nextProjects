import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // check user

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 401 }
      );
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      const admin = email === "admin@gmail.com" ? "ADMIN" : "USER";

      // create user

      const userCreate = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashPassword,
          role: admin,
        },
      });

      return NextResponse.json(
        { message: "User created successfully", data: userCreate },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("error occur", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
