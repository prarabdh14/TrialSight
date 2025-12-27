import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Risk level variants
        riskHigh: "border-red-200 bg-red-100 text-red-700",
        riskMedium: "border-amber-200 bg-amber-100 text-amber-700",
        riskLow: "border-emerald-200 bg-emerald-100 text-emerald-700",
        // Status variants
        clean: "border-emerald-200 bg-emerald-50 text-emerald-700",
        notClean: "border-red-200 bg-red-50 text-red-700",
        pending: "border-amber-200 bg-amber-50 text-amber-700",
        // Priority variants
        priorityHigh: "border-red-300 bg-red-500 text-white",
        priorityMedium: "border-amber-300 bg-amber-500 text-white",
        priorityLow: "border-slate-300 bg-slate-400 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
