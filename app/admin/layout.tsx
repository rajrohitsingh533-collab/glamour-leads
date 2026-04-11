import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: "noindex, nofollow", // Don't index admin pages
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Verify the session server-side (middleware also guards, but double-check here)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get total lead count for the nav badge
  const { count } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav userEmail={user.email} totalLeads={count ?? 0} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
