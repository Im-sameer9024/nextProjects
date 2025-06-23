"use client"

import { SignupFormProps } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const useSignup = () => {

  const signupMutation = useMutation({
    mutationFn: async (formData: SignupFormProps) => {
      const response = await axios.post("/api/user", formData);
      return response.data;
    },

    onMutate: () => {
      toast.loading("Creating Account...", { id: "signup" });
    },

    onSuccess: async (data) => {
      toast.success("Account Created Successfully", { id: "signup" });
      // router.push("/login")

      await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
    },

    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data.message || "Something went wrong";
      toast.error(errorMessage, { id: "signup" });
    },
  });

  return {
    signup:signupMutation.mutate,
    isLoading: signupMutation.isPending,
    isError: signupMutation.isError,
  };
};

export default useSignup;
