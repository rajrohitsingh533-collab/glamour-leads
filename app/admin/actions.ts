"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type LeadStatus = "new" | "contacted" | "converted" | "spam";

/* ── Delete a single lead ───────────────────────────────────── */
export async function deleteLead(id: string) {
  if (!id) return { error: "Invalid lead ID." };

  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    console.error("Delete lead error:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

/* ── Bulk delete leads ──────────────────────────────────────── */
export async function bulkDeleteLeads(ids: string[]) {
  if (!ids.length) return { error: "No leads selected." };

  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().in("id", ids);

  if (error) {
    console.error("Bulk delete error:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true, deleted: ids.length };
}

/* ── Update lead status ─────────────────────────────────────── */
export async function updateLeadStatus(id: string, status: LeadStatus) {
  if (!id) return { error: "Invalid lead ID." };

  const VALID: LeadStatus[] = ["new", "contacted", "converted", "spam"];
  if (!VALID.includes(status)) return { error: "Invalid status." };

  // Use admin client so the UPDATE is not blocked by RLS
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Update status error:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}

/* ── Bulk update status ─────────────────────────────────────── */
export async function bulkUpdateStatus(ids: string[], status: LeadStatus) {
  if (!ids.length) return { error: "No leads selected." };

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .in("id", ids);

  if (error) {
    console.error("Bulk update status error:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}
