import type { ButtonHTMLAttributes, ComponentType } from "react";
import type { LucideProps } from "lucide-react";

import "./button-icon.css";

type ButtonIconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ComponentType<LucideProps>;
  selected?: boolean;
  label: string;
};

export function ButtonIcon({
  icon: Icon,
  selected = false,
  label,
  className = "",
  type = "button",
  ...props
}: ButtonIconProps) {
  return (
    <button
      type={type}
      className={`icon-option ${selected ? "selected" : ""} ${className}`}
      aria-label={label}
      aria-pressed={selected}
      {...props}
    >
      <Icon size={20} strokeWidth={2} />
    </button>
  );
}