"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const Login = async (formdata: FormData) => {
  try {
    await signIn("credentials", formdata);
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Username or password incorrect!",
          };
        default:
          return {
            error: "Development Error!",
          };
      }
    }
    throw error;
  }
};
