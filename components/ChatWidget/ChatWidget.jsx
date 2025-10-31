"use client";
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Brain,
  Code,
  X,
  MessageCircle,
  ChevronDown,
  Check,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageBubble } from "./MessageBubble";

const AI_PROVIDERS = {
  openai: {
    name: "OpenAI",
    models: ["GPT-4 Turbo", "GPT-4", "GPT-3.5"],
    color: "#10A37F",
    icon: Brain,
  },
  claude: {
    name: "Claude",
    models: ["Opus", "Sonnet", "Haiku"],
    color: "#E49B0F",
    icon: Sparkles,
  },
  google: {
    name: "Google Gemini",
    models: [
      "Gemini Ultra",
      "Gemini 2.5 Pro",
      "Gemini 2.0 Flash-Lite",
      "Gemini Nano",
    ],
    color: "#4285F4",
    icon: Zap,
  },
  copilot: {
    name: "Copilot",
    models: ["GPT-4", "GPT-3.5"],
    color: "#9333EA",
    icon: Code,
  },
  cohere: {
    name: "Cohere",
    models: ["Command R", "Rerank Light", "Embed Light", "Command Light"],
    color: "#F97316",
    icon: Brain,
  },
  mistral: {
    name: "Mistral AI",
    models: [
      "Mistral Large 2",
      "Mistral Mixtral 8×22B",
      "Mistral 7B",
      "Mistral Large 1",
    ],
    color: "#00B8A9",
    icon: Brain,
  },
  meta: {
    name: "Meta LLaMA",
    models: [
      "LLaMA 4 Maverick",
      "LLaMA 4 Scout",
      "LLaMA 3.1 405B",
      "LLaMA 3 70B",
    ],
    color: "#0866FF",
    icon: Code,
  },
  anthropic: {
    name: "Anthropic",
    models: [
      "Claude 4 Opus",
      "Claude 4 Sonnet",
      "Claude 3.7 Sonnet",
      "Claude 3.5 Haiku",
    ],
    color: "#E24329",
    icon: Sparkles,
  },
};

const chatSchema = z.object({
  message: z.string().min(1, "Message required"),
});

