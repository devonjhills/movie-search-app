import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-noir-soft hover:bg-primary/80 hover:shadow-noir-crimson",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-noir-soft hover:bg-secondary/80 hover:shadow-noir-medium",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-noir-soft hover:bg-destructive/80 hover:shadow-noir-medium",
        outline:
          "text-foreground border-border bg-background shadow-noir-soft hover:bg-accent hover:text-accent-foreground hover:shadow-noir-medium",
        accent:
          "border-transparent bg-accent text-accent-foreground shadow-noir-gold hover:bg-accent/80 hover:shadow-noir-gold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
