import { BoardCard } from "../BoardCard/BoardCard";
import { CreateBoardCard } from "../CreateBoard/CreateBoard";
import { Sidebar } from "../Sidebar/Sidebar";
import "./dashboard.css";
import { DashboardHeader } from "./DashboardHeader";

const boards: Board[] = [
  {
    title: "Marketing Launch",
    description: "Q4 Campaign execution and asset tracking.",
    tasks: 24,
    date: "Oct 12",
    icon: "megaphone",
    color: "blue",
  },
  {
    title: "Product Roadmap",
    description: "Strategic planning for version 2.0 release.",
    tasks: 48,
    date: "Oct 10",
    icon: "map",
    color: "blue",
  },
  {
    title: "Customer Feedback",
    description: "User interviews and feature requests backlog.",
    tasks: 12,
    date: "Oct 14",
    icon: "message",
    color: "orange",
    badge: "URGENT",
  },
  {
    title: "Technical Debt",
    description: "Backend refactoring and legacy code updates.",
    tasks: 31,
    date: "Sep 28",
    icon: "compass",
    color: "gray",
  },
  {
    title: "HR Onboarding",
    description: "Standard procedures for new engineering hires.",
    tasks: 15,
    date: "Oct 05",
    icon: "users",
    color: "blue",
  },
];

export function Dashboard() {
  return (
    <main className="dashboard-layout">
      <Sidebar />
      <section className="dashboard-content">
        <DashboardHeader />
        <div className="boards-grid">
          <CreateBoardCard />

          {boards.map((board) => (
            <BoardCard key={board.title} board={board} />
          ))}
        </div>
      </section>
    </main>
  );
}