"use server";

import prisma from "@/app/config/db";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/users");
  } catch (error) {
    console.log(error);
  }
};
export const deleteDoctor = async (id: string) => {
  try {
    await prisma.doctors.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/doctors");
  } catch (error) {
    console.log(error);
  }
};
export const deleteSickness = async (id: string) => {
  try {
    await prisma.siknesslist.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard/diseases");
  } catch (error) {
    console.log(error);
  }
};
