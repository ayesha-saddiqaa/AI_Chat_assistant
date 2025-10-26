import React from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownComponent({ content }) {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}