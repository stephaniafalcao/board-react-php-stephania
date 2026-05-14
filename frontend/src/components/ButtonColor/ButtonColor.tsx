import type { ButtonHTMLAttributes, CSSProperties } from 'react';

import './button-color.css';

type ButtonColorProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: string;
  selected?: boolean;
};

export function ButtonColor({
  color,
  selected = false,
  className = '',
  style,
  ...props
}: ButtonColorProps) {
  return (
    <button
      className={`color-option ${selected ? 'selected' : ''} ${className}`}
      style={
        {
          '--color': color,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
