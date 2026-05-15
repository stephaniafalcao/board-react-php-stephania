import type { ReactNode } from "react";

import { Title } from "../Title/Title";

type HeaderProps = {
  title: ReactNode;
  description?: ReactNode;
};

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="header">
      <Title>{title}</Title>

      {description && <p>{description}</p>}
    </header>
  );
}