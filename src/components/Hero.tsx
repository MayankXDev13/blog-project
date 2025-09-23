import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6">
      <h1 className="text-center text-6xl leading-tight font-extrabold md:text-7xl">
        <span className="text-neutral-950">Echo Press</span>
        <br />
        <span className="text-neutral-50">Every Voice</span>{" "}
        <span className="text-neutral-950">Gets Heard</span>
      </h1>

      <Link
        href={`/createblog`}
        className="mt-8 cursor-pointer rounded-full bg-neutral-50/20 px-6 py-3 text-2xl text-neutral-50 backdrop-blur-md transition duration-300 ease-in-out hover:scale-105 hover:bg-neutral-50/30"
      >
        Create Your Voice
      </Link>
    </div>
  );
}

export default Hero;
