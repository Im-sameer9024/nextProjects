import z from "zod";

export const usernameValidation = z
  .string()
  .min(3, { message: "username must be at least 3 characters" })
  .max(20, { message: "username must be at most 20 characters" })
  .regex(/^[a-zA-Z0-9]+$/, {
    message: "username can only contain letters and numbers",
  });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});
