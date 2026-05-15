import type { ReactNode } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { LayoutGrid, PanelsTopLeft } from "lucide-react";
import { SidebarIcon } from "./Icon/SidebarIcon";
import { SidebarLinkIcon } from "./Icon/SidebarLinkIcon";

export type SidebarMode = "default" | "workspace";

export type SidebarConfig = {
  mode?: SidebarMode;
  suppressDashboardActive?: boolean;
  brandTitle?: string;
  brandLines?: string[];
  brandIcon?: ReactNode;
  linkIcon?: ReactNode;
};

type SidebarProps = {
  config?: SidebarConfig;
};

export function Sidebar({ config }: SidebarProps) {
  const mode = config?.mode ?? "default";
  const isWorkspaceMode = mode === "workspace";
  const suppressDashboardActive = config?.suppressDashboardActive ?? false;
  const brandTitle = config?.brandTitle ?? (isWorkspaceMode ? "Workspace" : "KanbanFlow");
  const brandLines =
    config?.brandLines ??
    (isWorkspaceMode ? ["Productivity Suite"] : ["PRODUCTIVITY", "WORKSPACE"]);
  const brandIcon =
    config?.brandIcon ?? (isWorkspaceMode ? <PanelsTopLeft size={18} strokeWidth={2.2} /> : <SidebarIcon />);
  const dashboardLinkIcon =
    config?.linkIcon ?? (isWorkspaceMode ? <LayoutGrid size={16} strokeWidth={2.2} /> : <SidebarLinkIcon />);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo-area">
        <div className="logo-icon">
          {brandIcon}
        </div>

        <div className={`sidebar-brand ${isWorkspaceMode ? "sidebar-brand-workspace" : ""}`.trim()}>
          <h1>{brandTitle}</h1>
          {brandLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/boards"
          className={({ isActive }) =>
            `sidebar-link${isActive && !suppressDashboardActive ? " active" : ""}`
          }
        >
          <span className="sidebar-link-icon">
            {dashboardLinkIcon}
          </span>
          <span>Dashboard</span>
        </NavLink>
      </nav>
    </aside>
  );
}
