import "./sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarIcon } from "./Icon/SidebarIcon";
import { SidebarLinkIcon } from "./Icon/SidebarLinkIcon";

export function Sidebar() {
  const { pathname } = useLocation();
  const isKanbanRoute = pathname.startsWith("/boards/kanban");

  return (
    <aside className="sidebar">
      <div className="sidebar-logo-area">
        <div className="logo-icon">
          <SidebarIcon/>
        </div>

        <div>
          <h1>KanbanFlow</h1>
          <p>PRODUCTIVITY</p>
          <p>WORKSPACE</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/boards"
          className={({ isActive }) =>
            `sidebar-link${isActive && !isKanbanRoute ? " active" : ""}`
          }
        >
          <span className="sidebar-link-icon"><SidebarLinkIcon/></span>
          <span>Dashboard</span>
        </NavLink>
      </nav>
    </aside>
  );
}
