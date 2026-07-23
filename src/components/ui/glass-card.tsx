import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
  hover = true,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl border border-[var(--border)] p-5",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10",
        className
      )}
    >
      {children}
    </div>
  );
}
