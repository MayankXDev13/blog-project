import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Blog from "@/app/api/models/blog.models";
import { BSON } from "mongodb";

// create blog
export async function POST(request: NextRequest) {
  const { content, createdBy } = await request.json();
  console.log(content, createdBy);
  

  try {
    await connectToDatabase();
    const newBlog = await Blog.create({
      content,
      createdBy,
    });

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create blog", error: error.message },
      { status: 500 },
    );
  }
}

// fetch blogs
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const blogId = url.searchParams.get("blogId");    

    console.log(userId, blogId);
    

    if (blogId) {
      const blog = await Blog.findById(blogId).populate("createdBy");
      if (!blog)
        return NextResponse.json(
          { message: "Blog not found" },
          { status: 404 },
        );
      return NextResponse.json(
        { message: "Blog fetched", blog },
        { status: 200 },
      );
    }

    if (userId) {
      const blogs = await Blog.find({ createdBy: userId });
      return NextResponse.json(
        { message: "User blogs fetched", blogs },
        { status: 200 },
      );
    }

    const blogs = await Blog.find().populate("createdBy");
    return NextResponse.json(
      { message: "All blogs fetched", blogs },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Database connection failed", error: err.message },
      { status: 500 },
    );
  }
}
