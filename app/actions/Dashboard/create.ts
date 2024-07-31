"use server";

import prisma from "@/app/config/db";
import { UserRole } from "@prisma/client";
import { writeFile } from "fs/promises";
import { join } from "path";

export const CreateUser = async (data: FormData) => {
  try {
    let color = "";
    if (data.get("isActive") == "canceled") color = "Red";
    else if (data.get("isActive") == "pending") color = "yellow";
    else color = "gray";
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      throw new Error("no file uploaded");
    }
    const byte = await file.arrayBuffer();
    const buffer = Buffer.from(byte);
    const path = join(".", "public/image", file.name);
    await writeFile(path, buffer).then(async () => {
      await prisma.user.create({
        data: {
          name: data.get("name") as string,
          email: data.get("email") as string,
          password: data.get("password") as string,
          phonenumber: data.get("phone") as string,
          createdAt: data.get("createdAt") as string,
          role: data.get("role") as UserRole,
          status: data.get("isActive") as string,
          color,
          image: path.replace("public", "").replace(/\\/g, "/"),
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
};
export const CreateDoctor = async (data: FormData) => {
  try {
    const existingDoctor = await prisma.doctors.findUnique({
      where: {
        name: data.get("name") as string,
      },
    });
    if (existingDoctor) {
      return console.log("Your Profile has already been made!");
    }
    await prisma.doctors.create({
      data: {
        name: data.get("name") as string,
        addres: data.get("address") as string,
        body: data.get("body") as string,
        expertise: data.get("expertise") as string,
        userId: data.get("isDoctor") as string,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const CreateDiseases = async (data: FormData) => {
  try {
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      throw new Error("no file uploaded");
    }
    const byte = await file.arrayBuffer();
    const buffer = Buffer.from(byte);
    const path = join(".", "public/image", file.name);
    await writeFile(path, buffer).then(async () => {
      await prisma.siknesslist.create({
        data: {
          title: data.get("title") as string,
          stock: data.get("stock") as string,
          createdAt: data.get("createdAt") as string,
          description: data.get("body") as string,
          compare: data.get("title") as string,
          image: path.replace("public", "").replace(/\\/g, "/"),
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
};
