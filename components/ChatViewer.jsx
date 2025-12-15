"use client";

import React, { useState } from "react";
import { Search, User, Bot, Package, Clock, Filter, Download, ChevronDown, MessageSquare, ShoppingBag } from "lucide-react";

export default function ChatViewer({ messages = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = msg.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "products" && msg.products?.length > 0) ||
      (selectedFilter === "user" && msg.role === "user") ||
      (selectedFilter === "assistant" && msg.role === "assistant");
    return matchesSearch && matchesFilter;
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  };

  const totalProducts = messages.reduce((acc, msg) => acc + (msg.products?.length || 0), 0);
  const userMessages = messages.filter(m => m.role === "user").length;
  const assistantMessages = messages.filter(m => m.role === "assistant").length;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Chat Viewer
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Superadmin Dashboard - User Conversation Monitor
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium text-slate-700">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600 font-medium">Total Messages</p>
                  <p className="text-2xl font-bold text-blue-700">{messages.length}</p>
                </div>
                <MessageSquare className="text-blue-500" size={24} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-medium">User Messages</p>
                  <p className="text-2xl font-bold text-green-700">{userMessages}</p>
                </div>
                <User className="text-green-500" size={24} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-600 font-medium">AI Responses</p>
                  <p className="text-2xl font-bold text-purple-700">{assistantMessages}</p>
                </div>
                <Bot className="text-purple-500" size={24} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-orange-600 font-medium">Products Shown</p>
                  <p className="text-2xl font-bold text-orange-700">{totalProducts}</p>
                </div>
                <ShoppingBag className="text-orange-500" size={24} />
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === "all"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter("user")}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === "user"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                User
              </button>
              <button
                onClick={() => setSelectedFilter("assistant")}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === "assistant"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                AI
              </button>
              <button
                onClick={() => setSelectedFilter("products")}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === "products"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {filteredMessages.length === 0 && (
            <div className="text-center py-16">
              <MessageSquare className="mx-auto text-slate-300 mb-4" size={64} />
              <p className="text-slate-500 text-lg font-medium">No messages found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search query</p>
            </div>
          )}

          {filteredMessages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`flex gap-3 ${msg.role === "user" ? "" : "flex-row-reverse"}`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600"
                    : "bg-gradient-to-br from-purple-500 to-indigo-600"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={20} className="text-white" />
                ) : (
                  <Bot size={20} className="text-white" />
                )}
              </div>

              {/* Message Container */}
              <div className={`flex-1 max-w-2xl ${msg.role === "assistant" ? "items-end" : ""}`}>
                {/* Role Label */}
                <div className={`flex items-center gap-2 mb-1 ${msg.role === "assistant" ? "justify-end" : ""}`}>
                  <span className={`text-xs font-semibold ${
                    msg.role === "user" ? "text-blue-600" : "text-purple-600"
                  }`}>
                    {msg.role === "user" ? "User" : "AI Assistant"}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} />
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl shadow-sm px-5 py-3 ${
                    msg.role === "user"
                      ? "bg-white border border-slate-200 rounded-tl-sm"
                      : "bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-tr-sm"
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>

                  {/* Products Grid */}
                  {msg.products?.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {msg.products.map((product, i) => (
                        <div
                          key={product._id || i}
                          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-200"
                        >
                          {product.image && (
                            <div className="aspect-square bg-slate-100 overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-3">
                            <h3 className="font-semibold text-sm text-slate-800 line-clamp-2 mb-1">
                              {product.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-green-600">
                                ₹{product.price}
                              </span>
                              {product.compareAtPrice && product.compareAtPrice > product.price && (
                                <span className="text-xs text-slate-400 line-through">
                                  ₹{product.compareAtPrice}
                                </span>
                              )}
                            </div>
                            {product.inStock !== undefined && (
                              <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                                product.inStock
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}