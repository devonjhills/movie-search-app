import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ViewAllButtonProps {
  href: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export function ViewAllButton({
  href,
  className,
  variant = "default",
  size = "sm",
}: ViewAllButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn(
        "gap-1.5 font-medium transition-all duration-200 hover:gap-2 group",
        className
      )}
    >
      <Link href={href}>
        <span>View All</span>
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </Button>
  );
}