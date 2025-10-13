"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "@tiptap/extension-code-block";

const MaterialRichEditorClient = ({ value = "", onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, TextStyle, CodeBlock],
    content: value,
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-2 focus:outline-none",
      },
    },
    immediatelyRender: false, // SSR safe
  });

  useEffect(() => {
    if (editor && value) editor.commands.setContent(value);
  }, [value, editor]);

  if (!editor) return null;

  const addLink = () => {
    const url = prompt("Enter URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: 4 }}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "text-blue-600" : ""}><b>B</b></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "text-blue-600" : ""}><i>I</i></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive("underline") ? "text-blue-600" : ""}><u>U</u></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive("heading", { level: 1 }) ? "text-blue-600" : ""}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive("heading", { level: 2 }) ? "text-blue-600" : ""}>H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive("heading", { level: 3 }) ? "text-blue-600" : ""}>H3</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "text-blue-600" : ""}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "text-blue-600" : ""}>1. List</button>
        <button onClick={addLink}>🔗 Link</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "text-blue-600" : ""}>❝ Blockquote</button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? "text-blue-600" : ""}>{"</> Code"}</button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} style={{ minHeight: "150px" }} />
    </div>
  );
};

export default MaterialRichEditorClient;
