"use client"

import LoginForm from "@/components/Forms/LoginForm";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className=" h-[calc(100vh-80px)] flex justify-center items-center">
      <div className=" w-[90%] sm:w-[50%] lg:w-[33%] flex flex-col items-center gap-4">
        <h2 className=" flex items-center gap-2 font-semibold">
          <User /> Login as User
        </h2>

        <LoginForm />
        <p className=" flex items-center">or</p>

        <div className=" w-full">
          <Button
            onClick={() => signIn("google")}
            className=" bg-blue-400 hover:bg-blue-500 text-white w-full"
          >
            Login by Google
          </Button>
        </div>

        <div>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className=" text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
