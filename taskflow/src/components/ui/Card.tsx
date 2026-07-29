import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "p-4",
  md: "p-5",
  lg: "p-7",
};

export default function Card({
  children,
  className = "",
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`bg-surface border-2 border-border rounded-card shadow-brutal ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
