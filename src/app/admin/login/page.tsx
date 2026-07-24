"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      const session = await getSession();
      if (session?.user?.role === "ADMIN") {
        router.replace("/admin");
      }
    })();
  }, [router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });
    if (res?.error || !res?.ok) {
      setLoading(false);
      toast.error("Invalid credentials or insufficient permissions");
      return;
    }
    const session = await getSession();
    if (session?.user?.role !== "ADMIN") {
      await signOut({ redirect: false });
      setLoading(false);
      toast.error("This account does not have admin access");
      return;
    }
    setLoading(false);
    toast.success("Admin access granted");
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <h1 className="display-font text-3xl font-semibold">Admin Portal</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Secure access for Nidus Trading operations.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Admin email"
            autoComplete="username"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Authenticating..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
