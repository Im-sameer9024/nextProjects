import SignupForm from "@/components/common/SignupForm";
import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <SignupForm />
    </div>
  );
};

export default SignUp;
