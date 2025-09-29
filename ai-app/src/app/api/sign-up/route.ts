import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import mailSender from "@/lib/email/mailSender";

export async function POST(request: NextRequest) {
  try {
    //-------------- fetch all data---------------
    const { username, email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          success: false,
          message: "User already registered",
        },
        {
          status: 401,
        }
      );
    }

    if (user) {
      if (
        await prisma.user.findFirst({
          where: {
            username: username,
            isVerified: true,
          },
        })
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "User is Registered and verified also",
          },
          {
            status: 401,
          }
        );
      }
    } else {
      //----------if user is not created and not verified then create user and send email for verification----------------

      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyCode = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const expireTime = new Date();
      expireTime.setHours(expireTime.getHours() + 1);
      const newUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
          verifyCode: verifyCode,
          verifyCodeExpiry: expireTime,
          isVerified: false,
          isAcceptingMessages: true,
        },
      });

      //send verification Email

      const optionForVerificationEmail = {
        email: email,
        title: "Verification Email by Ai Assistant Pvt. Ltd.",
        body: "Please verify your email by clicking on the link below. Your verification code is ",
      };

      const mailResponse = await mailSender(optionForVerificationEmail);

      if (mailResponse?.rejected) {
        return NextResponse.json(
          {
            success: false,
            message: `Error in sending verification email ${mailResponse}`,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "User Registered successfully ",
        data: newUser,
      });
    }
  } catch (error) {
    console.log("Error in sign up api", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in sign up api",
      },
      { status: 500 }
    );
  }
}
