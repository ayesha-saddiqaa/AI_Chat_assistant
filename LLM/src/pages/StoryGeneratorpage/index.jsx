import React, { useState } from "react";
import { sendToGemini } from "../../utils/api";

export default function StoryGenerator() {
  const [theme, setTheme] = useState("");
  const [character, setCharacter] = useState("");
  const [length, setLength] = useState("Short (100-150 words)");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!theme || !character) return alert("Please fill in all fields!");
    setLoading(true);
    setStory("");

    const prompt = `Write a ${length} story based on the theme "${theme}" featuring a character named ${character}.`;
    const result = await sendToGemini(prompt);
    setStory(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 flex flex-col items-center py-10">
      <h1 className="text-3xl mb-8 font-semibold text-zinc-200 tracking-wide">
        Story Generator
      </h1>

      {/* Input Card */}
      <div className="bg-zinc-800 rounded-2xl p-8 w-full max-w-lg shadow-xl border border-zinc-700">
        <div className="space-y-4">
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Enter Theme (e.g., Magical, Horror, Adventure)"
            className="w-full p-3 bg-zinc-700 text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder-zinc-400"
          />

          <input
            type="text"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            placeholder="Enter Character Name"
            className="w-full p-3 bg-zinc-700 text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder-zinc-400"
          />

          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-3 bg-zinc-700 text-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
          >
            <option>Short (100-150 words)</option>
            <option>Medium (200-300 words)</option>
            <option>Long (400+ words)</option>
          </select>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white font-semibold transition duration-200"
          >
            {loading ? "Generating..." : "Generate Story"}
          </button>
        </div>
      </div>

      {/* Output Section */}
      {story && (
        <div className="mt-10 bg-zinc-800 text-zinc-200 rounded-2xl shadow-md p-6 w-full max-w-3xl border border-zinc-700 whitespace-pre-line">
          <h2 className="text-xl font-semibold mb-3 text-zinc-100">Your Story:</h2>
          <p className="leading-relaxed text-zinc-300">{story}</p>
        </div>
      )}
    </div>
  );
}