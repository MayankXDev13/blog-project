import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Blog from "@/app/api/models/blog.models";


// update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Blog id is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    // Get data from request body
    const body = await request.json();
    const { title, content } = body;

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // return the updated document
    ).populate("createdBy");

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to update blog", error: error.message },
      { status: 500 }
    );
  }
}

// deleter blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Blog id is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully", blog: deletedBlog },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete blog", error: error.message },
      { status: 500 }
    );
  }
}
