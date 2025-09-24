"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type SessionData = {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    userAgent?: string | null;
    ip?: string | null;
  };
} | null;

function NavBar() {
  const [session, setSession] = useState<SessionData>(null);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await authClient.getSession();
        if ("data" in response) {
          setSession(response.data);
        } else {
          setSession(null);
          console.error("Session fetch error:", response);
        }
      } catch (err) {
        setSession(null);
        console.error("Unexpected error fetching session:", err);
      }
    }
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setSession(null);
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between overflow-hidden rounded-4xl bg-white/20 px-3 py-4 shadow backdrop-blur-md transition duration-300 ease-in-out">
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
          href={`/createblog`}
          className="transition duration-300 ease-in-out hover:scale-105 hover:text-neutral-800"
        >
          Create Blog
        </Link>
        <Link
          href={`/blogs`}
          className="transition duration-300 ease-in-out hover:scale-105 hover:text-neutral-800"
        >
          Blogs
        </Link>

        {session ? (
          <button
            className="cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:text-neutral-800"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        ) : (
          <div className="flex gap-3">
            <Link
              href="/auth/signup"
              className="transition duration-300 ease-in-out hover:scale-105 hover:text-neutral-800"
            >
              Sign Up
            </Link>
            <Link
              href="/auth/signin"
              className="transition duration-300 ease-in-out hover:scale-105 hover:text-neutral-800"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
