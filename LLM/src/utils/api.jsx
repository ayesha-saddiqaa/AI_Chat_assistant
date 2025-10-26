export async function sendToGemini(prompt) {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  const override = localStorage.getItem("GEMINI_KEY_OVERRIDE");
  const API_KEY = override || envKey;

  if (!API_KEY) {
    return "Missing API key. Add VITE_GEMINI_API_KEY in .env or set one in Settings.";
  }

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await res.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from model."
    );
  } catch (e) {
    console.error(e);
    return "Network or API error.";
  }
}