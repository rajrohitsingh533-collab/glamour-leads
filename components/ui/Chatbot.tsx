"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! ✨ I'm your Glamour Glow assistant. How can I help you achieve radiant skin today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");

    // Add user message
    const newMessages = [
      ...messages,
      { id: Date.now(), text: userText, sender: "user" as const },
    ];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      
      setMessages([
        ...newMessages,
        { id: Date.now() + 1, text: data.response, sender: "bot" },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { id: Date.now() + 1, text: "Oops! My connection dropped. Please try again.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600 transition-all hover:-translate-y-1 z-50 ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right z-50 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
        style={{ height: "500px", maxHeight: "80vh" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-400 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold font-display">Glow Assistant</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-rose-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-stone-50 flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.sender === "user"
                    ? "bg-rose-500 text-white rounded-br-sm"
                    : "bg-white border border-rose-100 text-stone-700 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-rose-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
                <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-3 bg-white border-t border-rose-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our products..."
              className="flex-1 bg-stone-100 border-transparent rounded-full px-4 py-2 text-sm focus:border-rose-300 focus:ring-rose-300 focus:bg-white transition-colors outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-full bg-rose-500 text-white disabled:opacity-50 disabled:bg-rose-300 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
