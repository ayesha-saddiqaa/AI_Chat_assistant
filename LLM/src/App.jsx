import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import NewChat from "./pages/NewChat";
import StoryGenerator from "./pages/StoryGeneratorpage";
import WordPilot from "./pages/wordPilot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {

  return (
        <Router>
          <Sidebar />
          <main className="flex-1 min-h-screen md:ml-64 bg-zinc-900 text-zinc-300">
            <div className="w-full h-full bg-transparent">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-chat" element={<NewChat />} />
                <Route path="/story-generator" element={<StoryGenerator />} />
                <Route path="/word-pilot" element={<WordPilot />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </main>
        </Router>
  );
}