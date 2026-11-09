import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "min-h-11 w-full border border-line bg-card px-3 text-base text-foreground placeholder:text-muted",
        className,
      )}
      {...props}
    />
  );
}
