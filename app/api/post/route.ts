import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/primsa";

export async function POST(req:Request){
    const session = await getServerSession(authOptions);

    if(!session)
    return NextResponse.json({message:"User is Not Authenticated"});

    const { title, content, links, category, imageUrl, publicId } = await req.json();

    if (!title || !content) {
        return NextResponse.json(
          { error: "Title and content are required." },
          { status: 500 }
        );
      }


  const authorEmail = session?.user?.email as string;

  try {
    const newPost = await prisma.post.create({
        data: {
          title,
          content,
          links,
          imageUrl,
          publicId,
          catName: category,
          authorEmail,
        },
      });
      console.log("Post created");
      return NextResponse.json(newPost);
    } catch (error) {
        console.log(error);
      return NextResponse.json({ message: "Could not create post." });
    }

}

export async function GET() {
    try {
      const posts = await prisma.post.findMany({
        include: { author: { select: { name: true } } },
        orderBy: {
          createdAt: "desc",
        },
      });
  
      return NextResponse.json(posts);
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Some error occured" },
        { status: 500 }
      );
    }
  }