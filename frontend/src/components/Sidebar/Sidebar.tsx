import "./sidebar.css";
import { SidebarIcon } from "./Icon/SidebarIcon";
import { SidebarLinkIcon } from "./Icon/SidebarLinkIcon";

export function Sidebar() {
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
        <a href="#" className="sidebar-link active">
          <span className="sidebar-link-icon"><SidebarLinkIcon/></span>
          <span>Dashboard</span>
        </a>
      </nav>
    </aside>
  );
}