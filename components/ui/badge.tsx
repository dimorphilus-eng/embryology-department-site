import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-line bg-pine-soft px-2 py-0.5 text-xs font-semibold tracking-wide text-foreground",
        className,
      )}
      {...props}
    />
  );
}
