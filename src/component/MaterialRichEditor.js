"use client";
import dynamic from "next/dynamic";
import React from "react";

// dynamically import the editor to prevent SSR
const Editor = dynamic(() => import("./MaterialRichEditorClient"), { ssr: false });

const MaterialRichEditor = ({ value, onChange }) => {
  return <Editor value={value} onChange={onChange} />;
};

export default MaterialRichEditor;
