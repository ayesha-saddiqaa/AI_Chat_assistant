import React, { useState, useEffect, useRef } from "react";
import { sendToGemini } from "../../utils/api";

export default function NewChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;

    const newMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    const response = await sendToGemini(prompt);
    const botMessage = { role: "bot", text: response };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  // Auto scroll when new message added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-zinc-900 text-zinc-200 items-center">
      {/* Chat Messages */}
      <div
        className="flex-1 w-full max-w-3xl px-6 py-8 overflow-y-auto space-y-4 pb-40"
      >
        
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[75%] ${
                msg.role === "user"
                  ? "bg-zinc-700 text-zinc-100 rounded-br-none"
                  : "bg-zinc-800 text-zinc-200 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="p-3 bg-zinc-800 rounded-2xl rounded-bl-none text-zinc-400 animate-pulse">
              Thinking...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="w-full max-w-3xl p-4 bg-zinc-900 fixed bottom-0">
        <form
          onSubmit={handleSend}
          className="flex gap-2 p-3 bg-zinc-800 rounded-3xl shadow-lg"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Anything..."
            className="flex-1 bg-zinc-700 text-zinc-100 rounded-3xl p-2 resize-none focus:outline-none"
            rows={1}
          />
          <button
            type="submit"
            className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded-3xl transition"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}