import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    // check user

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    console.log("existingUser", existingUser)

    if (existingUser) {
        console.log("hello is here")
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      // create user
      const userCreate = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashPassword,
          role: role,
        },
      });

      console.log("usercreae is here",userCreate)

      return NextResponse.json(
        { userCreate, message: "User created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error occur", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}


