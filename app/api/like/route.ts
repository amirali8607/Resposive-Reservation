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
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: session?.user.id,
        postId: parseInt(postId, 10),
      },
    });
    if (existingLike) return NextResponse.json({ error: "existing like" });
    await prisma.like.create({
      data: {
        postId: parseInt(postId, 10),
        userId: session?.user.id!,
        createdAt: new Date().toString(),
      },
    });
    return NextResponse.json({ message: "like added" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error adding like" });
  }
}
