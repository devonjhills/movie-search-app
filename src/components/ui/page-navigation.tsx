import { ReactNode } from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { BackNavigation } from "@/components/ui/back-navigation";
import { cn } from "@/lib/utils";

interface PageNavigationProps {
  breadcrumbItems: BreadcrumbItem[];
  fallbackHref?: string;
  className?: string;
  children?: ReactNode;
}

export function PageNavigation({
  breadcrumbItems,
  fallbackHref = "/",
  className,
  children,
}: PageNavigationProps) {
  return (
    <div className={cn("container mx-auto px-4 pt-6 pb-4", className)}>
      <div className="flex items-center justify-between gap-4">
        <Breadcrumb items={breadcrumbItems} />
        <BackNavigation fallbackHref={fallbackHref} />
      </div>
      {children}
    </div>
  );
}
