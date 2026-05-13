import { Sidebar } from "../Sidebar/Sidebar";
import "./dashboard.css";
import { DashboardHeader } from "./DashboardHeader";

export function Dashboard() {
  return (
    <main className="dashboard-layout">
      <Sidebar />
      <section className="dashboard-content">
        <DashboardHeader />
      </section>
    </main>
  );
}