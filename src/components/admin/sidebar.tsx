"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  ShoppingBag,
  Newspaper,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/invoices", label: "Invoices", icon: FileText },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const nav = (
    <>
      <Link href="/admin" className="display-font px-2 text-xl font-semibold">
        Nidus Admin
      </Link>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:bg-white/10 hover:text-[var(--foreground)]",
                active && "bg-[var(--accent-soft)] text-[var(--foreground)]"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Button
        variant="outline"
        className="mt-4 justify-start"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 lg:hidden">
        <Link href="/admin" className="display-font text-lg font-semibold">
          Nidus Admin
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <>
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-[var(--border)] bg-[var(--surface)] p-4 lg:hidden">
            {nav}
          </aside>
        </>
      )}

      <aside className="glass hidden h-full w-64 shrink-0 flex-col border-r border-[var(--border)] p-4 lg:flex">
        {nav}
      </aside>
    </>
  );
}
