import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || headerList.get("x-url") || "";
  const isLogin =
    pathname.includes("/admin/login") ||
    (!session || session.user.role !== "ADMIN");

  if (!session || session.user.role !== "ADMIN") {
    return <div className="min-h-screen bg-[var(--background)]">{children}</div>;
  }

  void isLogin;
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
    </div>
  );
}
