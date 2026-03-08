"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

interface EarlyAccessFormProps {
  layout?: "hero" | "bottom";
}

export function EarlyAccessForm({ layout = "hero" }: EarlyAccessFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email format.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setStatus("success");
        setEmail(""); // clean input on success
      } else {
        throw new Error("Unable to submit. Please try again later.");
      }
    } catch (err: any) {
      console.error("Netlify Form Error:", err);
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  /* ── Success state ─────────────────────────────────────────────── */
  if (status === "success") {
    return (
      <div className="flex justify-center items-center py-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-xl w-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-10 text-center"
        >
          {/* glow border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 blur-xl pointer-events-none"></div>

          {/* icon */}
          <div className="relative flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* headline */}
          <h2 className="text-3xl font-semibold text-white tracking-tight">
            You’re on the list
          </h2>

          {/* description */}
          <p className="text-white/70 mt-3 text-lg">
            Early access updates will reach your inbox first.
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── Form ──────────────────────────────────────────────────────── */
  return (
    <form 
      name="early-access" 
      method="POST" 
      data-netlify="true" 
      onSubmit={handleSubmit} 
      className="relative w-full" 
      noValidate
    >
      <input type="hidden" name="form-name" value="early-access" />
      
      {/* Honeypot — completely hidden from users, Netlify standard is typically bot-field */}
      <input
        type="text"
        name="bot-field"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex flex-col md:flex-row gap-2">
        {/* Email Input */}
        <input
          id="waitlist-email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
             setEmail(e.target.value);
             if (status === "error") setStatus("idle");
          }}
          required
          disabled={status === "submitting"}
          className={[
            "omen-input flex-1",
            status === "error" ? "border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/10" : "",
          ].join(" ")}
          aria-label="Email address"
        />

        {/* Submit */}
        <Button
          type="submit"
          isLoading={status === "submitting"}
          size="lg"
          className="shrink-0 md:w-auto w-full"
        >
          {status === "submitting" ? "Joining…" : "Request Access"}
        </Button>
      </div>

      {/* Inline Validation / Error Message */}
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-xs font-medium text-[#FF3B30]"
            role="alert"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      {/* SDK Documentation — secondary text link */}
      <div className="mt-4 flex items-center gap-4 px-1">
        <a
          href="/docs"
          className="text-[11px] font-semibold uppercase tracking-widest text-[#5B6B82] hover:text-[#2B5C92] transition-colors duration-200 underline decoration-black/10 underline-offset-4 hover:decoration-[#2B5C92]/40"
        >
          SDK Documentation
        </a>
      </div>
    </form>
  );
}
