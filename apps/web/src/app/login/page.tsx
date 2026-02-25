"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isForgotSent, setIsForgotSent] = React.useState(false);

  // Strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length === 0) return 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthText = ["None", "Very Weak", "Weak", "Medium", "Strong", "Great"][strength];
  const isPassStrongEnough = strength >= 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !isPassStrongEnough) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1200);
  };

  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      router.push("/dashboard");
    }, 1000);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }
    setIsForgotSent(true);
    setTimeout(() => setIsForgotSent(false), 5000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAFBFC] text-[#0A0A0A]">
      {/* soft “white shine” glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white blur-3xl opacity-80" />
        <div className="absolute top-40 left-[10%] h-[360px] w-[360px] rounded-full bg-white blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-[5%] h-[420px] w-[420px] rounded-full bg-white blur-3xl opacity-50" />
      </div>

      {/* subtle grid texture (very premium) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(229,231,235,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(229,231,235,0.55) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl border border-[#E6E8EB] bg-white/90 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur">
            {/* Brand mark */}
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#E6E8EB] bg-white shadow-sm">
                <Shield className="w-5 h-5 text-[#8B0000]" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wide uppercase">Omen Protocol</div>
                <div className="text-xs text-[#6B7280]">Secure access to the Trust Layer</div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back<span className="text-[#8B0000]">.</span>
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              Sign in to view partner trust indexes and SDK integration status.
            </p>

            {isForgotSent && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-50 border border-green-100 text-green-800 text-sm rounded-xl text-center"
              >
                <p className="font-bold mb-1 uppercase tracking-widest text-[10px]">Recovery Email Sent</p>
                <p className="text-[11px]">Check your inbox at <strong>{email}</strong>.</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#E6E8EB] bg-white px-4 text-sm outline-none transition
                             focus:border-[#8B0000]/50 focus:ring-4 focus:ring-[#8B0000]/10"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-medium text-[#8B0000] hover:opacity-80 transition-opacity uppercase tracking-widest"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#E6E8EB] bg-white px-4 text-sm outline-none transition
                             focus:border-[#8B0000]/50 focus:ring-4 focus:ring-[#8B0000]/10"
                />

                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2 pt-1 overflow-hidden"
                  >
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-[#6B7280]">Security Strength</span>
                      <span className={strength < 3 ? "text-red-600" : "text-green-600"}>
                        {strengthText}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-[#E6E8EB] flex gap-1 rounded-full overflow-hidden">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div 
                          key={i}
                          className={`h-full flex-1 transition-all duration-500 ${
                            i <= strength 
                              ? (strength < 3 ? "bg-red-500" : "bg-[#0A0A0A]") 
                              : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Primary button */}
              <motion.button
                type="submit"
                disabled={isLoading || !email || !isPassStrongEnough || socialLoading !== null}
                whileHover={!isLoading && email && isPassStrongEnough ? { y: -1 } : {}}
                whileTap={!isLoading && email && isPassStrongEnough ? { scale: 0.99 } : {}}
                className={`group relative flex h-11 w-full items-center justify-center rounded-xl bg-[#0A0A0A] text-sm font-semibold text-white
                           shadow-[0_10px_20px_rgba(0,0,0,0.10)] transition hover:opacity-[0.92] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <span className="h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <>
                    Sign in
                    <span className="ml-2 inline-block transition group-hover:translate-x-0.5">→</span>
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="h-px w-full bg-[#E6E8EB]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                  or continue with
                </div>
              </div>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoading || socialLoading !== null}
                  onClick={() => handleSocialLogin("github")}
                  className="flex items-center justify-center h-11 rounded-xl border border-[#E6E8EB] bg-white text-sm font-medium transition hover:bg-[#FAFBFC] disabled:opacity-50"
                >
                  {socialLoading === "github" ? (
                    <span className="h-4 w-4 animate-spin border-2 border-black border-t-transparent rounded-full" />
                  ) : "GitHub"}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoading || socialLoading !== null}
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center h-11 rounded-xl border border-[#E6E8EB] bg-white text-sm font-medium transition hover:bg-[#FAFBFC] disabled:opacity-50"
                >
                  {socialLoading === "google" ? (
                    <span className="h-4 w-4 animate-spin border-2 border-black border-t-transparent rounded-full" />
                  ) : "Google"}
                </motion.button>
              </div>

              <p className="pt-2 text-center text-sm text-[#6B7280]">
                Don’t have access?{" "}
                <Link href="/alpha" className="font-semibold text-[#0A0A0A] hover:underline transition-all">
                  Join the Private Alpha
                </Link>
                <span className="text-[#8B0000]">.</span>
              </p>
            </form>
          </div>

          {/* tiny footer */}
          <p className="mt-6 text-center text-xs text-[#6B7280]">
            Omen Labs • Infrastructure-grade trust verification
          </p>
        </motion.div>
      </div>
    </div>
  );
}
