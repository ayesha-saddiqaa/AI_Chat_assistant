import React, { useState, useEffect, useRef } from "react";
import { sendToGemini } from "../../utils/api";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

export default function NewChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Real-time listener (fetch chat history)
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "chats"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt || !auth.currentUser) return;

    setInput("");
    setLoading(true);

    const userId = auth.currentUser.uid;

    //  Save user message to Firestore
    await addDoc(collection(db, "users", userId, "chats"), {
      role: "user",
      text: prompt,
      createdAt: serverTimestamp(),
    });

    try {
      // Get bot response from Gemini
      const response = await sendToGemini(prompt);

      // Save bot message to Firestore
      await addDoc(collection(db, "users", userId, "chats"), {
        role: "bot",
        text: response,
        createdAt: serverTimestamp(),
      });

      //Update local messages
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
    } catch (error) {
      console.error("Error in sending or saving chat:", error);
    }

    setLoading(false);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-zinc-900 text-zinc-200 items-center">
      {/* Chat Messages */}
      <div className="flex-1 w-full max-w-3xl px-6 py-8 overflow-y-auto space-y-4 pb-40">
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
            <div className="p-3 bg-zinc-800 rounded-2xl text-zinc-400 animate-pulse">
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