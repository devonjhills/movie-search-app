import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ElementType } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  as?: ElementType;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any; // Allow additional props for different elements
}

const Button = forwardRef<any, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild,
      as,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-lg font-medium",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
      "transition-all duration-200",
      {
        "btn-primary": variant === "primary",
        "btn-secondary": variant === "secondary",
        "btn-outline": variant === "outline",
        "btn-ghost": variant === "ghost",
      },
      {
        "h-8 px-3 text-sm gap-2": size === "sm",
        "h-10 px-4 py-2 gap-2": size === "md",
        "h-12 px-6 text-lg gap-2": size === "lg",
      },
      className,
    );

    if (asChild && children) {
      // Clone the child element with button classes
      return <span className={baseClasses}>{children}</span>;
    }

    const Component = as || "button";

    return (
      <Component className={baseClasses} ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);
Button.displayName = "Button";

export { Button };
