import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen text-center p-64 bg-zinc-900">
      <h2 className="text-3xl font-bold mb-3 text-zinc-400">Welcome! Ask anything.</h2>
      <p className="text-zinc-400 mb-6">
        Start a new conversation and explore what AI can do for you.
      </p>
      <Link
        to="/new-chat"
        className="inline-block bg-zinc-800 text-zinc-400 px-5 py-2 rounded-lg hover:bg-zinc-700"
      >
        Start a New Chat
      </Link>
    </div>
  );
}