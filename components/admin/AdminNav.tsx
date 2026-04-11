"use client";

import { useState, useTransition } from "react";
import { signOut } from "@/app/login/actions";
import { Sparkles, LogOut, Loader2, LayoutDashboard } from "lucide-react";

interface AdminNavProps {
  userEmail: string | undefined;
  totalLeads: number;
}

export default function AdminNav({ userEmail, totalLeads }: AdminNavProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left — logo + title */}
        <div className="flex items-center gap-3">
          <span className="p-1.5 rounded-lg gradient-brand">
            <Sparkles className="w-4 h-4 text-white" />
          </span>
          <div>
            <span className="font-display font-bold text-stone-800 text-lg leading-none">
              Glamour Glow
            </span>
            <span className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
              <LayoutDashboard className="w-3 h-3" /> Admin Dashboard
            </span>
          </div>

          {/* Leads badge */}
          <span className="hidden sm:inline-flex ml-4 items-center gap-1.5 bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full border border-rose-100">
            {totalLeads} leads
          </span>
        </div>

        {/* Right — user info + logout */}
        <div className="flex items-center gap-3">
          {userEmail && (
            <span className="hidden sm:block text-sm text-stone-500">
              {userEmail}
            </span>
          )}
          <button
            id="admin-signout-btn"
            onClick={handleSignOut}
            disabled={isPending}
            className="btn-ghost text-sm"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
