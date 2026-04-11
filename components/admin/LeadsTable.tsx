"use client";

import { useState, useMemo, useTransition } from "react";
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Download,
  Search,
  Loader2,
  AlertCircle,
  CheckSquare,
  Square,
  RefreshCw,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/types/lead";
import { formatDateTime } from "@/utils/formatDate";
import { exportLeadsToCsv } from "@/utils/exportCsv";
import {
  deleteLead,
  bulkDeleteLeads,
  updateLeadStatus,
  bulkUpdateStatus,
} from "@/app/admin/actions";

/* ── Types ──────────────────────────────────────────────────── */
type SortKey = keyof Pick<Lead, "name" | "email" | "created_at" | "status">;
type SortDir = "asc" | "desc";
type DateFilter = "all" | "today" | "week";

/* ── Status helpers ─────────────────────────────────────────── */
const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string; bg: string }[] = [
  { value: "new",       label: "New",       color: "text-sky-700",     bg: "bg-sky-50 border-sky-200" },
  { value: "contacted", label: "Contacted", color: "text-amber-700",   bg: "bg-amber-50 border-amber-200" },
  { value: "converted", label: "Converted", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  { value: "spam",      label: "Spam",      color: "text-red-600",     bg: "bg-red-50 border-red-200" },
];

function statusMeta(s: LeadStatus) {
  return STATUS_OPTIONS.find((o) => o.value === s) ?? STATUS_OPTIONS[0];
}

/* ── Props ──────────────────────────────────────────────────── */
interface Props {
  initialLeads: Lead[];
}

export default function LeadsTable({ initialLeads }: Props) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [bulkPending, setBulkPending] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  /* ── Sort ───────────────────────────────────────────────── */
  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  /* ── Date filter bounds ─────────────────────────────────── */
  function dateFilterStart(): Date | null {
    if (dateFilter === "today") {
      const d = new Date(); d.setHours(0, 0, 0, 0); return d;
    }
    if (dateFilter === "week") return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return null;
  }

  /* ── Filtered + sorted leads ────────────────────────────── */
  const displayed = useMemo(() => {
    const q     = search.toLowerCase();
    const since = dateFilterStart();

    const filtered = leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q);
      const matchesDate   = !since || new Date(l.created_at) >= since;
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      return matchesSearch && matchesDate && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leads, search, sortKey, sortDir, dateFilter, statusFilter]);

  /* ── Status counts ──────────────────────────────────────── */
  const statusCounts = useMemo(() => {
    const map: Record<string, number> = { all: leads.length };
    leads.forEach((l) => { map[l.status] = (map[l.status] ?? 0) + 1; });
    return map;
  }, [leads]);

  /* ── Selection helpers ──────────────────────────────────── */
  const allChecked = displayed.length > 0 && displayed.every((l) => selectedIds.has(l.id));
  const someChecked = !allChecked && displayed.some((l) => selectedIds.has(l.id));

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allChecked) displayed.forEach((l) => next.delete(l.id));
      else            displayed.forEach((l) => next.add(l.id));
      return next;
    });
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  /* ── Single delete ──────────────────────────────────────── */
  const handleDelete = (id: string) => {
    if (!confirm("Delete this lead?")) return;
    setActionError(null);
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteLead(id);
      if (result?.error) { setActionError(result.error); }
      else { setLeads((prev) => prev.filter((l) => l.id !== id)); setSelectedIds((p) => { const n = new Set(p); n.delete(id); return n; }); }
      setDeletingId(null);
    });
  };

  /* ── Bulk delete ────────────────────────────────────────── */
  const handleBulkDelete = () => {
    const ids = [...selectedIds];
    if (!ids.length || !confirm(`Delete ${ids.length} lead(s)?`)) return;
    setActionError(null);
    setBulkPending(true);
    startTransition(async () => {
      const result = await bulkDeleteLeads(ids);
      if (result?.error) { setActionError(result.error); }
      else { setLeads((prev) => prev.filter((l) => !ids.includes(l.id))); setSelectedIds(new Set()); }
      setBulkPending(false);
    });
  };

  /* ── Status change ──────────────────────────────────────── */
  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    setActionError(null);
    setUpdatingId(id);
    startTransition(async () => {
      const result = await updateLeadStatus(id, newStatus);
      if (result?.error) { setActionError(result.error); }
      else { setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: newStatus } : l)); }
      setUpdatingId(null);
    });
  };

  /* ── Bulk status update ─────────────────────────────────── */
  const handleBulkStatus = (newStatus: LeadStatus) => {
    const ids = [...selectedIds];
    if (!ids.length) return;
    setActionError(null);
    setBulkPending(true);
    startTransition(async () => {
      const result = await bulkUpdateStatus(ids, newStatus);
      if (result?.error) { setActionError(result.error); }
      else { setLeads((prev) => prev.map((l) => ids.includes(l.id) ? { ...l, status: newStatus } : l)); setSelectedIds(new Set()); }
      setBulkPending(false);
    });
  };

  /* ── Sort Icon ──────────────────────────────────────────── */
  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 opacity-20" />;
    return sortDir === "asc"
      ? <ChevronUp   className="w-3 h-3 text-rose-500" />
      : <ChevronDown className="w-3 h-3 text-rose-500" />;
  }

  function Th({ col, label }: { col: SortKey; label: string }) {
    return (
      <th
        className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-rose-500 select-none"
        onClick={() => handleSort(col)}
      >
        <span className="inline-flex items-center gap-1">{label}<SortIcon col={col} /></span>
      </th>
    );
  }

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div className="flex flex-col gap-4">

      {/* ── Filter bar ──────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Status tabs */}
        <div className="flex gap-1 flex-wrap">
          {[{ value: "all" as const, label: "All" }, ...STATUS_OPTIONS].map((opt) => {
            const count = statusCounts[opt.value] ?? 0;
            const active = statusFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                  active
                    ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                    : "bg-white text-stone-500 border-stone-200 hover:border-rose-300 hover:text-rose-500"
                }`}
              >
                {"label" in opt ? opt.label : (opt as any).label}{" "}
                <span className={active ? "opacity-75" : "opacity-50"}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Date filter */}
        <div className="ml-auto flex gap-1">
          {(["all", "today", "week"] as DateFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDateFilter(d)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${
                dateFilter === d
                  ? "bg-stone-800 text-white border-stone-800"
                  : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
              }`}
            >
              {d === "all" ? "All Time" : d === "today" ? "Today" : "This Week"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Toolbar ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="input-group w-full sm:w-72" style={{ borderRadius: "0.625rem" }}>
          <span className="input-icon-zone" style={{ width: "2.25rem", minWidth: "2.25rem" }}>
            <Search className="w-3.5 h-3.5" />
          </span>
          <input
            id="leads-search"
            type="text"
            placeholder="Search name, email, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input text-sm py-2"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <span className="text-sm text-stone-400">
            {displayed.length} of {leads.length} leads
          </span>

          {/* Bulk actions — shown only when something is selected */}
          {selectedIds.size > 0 && (
            <>
              <span className="text-sm font-medium text-rose-500">
                {selectedIds.size} selected
              </span>
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleBulkStatus(opt.value)}
                  disabled={bulkPending}
                  className="btn-ghost text-xs py-1 px-3"
                >
                  {bulkPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                  Mark {opt.label}
                </button>
              ))}
              <button
                onClick={handleBulkDelete}
                disabled={bulkPending}
                className="btn-danger text-xs py-1.5 px-3"
              >
                {bulkPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                Delete ({selectedIds.size})
              </button>
            </>
          )}

          <button
            id="export-csv-btn"
            onClick={() => exportLeadsToCsv(displayed)}
            className="btn-ghost text-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Error banner */}
      {actionError && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />{actionError}
        </div>
      )}

      {/* ── Table ───────────────────────────────────────── */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                {/* Checkbox */}
                <th className="px-4 py-3 w-10">
                  <button onClick={toggleAll} className="flex items-center justify-center text-stone-400 hover:text-rose-500 transition-colors">
                    {allChecked
                      ? <CheckSquare className="w-4 h-4 text-rose-500" />
                      : someChecked
                      ? <CheckSquare className="w-4 h-4 text-rose-300" />
                      : <Square className="w-4 h-4" />}
                  </button>
                </th>
                <Th col="name"       label="Name"   />
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider whitespace-nowrap">Phone</th>
                <Th col="email"      label="Email"  />
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider whitespace-nowrap">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Message</th>
                <Th col="status"     label="Status" />
                <Th col="created_at" label="Date"   />
                <th className="px-4 py-3 text-right text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-stone-400 text-sm">
                    {search || statusFilter !== "all" || dateFilter !== "all"
                      ? "No leads match your filters."
                      : "No leads yet. Share your landing page to start collecting!"}
                  </td>
                </tr>
              ) : (
                displayed.map((lead) => {
                  const meta = statusMeta(lead.status ?? "new");
                  const isSelected = selectedIds.has(lead.id);
                  return (
                    <tr
                      key={lead.id}
                      className={`transition-colors ${isSelected ? "bg-rose-50/40" : "hover:bg-stone-50"}`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3">
                        <button onClick={() => toggleOne(lead.id)} className="text-stone-400 hover:text-rose-500 transition-colors">
                          {isSelected
                            ? <CheckSquare className="w-4 h-4 text-rose-500" />
                            : <Square className="w-4 h-4" />}
                        </button>
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-stone-800 whitespace-nowrap">{lead.name}</span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3 text-sm text-stone-500 whitespace-nowrap">{lead.phone}</td>

                      {/* Email */}
                      <td className="px-4 py-3 text-sm text-stone-600 whitespace-nowrap">
                        <a href={`mailto:${lead.email}`} className="hover:text-rose-500 transition-colors">{lead.email}</a>
                      </td>

                      {/* Profile */}
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-stone-700 font-medium capitalize">{lead.skin_type || <span className="text-stone-300 italic">—</span>}</span>
                          <span className="text-xs text-stone-500 capitalize">{lead.skin_concern || ""}</span>
                        </div>
                      </td>

                      {/* Message */}
                      <td className="px-4 py-3 text-sm text-stone-500 max-w-xs">
                        <span className="truncate block max-w-[180px]" title={lead.message ?? ""}>
                          {lead.message || <span className="italic text-stone-300">—</span>}
                        </span>
                      </td>

                      {/* Status dropdown */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="relative">
                          {updatingId === lead.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-stone-400" />
                          ) : (
                            <select
                              value={lead.status ?? "new"}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                              className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer outline-none appearance-none ${meta.bg} ${meta.color}`}
                            >
                              {STATUS_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-sm text-stone-400 whitespace-nowrap">{formatDateTime(lead.created_at)}</td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <button
                          id={`delete-lead-${lead.id}`}
                          onClick={() => handleDelete(lead.id)}
                          disabled={deletingId === lead.id}
                          className="btn-danger"
                          aria-label={`Delete lead ${lead.name}`}
                        >
                          {deletingId === lead.id
                            ? <Loader2 className="w-3 h-3 animate-spin" />
                            : <Trash2 className="w-3 h-3" />}
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
