import type { HTMLAttributes, ReactNode } from "react";

type CardFooterProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function CardFooter({
  children,
  className = "",
  ...props
}: CardFooterProps) {
  return (
    <footer className={`card-footer ${className}`.trim()} {...props}>
      {children}
    </footer>
  );
}
