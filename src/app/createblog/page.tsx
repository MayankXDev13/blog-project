"use client";

import { useState } from "react";
import TextEditor from "@/components/Editor";

export default function CreateBlog() {
  const [content, setContent] = useState("");

  return (
   <TextEditor/>
  );
}
