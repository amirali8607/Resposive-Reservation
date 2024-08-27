import prisma from "@/app/config/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Id is not defined!" });
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Delete user success!" });
  } catch (error) {
    return NextResponse.json({ error: "Error" });
  }
}
