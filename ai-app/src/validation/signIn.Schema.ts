import z from "zod";
import { usernameValidation } from "./signUp.Schema";

export const signInSchema = z.object({
  username: usernameValidation,
  password: z.string(),
});
