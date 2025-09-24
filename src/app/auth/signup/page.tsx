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

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

const handleSignUpGoogle = async () => {
  try {
    // Trigger Google OAuth login
    const data = await authClient.signIn.social({
      provider: "google",      // The social provider
      callbackURL: "/createblog", // Where user will be redirected after login
    });
    console.log("Login success data:", data);
  } catch (error) {
    console.error("Login failed:", error);
  }
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await authClient.signUp.email(
        {
          email: email,
          password: password,
          name: name,
          callbackURL: "/createblog",
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false);
            router.push("/createblog");
          },
          onError: (ctx) => {
            setLoading(false);

            alert(ctx.error.message);
          },
        },
      );

      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details below to sign up</CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="/auth/signin">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>
            </div>

            <CardFooter className="mt-6 flex-col gap-2">
              <Button type="submit" className="w-full">
                {loading ? "Loading..." : "Sign Up"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={handleSignUpGoogle}
              >
                Sign Up with Google
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
