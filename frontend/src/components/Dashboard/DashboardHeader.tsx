import { TitleForm } from "../TitleForm/TitleForm";
import "./dashboard-header.css";

export function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <TitleForm>Your Dashboards</TitleForm>
      <p>Manage and create your project boards here.</p>
    </header>
  );
}