import React, { useState } from "react";
import { sendToGemini } from "../../utils/api";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as docx from "docx";
import mammoth from "mammoth"; // for reading uploaded docs

export default function WordPilot() {
  const [activeTab, setActiveTab] = useState("create");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Save text as .docx
  const handleSaveDoc = (text) => {
    const doc = new Document({
      sections: [
        {
          children: [new Paragraph({ children: [new TextRun(text)] })],
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "WordPilot_Document.docx");
    });
  };

  // 🔹 Upload and Read Word file
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    setFileContent(value);
  };

  // 🔹 AI Generate Content
  const handleAIGenerate = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setLoading(true);
    const result = await sendToGemini(aiPrompt);
    setAiResult(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-zinc-900 text-zinc-200 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Word Pilot</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 bg-zinc-800 rounded-3xl p-2">
        {["create", "upload", "ai"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-3xl capitalize transition ${
              activeTab === tab
                ? "bg-zinc-700 text-white"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {tab === "create" && "Create Document"}
            {tab === "upload" && "Upload & Edit"}
            {tab === "ai" && "AI Write"}
          </button>
        ))}
      </div>

      {/* CREATE DOCUMENT */}
      {activeTab === "create" && (
        <div className="w-full max-w-3xl bg-zinc-800 p-6 rounded-2xl shadow-lg space-y-4">
          <input
            type="text"
            placeholder="Enter Document Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-700 text-zinc-100 outline-none"
          />
          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className="w-full p-3 rounded-lg bg-zinc-700 text-zinc-100 outline-none resize-none"
          ></textarea>
          <button
            onClick={() => handleSaveDoc(`${title}\n\n${content}`)}
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-3xl transition"
          >
            Save as Word File
          </button>
        </div>
      )}

      {/* UPLOAD & EDIT */}
      {activeTab === "upload" && (
        <div className="w-full max-w-3xl bg-zinc-800 p-6 rounded-2xl shadow-lg space-y-4">
          <input
            type="file"
            accept=".docx"
            onChange={handleFileUpload}
            className="w-full p-2 text-sm text-zinc-300"
          />
          <textarea
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            rows="10"
            placeholder="Uploaded document text will appear here..."
            className="w-full p-3 rounded-lg bg-zinc-700 text-zinc-100 outline-none resize-none"
          ></textarea>
          <button
            onClick={() => handleSaveDoc(fileContent)}
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-3xl transition"
          >
            Save Changes as Word File
          </button>
        </div>
      )}

      {/* AI WRITE */}
      {activeTab === "ai" && (
        <div className="w-full max-w-3xl bg-zinc-800 p-6 rounded-2xl shadow-lg space-y-4">
          <form onSubmit={handleAIGenerate} className="space-y-4">
            <textarea
              placeholder="Enter a topic or idea (e.g., Write a story about AI in education)"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows="5"
              className="w-full p-3 rounded-lg bg-zinc-700 text-zinc-100 outline-none resize-none"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-3xl transition"
            >
              {loading ? "Generating..." : "Generate with AI"}
            </button>
          </form>

          {aiResult && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">AI Generated Text:</h2>
              <div className="p-3 bg-zinc-700 rounded-xl text-zinc-100 whitespace-pre-wrap">
                {aiResult}
              </div>
              <button
                onClick={() => handleSaveDoc(aiResult)}
                className="mt-3 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-3xl transition"
              >
                Download as Word
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}