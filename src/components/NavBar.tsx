import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between overflow-hidden rounded-4xl bg-white/20 px-3 py-4 shadow backdrop-blur-md ">
      <div>
        <Link
          href={`/`}
          className="px-3 py-4 text-lg font-bold text-neutral-50"
        >
          Echo Press
        </Link>
      </div>
      <div className="flex gap-3 text-lg text-neutral-950">
        <Link
          href={`/auth/signup`}
          className="transition duration-300 hover:scale-105 ease-in-out hover:text-neutral-800 "
        >
          Sign Up
        </Link>
        <Link
          href={`/auth/signin`}
          className="transition duration-300 hover:scale-105 ease-in-out hover:text-neutral-800 "
        >
          Sign In
        </Link>
        <button className="cursor-pointer transition duration-300 hover:scale-105 ease-in-out hover:text-neutral-800 ">
          Sign Out
        </button>
        <Link
          href={`/blogs`}
          className="transition duration-300 hover:scale-105 ease-in-out hover:text-neutral-800 "
        >
          Blogs
        </Link>
        <Link
          href={`/createblog`}
          className="transition duration-300 hover:scale-105 ease-in-out hover:text-neutral-800 "
        >
          Create Blog
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
