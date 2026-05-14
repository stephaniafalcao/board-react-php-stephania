import type { ReactNode } from 'react';
import "./label.css";

type LabelProps = {
  children: ReactNode;
  htmlFor?: string;
};

export function Label({ children, htmlFor }: LabelProps) {
  return (
    <label className="label" htmlFor={htmlFor}>
      {children}
    </label>
  )
}