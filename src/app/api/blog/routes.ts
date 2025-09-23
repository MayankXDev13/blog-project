import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Blog from "@/app/api/models/blog.models";

// create blog
export async function POST(request: NextRequest) {
  const { title, content, createdBy } = await request.json();

  try {
    await connectToDatabase();
    const newBlog = await Blog.create({
      title: title,
      content: content,
      createdBy: createdBy,
    });

    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to create blog", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const blogId = url.searchParams.get("blogId");

    // fetch single blog by its _id
    // GET /api/blogs?blogId=BLOG_ID

    if (blogId) {
      try {
        const blog = await Blog.findById(blogId).populate("createdBy");

        if (!blog) {
          return NextResponse.json(
            { message: "Blog not found" },
            { status: 404 }
          );
        }

        return NextResponse.json(
          { message: "Blog fetched", blog: blog },
          { status: 200 }
        );
      } catch (err: any) {
        return NextResponse.json(
          { message: "Failed to fetch blog by id", error: err.message },
          { status: 500 }
        );
      }
    }

    // fetch all blogs created by a specific user
    // GET /api/blogs?userId=USER_ID

    if (userId) {
      try {
        const blogs = await Blog.findById(userId).populate("createdBy");

        return NextResponse.json(
          { message: "User blogs fetched", blogs: blogs },
          { status: 200 }
        );
      } catch (err: any) {
        return NextResponse.json(
          { message: "Failed to fetch blogs by user", error: err.message },
          { status: 500 }
        );
      }
    }

    // fetch all blogs
    // GET /api/blogs

    try {
      const blogs = await Blog.find().populate("createdBy");

      return NextResponse.json(
        { message: "All blogs fetched", blogs: blogs },
        { status: 200 }
      );
    } catch (err: any) {
      return NextResponse.json(
        { message: "Failed to fetch all blogs", error: err.message },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { message: "Database connection failed", error: err.message },
      { status: 500 }
    );
  }
}
