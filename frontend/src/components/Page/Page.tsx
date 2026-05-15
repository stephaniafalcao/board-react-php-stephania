import type { ReactNode } from "react";

import { Sidebar, type SidebarConfig } from "../Sidebar/Sidebar";
import "./page.css";

type PageProps = {
  children: ReactNode;
  sidebarConfig?: SidebarConfig;
};

export function Page({ children, sidebarConfig }: PageProps) {
  return (
    <main className="page-layout">
      <Sidebar config={sidebarConfig} />

      <section className="page-content">
        <section className="page-section">
          {children}
        </section>
      </section>
    </main>
  );
}
