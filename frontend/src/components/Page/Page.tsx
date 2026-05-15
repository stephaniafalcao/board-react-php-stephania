import type { ReactNode } from "react";

import { Sidebar } from "../Sidebar/Sidebar";
import "./page.css";

type PageProps = {
  children: ReactNode;
};

export function Page({ children }: PageProps) {
  return (
    <main className="page-layout">
      <Sidebar />

      <section className="page-content">
        <section className="page-section">
          {children}
        </section>
      </section>
    </main>
  );
}