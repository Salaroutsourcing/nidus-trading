import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-xl border border-[var(--border)] bg-white/40 px-4 py-2 text-sm text-[var(--foreground)] backdrop-blur-md placeholder:text-[var(--muted)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] dark:bg-white/5",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
