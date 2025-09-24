"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { date } from "better-auth";

const extensions = [StarterKit];

function MenuBar({ editor }: { editor: any }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      canBold: ctx.editor.can().chain().toggleBold().run(),
      isItalic: ctx.editor.isActive("italic"),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),
      isStrike: ctx.editor.isActive("strike"),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),
      isCode: ctx.editor.isActive("code"),
      canCode: ctx.editor.can().chain().toggleCode().run(),
      canUndo: ctx.editor.can().chain().undo().run(),
      canRedo: ctx.editor.can().chain().redo().run(),
    }),
  });

  const buttonClasses = (active: boolean) =>
    `px-3 py-1 rounded-md border border-gray-300 mr-2 mb-2 ${
      active
        ? "bg-purple-600 text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    } transition`;

  return (
    <div className="mb-4 flex flex-wrap rounded-md border-b border-gray-200 bg-gray-50 p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={buttonClasses(editorState.isBold)}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={buttonClasses(editorState.isItalic)}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        className={buttonClasses(editorState.isStrike)}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        className={buttonClasses(editorState.isCode)}
      >
        Code
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        className={buttonClasses(false)}
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        className={buttonClasses(false)}
      >
        Redo
      </button>
    </div>
  );
}

export default function TextEditor() {
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const editor = useEditor({
    extensions,
    content: `<p>Welcome to your <strong>Tiptap</strong> editor!</p>`,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg m-4 focus:outline-none",
      },
    },
    immediatelyRender: false, 
  });

  if (!editor) return null;

  const handleSubmit = async () => {
    if (!editor) return;
    const content = editor.getHTML(); // Get the HTML content of the editor

    try {
      const response = await axios.post("/api/blogs", {
        content,
        createdBy: session?.user.id,
      });

      console.log("Blog submitted:", response.data);
      alert("Blog submitted successfully!");
      editor.commands.clearContent(); // clear editor after submit
    } catch (error: any) {
      console.error(error);
      alert("Failed to submit blog!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-3xl">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="mb-4 rounded-md border border-gray-300 bg-white p-4"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-md bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
      >
        {loading ? "Submitting..." : "Submit Blog"}
      </button>
    </div>
  );
}
