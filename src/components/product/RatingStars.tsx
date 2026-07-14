import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  size = 14,
  className,
  showValue = false,
  reviews,
}: {
  value: number | string;
  size?: number;
  className?: string;
  showValue?: boolean;
  reviews?: number;
}) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const full = Math.floor(v);
  const half = v - full >= 0.5;
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="inline-flex">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = i < full || (i === full && half);
          return (
            <Star
              key={i}
              size={size}
              className={cn(
                "shrink-0",
                filled ? "fill-brand text-brand" : "fill-transparent text-muted-foreground/40",
              )}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-foreground">
          {v.toFixed(1)}
          {typeof reviews === "number" && (
            <span className="ml-1 text-muted-foreground">({reviews.toLocaleString()})</span>
          )}
        </span>
      )}
    </div>
  );
}
