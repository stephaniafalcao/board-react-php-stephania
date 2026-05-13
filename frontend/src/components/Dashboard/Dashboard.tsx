import { Sidebar } from "../Sidebar/Sidebar";
import "./dashboard.css";

export function Dashboard() {
  return (
    <main className="dashboard-layout">
      <Sidebar />
      <section className="dashboard-content">
      </section>
    </main>
  );
}