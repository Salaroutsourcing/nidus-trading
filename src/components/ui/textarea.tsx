import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[120px] w-full rounded-xl border border-[var(--border)] bg-white/40 px-4 py-3 text-sm text-[var(--foreground)] backdrop-blur-md placeholder:text-[var(--muted)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] dark:bg-white/5",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";
