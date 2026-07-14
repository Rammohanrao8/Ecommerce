import { formatCurrency, discountPct } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PriceTag({
  price,
  compareAt,
  size = "md",
  className,
}: {
  price: number | string;
  compareAt?: number | string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const disc = discountPct(price, compareAt);
  const priceCls = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl",
  }[size];
  return (
    <div className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-semibold tabular-nums text-foreground", priceCls)}>
        {formatCurrency(price)}
      </span>
      {compareAt && disc > 0 && (
        <>
          <span className="text-xs text-muted-foreground line-through tabular-nums">
            {formatCurrency(compareAt)}
          </span>
          <span className="rounded-md bg-brand/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
            −{disc}%
          </span>
        </>
      )}
    </div>
  );
}
