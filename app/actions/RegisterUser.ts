"use server";

import { hash } from "bcryptjs";
import prisma from "../config/db";
import { getUserByEmail } from "../data/getUserByEmail";
import { UserRole } from "@prisma/client";

export const RegisterUser = async (formdata: FormData) => {
  const existingUser = await getUserByEmail(formdata.get("email") as string);
  if (existingUser) {
    return {
      error: "Email Already Exists!",
    };
  }
  await prisma.user.create({
    data: {
      name: formdata.get("name") as string,
      email: formdata.get("email") as string,
      password: await hash(formdata.get("password") as string, 18),
      role: UserRole.USER,
    },
  });
};
