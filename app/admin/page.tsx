import { createClient } from "@/lib/supabase/server";
import LeadsTable from "@/components/admin/LeadsTable";
import { Users, TrendingUp, Calendar, Sparkles, PhoneCall, CheckCircle2, ShieldAlert } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import type { Lead } from "@/types/lead";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard — Glamour Glow" };
export const dynamic = "force-dynamic";

/* ── Helpers ──────────────────────────────────────────────── */
function dayLabel(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString("en-IN", { weekday: "short" });
}

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Failed to fetch leads:", error);

  const allLeads: Lead[] = leads ?? [];

  /* ── Core stats ─────────────────────────────────────────── */
  const totalLeads  = allLeads.length;
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentLeads  = allLeads.filter((l) => new Date(l.created_at) >= sevenDaysAgo).length;
  const latestLead   = allLeads[0];

  /* ── Status breakdown ───────────────────────────────────── */
  const statusMap = allLeads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status ?? "new"] = (acc[l.status ?? "new"] ?? 0) + 1;
    return acc;
  }, {});

  /* ── 7-day daily chart data ─────────────────────────────── */
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const dayStart = new Date();
    dayStart.setDate(dayStart.getDate() - (6 - i));
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);

    const count = allLeads.filter((l) => {
      const d = new Date(l.created_at);
      return d >= dayStart && d <= dayEnd;
    }).length;

    return { label: dayLabel(6 - i), count };
  });
  const maxChart = Math.max(...chartData.map((d) => d.count), 1);

  /* ── Stat cards ─────────────────────────────────────────── */
  const STATS = [
    { icon: Users,        label: "Total Leads",  value: totalLeads,                            color: "text-rose-500",    bg: "bg-rose-50",    border: "border-rose-100" },
    { icon: TrendingUp,   label: "Last 7 Days",  value: recentLeads,                           color: "text-violet-500",  bg: "bg-violet-50",  border: "border-violet-100" },
    { icon: Sparkles,     label: "New",          value: statusMap["new"]       ?? 0,           color: "text-sky-500",     bg: "bg-sky-50",     border: "border-sky-100" },
    { icon: PhoneCall,    label: "Contacted",    value: statusMap["contacted"] ?? 0,           color: "text-amber-500",   bg: "bg-amber-50",   border: "border-amber-100" },
    { icon: CheckCircle2, label: "Converted",    value: statusMap["converted"] ?? 0,           color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
    { icon: ShieldAlert,  label: "Spam",         value: statusMap["spam"]      ?? 0,           color: "text-red-400",     bg: "bg-red-50",     border: "border-red-100" },
    { icon: Calendar,     label: "Latest Lead",  value: latestLead ? formatDate(latestLead.created_at) : "—", color: "text-stone-500", bg: "bg-stone-50", border: "border-stone-100", isText: true },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-stone-800 mb-1">
          Leads Dashboard
        </h1>
        <p className="text-stone-400 text-sm">
          View and manage all inbound leads from your landing page.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`card p-4 border ${stat.border} animate-fade-in-up hover:shadow-md transition-shadow`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <span className={`${stat.bg} ${stat.color} p-2 rounded-lg inline-flex mb-3`}>
              <stat.icon className="w-4 h-4" />
            </span>
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider leading-tight">
              {stat.label}
            </p>
            <p className={`font-bold mt-1 text-stone-800 ${stat.isText ? "text-base" : "text-2xl"}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* 7-Day Leads Chart */}
      {totalLeads > 0 && (
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wider mb-5">
            Leads — Last 7 Days
          </h2>
          <div className="flex items-end gap-3 h-28">
            {chartData.map((d) => {
              const heightPct = maxChart === 0 ? 4 : Math.max((d.count / maxChart) * 100, d.count > 0 ? 8 : 4);
              return (
                <div key={d.label} className="flex flex-col items-center gap-2 flex-1 group">
                  <span className="text-xs font-bold text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.count}
                  </span>
                  <div
                    className="w-full rounded-t-lg gradient-brand transition-all duration-500 cursor-default"
                    style={{ height: `${heightPct}%`, opacity: d.count === 0 ? 0.15 : 1 }}
                    title={`${d.label}: ${d.count} lead${d.count !== 1 ? "s" : ""}`}
                  />
                  <span className="text-xs text-stone-400">{d.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leads table */}
      <LeadsTable initialLeads={allLeads} />
    </div>
  );
}
