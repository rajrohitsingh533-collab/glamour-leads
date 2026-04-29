import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are the Glamour Glow Customer Support Chatbot.
Your goal is to answer customer questions about Glamour Glow cosmetics, skincare routines, and ingredients.
Keep responses very concise, friendly, and luxurious. Limit responses to 2-3 short sentences.
If a customer asks about buying or consulting, encourage them to fill out the "Get a Free Sample" or lead form on the website.
Do not invent fake product names; refer generally to our botanical extracts, serums, and hydrating creams.`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        response: "Hi there! I am currently taking a beauty nap (API Key missing). Please check back later!"
      });
    }

    const { message, history } = await req.json();

    // Convert history format if needed, but for simplicity, we will just pass the latest message and context
    // In a real scenario, we could use the Chat sessions feature, but a single prompt with system instruction is fine here.
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return NextResponse.json({ response: response.text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { response: "I'm sorry, I'm having trouble connecting to my beauty database right now!" },
      { status: 500 }
    );
  }
}
