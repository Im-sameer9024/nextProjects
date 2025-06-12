"use client";

import { signIn } from "@/auth";
import { SignupDataSchema } from "@/validation/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const SignupForm = () => {
  type signupType = z.infer<typeof SignupDataSchema>;

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signupType>({
    resolver: zodResolver(SignupDataSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
    },
  });

  if (loading) return <div>Loading...</div>;

  const onSubmit = async (data: signupType) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user", JSON.stringify(data));
      console.log("response is here", res);

      if (res.status === 200) {
        toast.success("User created successfully");
        await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        router.push("/");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("error occur",error)
    } finally {
      setLoading(false);
      // reset();
    }
  };

  return (
    <div className=" p-4 rounded-lg shadow-lg bg-gray-300 w-1/5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className=" flex flex-col gap-4 "
      >
        <div className=" flex flex-col gap-1">
          <label htmlFor="email">Full Name</label>
          <input
            type="name"
            {...register("name")}
            id="name"
            className=" border rounded-md"
          />
          {errors.name && (
            <p className=" text-red-500">{errors.name?.message}</p>
          )}
        </div>
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
            <p className=" text-red-500">{errors.password?.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <select {...register("role")} id="role">
            <option value="ADMIN">Admin</option>
            <option value="STUDENT">student</option>
            <option value="PARENT">parent</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className=" bg-green-400 p-1 rounded-md text-white"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
