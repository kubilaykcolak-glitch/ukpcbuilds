"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterForm() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="text-4xl" aria-hidden="true">✅</div>
        <p className="text-white font-semibold text-lg">You&apos;re on the list!</p>
        <p className="text-[#94A3B8] text-sm">
          We&apos;ll send your first build update next month.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setError(""); }}
        placeholder="you@example.com"
        required
        className="flex-1 bg-[#1E293B] border border-[#334155] text-white placeholder-[#94A3B8] text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#2563EB] transition-colors"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-500 transition-colors text-white font-semibold text-sm px-6 py-3 rounded-lg whitespace-nowrap"
      >
        <Send className="w-4 h-4" aria-hidden="true" />
        Subscribe
      </button>
      {error && (
        <p role="alert" className="text-red-400 text-xs mt-1 sm:col-span-2">
          {error}
        </p>
      )}
    </form>
  );
}
