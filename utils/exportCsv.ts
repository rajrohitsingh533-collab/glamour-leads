import { Lead } from "@/types/lead";

/**
 * Converts an array of Lead objects into a CSV string and
 * triggers a browser download.
 *
 * @param leads  - Array of lead rows from Supabase
 * @param filename - Desired filename (default: "leads.csv")
 */
export function exportLeadsToCsv(
  leads: Lead[],
  filename = "glamour-leads.csv"
): void {
  const headers = ["Name", "Phone", "Email", "Skin Type", "Skin Concern", "Message", "Date"];

  const rows = leads.map((lead) => [
    `"${lead.name.replace(/"/g, '""')}"`,
    `"${lead.phone.replace(/"/g, '""')}"`,
    `"${lead.email.replace(/"/g, '""')}"`,
    `"${lead.skin_type ?? ""}"`,
    `"${lead.skin_concern ?? ""}"`,
    `"${(lead.message ?? "").replace(/"/g, '""')}"`,
    `"${new Date(lead.created_at).toLocaleString()}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join(
    "\n"
  );

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Release object URL after short delay
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
