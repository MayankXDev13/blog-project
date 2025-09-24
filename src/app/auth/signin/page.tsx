"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignInGoogle = async () => {
    try {
      // Trigger Google OAuth login
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/createblog",
      });
      console.log("Login success data:", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/createblog",
      });

      if (error) {
        alert(error.message);
        setLoading(false);
      } else {
        setEmail("");
        setPassword("");
        setLoading(false);
        router.push("/createblog");
      }

      console.log(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password to sign in
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="/auth/signup">Create Account</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <CardFooter className="mt-6 flex-col gap-2">
              <Button type="submit" className="w-full">
                {loading ? "Loading..." : "Sign In"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={handleSignInGoogle}
              >
                Sign In with Google
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignIn;
