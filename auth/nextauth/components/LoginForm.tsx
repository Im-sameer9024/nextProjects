"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormDataSchema } from "@/validation/Schemas";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const LoginForm = () => {
  type LoginFormData = z.infer<typeof loginFormDataSchema>;

  const { status } = useSession();
  const searchParams = useSearchParams();

  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormDataSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    if (status === "loading") {
      return <div>Loading.....</div>;
    }
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl,
      });

      console.log("response ",response)

      if (!response?.error) {
        toast.success("Login Successful");
        router.push(response?.url || callbackUrl);
      }
      if (response.error === "CredentialsSignin") {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error(response.error || "Login failed");
      }

      throw new Error(response.error || "Login failed");
    } catch (error) {
      console.log("error occur",error)
    }
  };

  return (
    <div className=" p-4 rounded-lg shadow-lg bg-gray-300 w-1/5">
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 ">
        <div className=" flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            id="email"
            className=" border rounded-md"
          />
          {errors.email && (
            <p className=" text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <div className=" flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className=" border rounded-md"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className=" bg-green-400 p-1 rounded-md text-white"
          >
            Login
          </button>
        </div>
        <div>
          <Link href={"/signup"}>Signup</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
