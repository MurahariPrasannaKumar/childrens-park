import { cn } from "@/lib/utils";

interface CornerFrameProps {
  className?: string;
  tone?: "light" | "dark";
}

const CORNER_POSITIONS = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
] as const;

export function CornerFrame({ className, tone = "light" }: CornerFrameProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {CORNER_POSITIONS.map((pos) => (
        <span
          key={pos}
          className={cn(
            "absolute h-4 w-4",
            pos,
            tone === "dark" ? "border-accent/70" : "border-accent/60"
          )}
        />
      ))}
    </div>
  );
}
