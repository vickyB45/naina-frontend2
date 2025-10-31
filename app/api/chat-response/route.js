import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log(req.json())
    if (!message)
      return NextResponse.json({ error: "Message Required" }, { status: 400 });

    const API_KEY = process.env.GEMINI_API_KEY;

    // ✅ First, let's see what models are available
    const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
    const listResponse = await fetch(listUrl);
    const models = await listResponse.json();
    

    // ✅ Try with the first available model
    if (models.models && models.models.length > 0) {
      const availableModel = models.models[0].name; // e.g., "models/gemini-pro"

      const url = `https://generativelanguage.googleapis.com/v1/${availableModel}:generateContent?key=${API_KEY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          { error: data.error?.message || "API Error" },
          { status: response.status }
        );
      }

      const reply = data.candidates[0].content.parts[0].text;
      return NextResponse.json({ reply });
    } else {
      return NextResponse.json(
        { error: "No models available for this API key", models },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Full error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}