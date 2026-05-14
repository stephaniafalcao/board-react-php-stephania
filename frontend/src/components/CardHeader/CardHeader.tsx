import type { HTMLAttributes, ReactNode } from "react";
import "./card.css";

type CardHeaderProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function CardHeader({
  children,
  className = "",
  ...props
}: CardHeaderProps) {
  return (
    <header className={`card-header ${className}`.trim()} {...props}>
      {children}
    </header>
  );
}
