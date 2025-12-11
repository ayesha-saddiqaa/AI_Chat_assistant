import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ chats }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const Item = ({ to, label }) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className={`block px-3 py-2 rounded-lg
        ${pathname === to ? "bg-zinc-700 text-white" : "text-zinc-300"}
        hover:bg-zinc-700`}
    >
      {label}
    </Link>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 rounded-lg px-3 py-2 bg-zinc-800 text-zinc-300"
        onClick={() => setOpen((o) => !o)}
      >
        ☰
      </button>

      {/* Fixed sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 p-4 bg-zinc-800 text-zinc-300 z-40
           border-r border-zinc-700 transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform`}
      >
        <nav className="space-y-2 mt-8">
          {/* Static pages */}
          <Item to="/" label="Home" />
          <Item to="/new-chat" label="New Chat" />
          <Item to="/story-generator" label="Story Generator" />
          <Item to="/word-pilot" label="Word Pilot" />
          <Item to="/login" label="Login" />
          <Item to="/signup" label="Signup" />

        </nav>
      </aside>
    </>
  );
}