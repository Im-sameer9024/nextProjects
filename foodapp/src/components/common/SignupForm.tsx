"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const SignupForm = () => {
  const router = useRouter();

  const { data, status } = useSession();

  console.log("data of user", data, status);

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("data is here", data);

    try {
      const response = await axios.post("/api/auth/signup", data);
      console.log("response of signup is here", response);

      if (response.data.success) {

        toast.success("User registered successfully");

        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        router.push("/");

      }
    } catch (error) {
      console.log("Registration Error", error);
    }
  };

  const handleGoogleSignup = async () => {
    // Handle Google signup logic here
    await signIn("google", { redirectTo: "/" });
  };

  return (
    <div className=" max-w-lg min-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Form Header */}
      <div className="bg-green-600 py-4 px-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Create Account
        </h2>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6">
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`w-full  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message as string}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-green-500"
            }`}
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message as string}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:cursor-pointer text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign Up Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex hover:cursor-pointer items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
        >
          <FcGoogle className="w-5 h-5" />
          Sign up with Google
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-green-600 hover:underline hover:text-green-700 font-medium"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
