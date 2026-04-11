"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  CheckCircle,
  Loader2,
  Phone,
  Mail,
  User,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { leadSchema, type LeadFormValues } from "@/types/lead";

type Status = "idle" | "submitting" | "success" | "error" | "duplicate" | "rate-limited";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormValues) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      const json = await res.json();

      if (res.status === 409) {
        // Duplicate email
        setStatus("duplicate");
        return;
      }

      if (res.status === 429) {
        // Rate limited
        setStatus("rate-limited");
        setErrorMessage(json.error ?? "Too many submissions. Please wait a few minutes.");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  /* ── Success State ──────────────────────────────────────── */
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center animate-fade-in-up">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center animate-bounce-in">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="font-display text-2xl font-bold text-stone-800">
          You&apos;re on the list! 🎉
        </h3>
        <p className="text-stone-500 max-w-sm">
          Thank you for your interest. Our beauty consultant will reach out
          within 24 hours with your exclusive offer.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-secondary text-sm mt-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  /* ── Duplicate State ────────────────────────────────────── */
  if (status === "duplicate") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-amber-500" />
        </div>
        <h3 className="font-display text-xl font-bold text-stone-800">
          Already Received! 🌸
        </h3>
        <p className="text-stone-500 max-w-sm text-sm">
          We already have your information on file from the last 24 hours.
          Our team will reach out to you very soon — please check your inbox!
        </p>
        <button onClick={() => setStatus("idle")} className="btn-secondary text-sm mt-1">
          Use a different email
        </button>
      </div>
    );
  }

  /* ── Form ───────────────────────────────────────────────── */
  return (
    <form
      ref={formRef}
      id="lead-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Name */}
      <div>
        <label htmlFor="lead-name" className="form-label">
          Full Name <span className="text-rose-400">*</span>
        </label>
        <div className={`input-group ${errors.name ? "error" : ""}`}>
          <span className="input-icon-zone">
            <User className="w-4 h-4" />
          </span>
          <input
            id="lead-name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            {...register("name")}
            className="form-input"
          />
        </div>
        {errors.name && <p className="form-error">{errors.name.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="lead-phone" className="form-label">
          Phone Number <span className="text-rose-400">*</span>
        </label>
        <div className={`input-group ${errors.phone ? "error" : ""}`}>
          <span className="input-icon-zone">
            <Phone className="w-4 h-4" />
          </span>
          <input
            id="lead-phone"
            type="tel"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            {...register("phone")}
            className="form-input"
          />
        </div>
        {errors.phone && <p className="form-error">{errors.phone.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="lead-email" className="form-label">
          Email Address <span className="text-rose-400">*</span>
        </label>
        <div className={`input-group ${errors.email ? "error" : ""}`}>
          <span className="input-icon-zone">
            <Mail className="w-4 h-4" />
          </span>
          <input
            id="lead-email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            {...register("email")}
            className="form-input"
          />
        </div>
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      {/* Skin Type */}
      <div>
        <label htmlFor="skin-type" className="form-label">
          Your Skin Type <span className="text-stone-400 font-normal text-xs">(optional)</span>
        </label>
        <div className={`input-group ${errors.skin_type ? "error" : ""}`}>
          <select
            id="skin-type"
            {...register("skin_type")}
            className="form-input appearance-none bg-white cursor-pointer"
          >
            <option value="">Select your skin type...</option>
            <option value="dry">Dry</option>
            <option value="oily">Oily</option>
            <option value="combination">Combination</option>
            <option value="normal">Normal</option>
            <option value="sensitive">Sensitive</option>
          </select>
        </div>
        {errors.skin_type && <p className="form-error">{errors.skin_type.message}</p>}
      </div>

      {/* Skin Concern */}
      <div>
        <label htmlFor="skin-concern" className="form-label">
          Primary Skin Concern <span className="text-stone-400 font-normal text-xs">(optional)</span>
        </label>
        <div className={`input-group ${errors.skin_concern ? "error" : ""}`}>
          <select
            id="skin-concern"
            {...register("skin_concern")}
            className="form-input appearance-none bg-white cursor-pointer"
          >
            <option value="">Select primary concern...</option>
            <option value="acne">Acne & Blemishes</option>
            <option value="aging">Fine Lines & Aging</option>
            <option value="pigmentation">Pigmentation & Dark Spots</option>
            <option value="dryness">Dryness & Flaking</option>
            <option value="dullness">Dullness & Uneven Texture</option>
          </select>
        </div>
        {errors.skin_concern && <p className="form-error">{errors.skin_concern.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="lead-message" className="form-label">
          What are you interested in?{" "}
          <span className="text-stone-400 font-normal text-xs">(optional)</span>
        </label>
        <div className={`input-group ${errors.message ? "error" : ""}`}>
          <span className="input-icon-zone">
            <MessageSquare className="w-4 h-4" />
          </span>
          <textarea
            id="lead-message"
            rows={3}
            placeholder="I'm looking for a brightening serum, moisturizer for dry skin..."
            {...register("message")}
            className="form-input"
          />
        </div>
        {errors.message && <p className="form-error">{errors.message.message}</p>}
      </div>

      {/* Error / rate-limited banners */}
      {(status === "error" || status === "rate-limited") && (
        <div className={`p-3 rounded-xl border text-sm animate-fade-in flex items-start gap-2 ${
          status === "rate-limited"
            ? "bg-amber-50 border-amber-200 text-amber-700"
            : "bg-red-50 border-red-200 text-red-600"
        }`}>
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <button
        id="lead-form-submit"
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full mt-1"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Get My Free Sample
          </>
        )}
      </button>

      <p className="text-xs text-stone-400 text-center">
        By submitting, you agree to receive beauty tips and offers from Glamour
        Glow. No spam, ever.
      </p>
    </form>
  );
}
