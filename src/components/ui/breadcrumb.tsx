import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  overlay?: boolean;
}

export function Breadcrumb({
  items,
  className,
  overlay = false,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-1 text-sm",
        overlay
          ? "text-white/90 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10"
          : "text-muted-foreground",
        className,
      )}
    >
      {/* Home Icon */}
      <Link
        href="/"
        className={cn(
          "flex items-center transition-colors",
          overlay ? "hover:text-white" : "hover:text-foreground",
        )}
        aria-label="Home"
      >
        <HomeIcon className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRightIcon
            className={cn(
              "h-4 w-4",
              overlay ? "text-white/50" : "text-muted-foreground/50",
            )}
          />
          {item.current || !item.href ? (
            <span
              className={cn(
                "font-medium",
                overlay && item.current
                  ? "text-white"
                  : item.current
                    ? "text-foreground"
                    : overlay
                      ? "text-white/90"
                      : "text-muted-foreground",
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "transition-colors truncate max-w-[200px] sm:max-w-none",
                overlay ? "hover:text-white" : "hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

export function BreadcrumbSeparator() {
  return <ChevronRightIcon className="h-4 w-4 text-muted-foreground/50" />;
}
