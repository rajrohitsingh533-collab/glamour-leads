"use client";

import { useState, useTransition } from "react";
import { signIn } from "./actions";
import {
  Sparkles,
  Loader2,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
} from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="p-2 rounded-xl gradient-brand">
              <Sparkles className="w-5 h-5 text-white" />
            </span>
            <span className="font-display text-2xl font-bold text-gradient-brand">
              Glamour Glow
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-stone-800 mb-2">
            Admin Portal
          </h1>
          <p className="text-stone-500 text-sm">Sign in to manage your leads</p>
        </div>

        {/* Card */}
        <div
          className="card p-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <form
            id="login-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="form-label">
                Email Address
              </label>
              <div className="input-group">
                <span className="input-icon-zone">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@glamourglow.com"
                  className="form-input"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              {/* Password needs the eye-toggle button on the right */}
              <div className="input-group">
                <span className="input-icon-zone">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="form-input"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.75rem",
                    minWidth: "2.75rem",
                    alignSelf: "stretch",
                    background: "#fafaf9",
                    borderLeft: "1.5px solid var(--border)",
                    color: "#a8a29e",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#44403c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#a8a29e")
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 animate-fade-in">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={isPending}
              className="btn-primary w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          Admin access only. Not a team member?{" "}
          <a href="/" className="text-rose-400 hover:underline">
            Visit site
          </a>
        </p>
      </div>
    </div>
  );
}
