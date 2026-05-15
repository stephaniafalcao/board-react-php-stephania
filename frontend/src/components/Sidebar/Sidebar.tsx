import "./sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutGrid, PanelsTopLeft } from "lucide-react";
import { SidebarIcon } from "./Icon/SidebarIcon";
import { SidebarLinkIcon } from "./Icon/SidebarLinkIcon";

export function Sidebar() {
  const { pathname } = useLocation();
  const isKanbanRoute = pathname.startsWith("/boards/kanban");

  return (
    <aside className={`sidebar ${isKanbanRoute ? "sidebar-kanban" : ""}`.trim()}>
      <div className="sidebar-logo-area">
        <div className="logo-icon">
          {isKanbanRoute ? (
            <PanelsTopLeft size={18} strokeWidth={2.2} />
          ) : (
            <SidebarIcon />
          )}
        </div>

        <div className={`sidebar-brand ${isKanbanRoute ? "sidebar-brand-kanban" : ""}`.trim()}>
          <h1>{isKanbanRoute ? "Workspace" : "KanbanFlow"}</h1>
          {isKanbanRoute ? (
            <p>Productivity Suite</p>
          ) : (
            <>
              <p>PRODUCTIVITY</p>
              <p>WORKSPACE</p>
            </>
          )}
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/boards"
          className={({ isActive }) =>
            `sidebar-link${isActive && !isKanbanRoute ? " active" : ""}`
          }
        >
          <span className="sidebar-link-icon">
            {isKanbanRoute ? (
              <LayoutGrid size={16} strokeWidth={2.2} />
            ) : (
              <SidebarLinkIcon />
            )}
          </span>
          <span>Dashboard</span>
        </NavLink>
      </nav>
    </aside>
  );
}
