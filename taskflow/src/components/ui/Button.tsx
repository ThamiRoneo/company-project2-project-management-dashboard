import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const variantStyles = {
  primary:
    "bg-primary text-text-inverse hover:bg-primary-dark border-border",
  secondary:
    "bg-surface text-text hover:bg-surface-muted border-border",
  danger:
    "bg-danger text-text-inverse hover:bg-danger-dark border-border",
};

const sizeStyles = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-bold uppercase tracking-wider
        border-2 rounded-button shadow-brutal-sm
        transition-all
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:translate-y-0.5 active:shadow-none"}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
