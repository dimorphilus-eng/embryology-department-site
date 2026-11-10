import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full border border-line bg-card px-3 py-2 text-base text-foreground placeholder:text-muted",
        className,
      )}
      {...props}
    />
  );
}
