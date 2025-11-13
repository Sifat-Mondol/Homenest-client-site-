// src/ui-components/LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-64 space-y-4">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-[var(--text-secondary)] font-semibold animate-pulse">
        Loading...
      </p>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
 }