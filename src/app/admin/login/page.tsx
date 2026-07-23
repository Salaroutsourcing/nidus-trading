"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      toast.error("Invalid credentials");
      return;
    }
    toast.success("Admin access granted");
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass w-full max-w-md rounded-3xl border border-[var(--border)] p-8">
        <h1 className="display-font text-3xl font-semibold">Admin Portal</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Secure access for Nidus Trading operations.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Input
            name="email"
            type="email"
            placeholder="Admin email"
            defaultValue="admin@nidustrading.com"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
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
