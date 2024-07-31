import prisma from "@/app/config/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  const { postId } = await req.json();
  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" });
  }
  try {
    await prisma.like.deleteMany({
      where: {
        postId: parseInt(postId, 10),
        userId: session?.user.id!,
      },
    });
    return NextResponse.json({ message: "unlike success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error delete like" });
  }
}
