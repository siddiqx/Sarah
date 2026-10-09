import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  variant?: "left" | "right";
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ className, variant = "left", children, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col border-border bg-sidebar-background text-sidebar-foreground",
          variant === "left" ? "border-r w-64 min-w-64" : "border-l w-80 min-w-80",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";