// =============== MAIN CHAT COMPONENT ==================
export default function AIChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState("openai");
  const [selectedModel, setSelectedModel] = useState(
    AI_PROVIDERS.openai.models[0]
  );
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipHovered, setTooltipHovered] = useState(false);
  const [showAIDropdown, setShowAIDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [hasShownFirstMessage, setHasShownFirstMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const aiDropdownRef = useRef(null);
  const modelDropdownRef = useRef(null);

  const { register, handleSubmit, setValue, formState } = useForm({
    resolver: zodResolver(chatSchema),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  // Stage B: First AI message when chat opens
  useEffect(() => {
    if (isOpen && !hasShownFirstMessage && messages.length === 0) {
      setIsTyping(true);

      const firstMessages = [
        "You've got great timing 👀 want me to show what's trending this week?",
        "Choosing is hard 😅 want a 10-sec shortcut?",
        "Hey! Looking for something special? I can help you find it faster 💫",
        "Perfect timing! Need help finding the right pick? 🎯"
      ];

      const randomMessage = firstMessages[Math.floor(Math.random() * firstMessages.length)];
      const delay = 1200 + Math.random() * 600; // 1.2-1.8s

      setTimeout(() => {
        setIsTyping(false);
        setMessages([{
          text: randomMessage,
          role: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }]);
        setHasShownFirstMessage(true);
      }, delay);
    }
  }, [isOpen, hasShownFirstMessage, messages.length]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (aiDropdownRef.current && !aiDropdownRef.current.contains(e.target)) {
        setShowAIDropdown(false);
      }
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(e.target)
      ) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      return;
    }

    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      if (!tooltipHovered) setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen, tooltipHovered]);

  const onSubmit = (data) => {
    const text = typeof data.message === "string" ? data.message.trim() : "";
    if (!text) return;

    const chatData = {
      message: text,
      ai: AI_PROVIDERS[selectedAI].name,
      model: selectedModel,
      timestamp: new Date().toISOString(),
    };

    console.log("═══════════════════════════════");
    console.log("📤 NEW MESSAGE");
    console.log("═══════════════════════════════");
    console.log("💬 Message:", text);
    console.log("🤖 AI:", AI_PROVIDERS[selectedAI].name);
    console.log("⚙️  Model:", selectedModel);
    console.log("📊 Data:", chatData);
    console.log("═══════════════════════════════\n");

    setMessages((prev) => [
      ...prev,
      {
        text,
        role: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setIsTyping(true);
    setValue("message", "");

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: `Hi! I'm ${AI_PROVIDERS[selectedAI].name} using ${selectedModel}. How can I help you today?`,
          role: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1200);
  };

  const CurrentIcon = AI_PROVIDERS[selectedAI].icon;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.45 }}
            onMouseEnter={() => setTooltipHovered(true)}
            onMouseLeave={() => {
              setTooltipHovered(false);
              setTimeout(() => setShowTooltip(true), 1500);
            }}
            className="absolute bottom-20 right-0 md:right-2 px-4 py-3 
                 bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 
                 text-white rounded-3xl shadow-2xl z-[65] w-[280px]"
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <div className="w-full flex items-center justify-between px-4"><span className="font-semibold text-[15px]">Hey there 👋 </span>
                 </div>

              <span className="text-sm text-blue-100 leading-snug">
                Looking for yourself or a gift? I can make it easy.
              </span>
            </div>

            {/* Tooltip Arrow */}
            <div className="absolute top-full right-10 sm:right-8 w-0 h-0 
                      border-l-8 border-r-8 border-t-8 border-transparent 
                      border-t-blue-500" />
          </motion.div>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[60]"
            initial={false}
            animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <motion.button
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
                setTooltipHovered(false);
              }}
              aria-label="Open chat"
              className="relative p-4 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 
               shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] 
               transition-all duration-300 ease-out"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-sky-400/40 blur-xl"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Outer faint ring for subtle constant glow */}
              <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-md"></div>

              {/* Icon */}
              <MessageCircle className="w-6 h-6 relative z-10 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            </motion.button>
          </motion.div>

        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-80 sm:w-96"
          >
            <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex flex-col h-[500px]">
              <div
                className="flex-shrink-0 px-5 py-4"
                style={{
                  background: `linear-gradient(135deg, ${AI_PROVIDERS[selectedAI].color}, ${AI_PROVIDERS[selectedAI].color}dd)`,
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <CurrentIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-white font-semibold text-base">
                        {AI_PROVIDERS[selectedAI].name}
                      </h1>
                      <p className="text-white/80 text-xs">
                        Online • AI Assistant
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5 bg-gray-50 dark:bg-zinc-900 space-y-4">
                {messages.length === 0 && !isTyping ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: AI_PROVIDERS[selectedAI].color,
                      }}
                    >
                      <CurrentIcon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Hi 👋 I'm {AI_PROVIDERS[selectedAI].name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Your AI assistant
                    </p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <MessageBubble
                      key={idx}
                      role={msg.role}
                      text={msg.text}
                      timestamp={msg.timestamp}
                      aiColor={AI_PROVIDERS[selectedAI].color}
                      AiIcon={CurrentIcon}
                    />
                  ))
                )}

                {isTyping && (
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: AI_PROVIDERS[selectedAI].color,
                      }}
                    >
                      <CurrentIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="inline-block bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                            className="w-1 h-1 rounded-full"
                            style={{
                              backgroundColor: AI_PROVIDERS[selectedAI].color,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2 p-3 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div ref={aiDropdownRef} className="relative w-full">
                  <button
                    onClick={() => setShowAIDropdown(!showAIDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-sm border border-gray-200 dark:border-zinc-700"
                  >
                    <span className="truncate">
                      {AI_PROVIDERS[selectedAI].name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${showAIDropdown ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {showAIDropdown && (
                      <motion.ul
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute bottom-full mb-2 w-full z-50 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-xl overflow-hidden max-h-48 overflow-y-auto"
                      >
                        {Object.entries(AI_PROVIDERS).map(([key, value], i) => (
                          <motion.li
                            key={key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => {
                              setSelectedAI(key);
                              setSelectedModel(value.models[0]);
                              setShowAIDropdown(false);
                            }}
                            className={`px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm hover:bg-blue-50 dark:hover:bg-zinc-800 ${selectedAI === key
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300"
                              }`}
                          >
                            <span>{value.name}</span>
                            {selectedAI === key && (
                              <Check className="w-4 h-4" />
                            )}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                <div ref={modelDropdownRef} className="relative w-full">
                  <button
                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-sm border border-gray-200 dark:border-zinc-700"
                  >
                    <span className="truncate">{selectedModel}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${showModelDropdown ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {showModelDropdown && (
                      <motion.ul
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute bottom-full mb-2 w-full z-50 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-xl overflow-hidden max-h-48 overflow-y-auto"
                      >
                        {AI_PROVIDERS[selectedAI].models.map((model, i) => (
                          <motion.li
                            key={model}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => {
                              setSelectedModel(model);
                              setShowModelDropdown(false);
                            }}
                            className={`px-4 py-2.5 cursor-pointer flex items-center justify-between text-sm hover:bg-blue-50 dark:hover:bg-zinc-800 ${selectedModel === model
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300"
                              }`}
                          >
                            <span className="truncate">{model}</span>
                            {selectedModel === model && (
                              <Check className="w-4 h-4" />
                            )}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex-shrink-0 p-3 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex gap-2">
                  <input
                    autoFocus
                    {...register("message")}
                    placeholder="Type a message..."
                    disabled={isTyping}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(onSubmit)();
                      }
                    }}
                    className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none disabled:opacity-50"
                  />
                  <motion.button
                    whileHover={!isTyping ? { scale: 1.05 } : {}}
                    whileTap={!isTyping ? { scale: 0.95 } : {}}
                    onClick={handleSubmit(onSubmit)}
                    disabled={isTyping}
                    className="p-2.5 rounded-xl text-white shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: AI_PROVIDERS[selectedAI].color }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
                {formState.errors.message && (
                  <p className="text-red-500 text-xs mt-2">
                    {formState.errors.message.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}