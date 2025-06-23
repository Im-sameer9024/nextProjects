"use client"
import { LoginFormProps } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const useLogin = () => {



  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormProps) => {
      await signIn("credentials", {
        ...data,
        redirect: true,
        callbackUrl: "/",
      });
    },

    onMutate: () => {
      toast.loading("Logging in...", { id: "login" });
    },

    onSuccess: () => {
      toast.success("Logged in successfully", { id: "login", duration: 2000 });
    },

    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data.message || "Something went wrong";
      toast.error(errorMessage, { id: "signup" });
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
  };
};

export default useLogin;
