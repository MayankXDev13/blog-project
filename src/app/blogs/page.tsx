"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

interface Blog {
  _id: string;
  content: string;
  createdBy: {
    name?: string;
    email?: string;
  };
}

function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session?.user?.id) return; // wait until session is ready

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "/api/blogs?userId=" + session.user.id,
        );
        setBlogs(response.data.blogs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [session]);

  if (loading) return <p className="mt-4 text-center">Loading blogs...</p>;

  return (
    <div className="mx-auto mt-6 max-w-3xl space-y-6">
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="rounded-md border bg-white p-4 shadow-sm"
          >
            <div className="mb-2 text-sm text-gray-500">
              {blog.createdBy?.name || blog.createdBy?.email || "Anonymous"}
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        ))
      )}
    </div>
  );
}

export default Blogs;
