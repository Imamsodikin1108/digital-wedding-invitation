import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-jakarta font-medium rounded-full",
  {
    variants: {
      variant: {
        gold: "bg-gold/10 text-gold border border-gold/20 px-3 py-1 text-xs tracking-[0.1em] uppercase",
        muted: "bg-[var(--muted)] text-[var(--muted-foreground)] px-3 py-1 text-xs",
        outline: "border border-[var(--border)] text-foreground px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "gold",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
