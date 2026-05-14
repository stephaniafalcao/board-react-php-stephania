import type { HTMLAttributes, ReactNode } from "react";

type CardBodyProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function CardBody({ children, className = "", ...props }: CardBodyProps) {
  return (
    <div className={`card-body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
