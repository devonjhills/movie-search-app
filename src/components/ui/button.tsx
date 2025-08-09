import { cn } from "@/lib/utils";
import { forwardRef, ElementType } from "react";
import { type ClassValue } from "clsx";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  as?: ElementType;
  className?: ClassValue;
  children?: React.ReactNode;
  disabled?: boolean;
  [key: string]: unknown;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild,
      as,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses = cn(
      // Base styles with improved accessibility
      "inline-flex items-center justify-center rounded-lg font-medium",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
      "transition-all duration-200 cursor-pointer",
      // Ensure minimum touch target size for accessibility (44px)
      "min-h-[44px]",
      // Variant styles using our global CSS classes
      {
        "btn-primary": variant === "primary",
        "btn-secondary": variant === "secondary", 
        "btn-outline": variant === "outline",
        "btn-ghost": variant === "ghost",
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md": variant === "destructive",
      },
      // Size variants with proper touch targets
      {
        "h-11 px-3 text-sm gap-2": size === "sm",
        "h-12 px-4 py-3 gap-2": size === "md",
        "h-14 px-6 text-lg gap-3": size === "lg",
      },
      className,
    );

    if (asChild && children) {
      return <span className={baseClasses}>{children}</span>;
    }

    const Component = as || "button";

    return (
      <Component 
        className={baseClasses} 
        ref={ref} 
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
