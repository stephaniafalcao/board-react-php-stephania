import { useEffect, useState } from "react";
import { Board, BoardCard } from "../BoardCard/BoardCard";
import { CreateBoardCard } from "../CreateBoard/CreateBoard";
import { Sidebar } from "../Sidebar/Sidebar";
import "./dashboard.css";
import { DashboardHeader } from "./DashboardHeader";

const apiUrl = import.meta.env.VITE_API_URL ?? "/api";

type BoardApiItem = {
  id: number;
  name: string;
  description: string | null;
  themeColor: string;
  icon: string;
  createdAt: string;
  tasksCount: number;
};

type BoardsResponse = {
  data: BoardApiItem[];
};

const iconMap: Record<string, Board["icon"]> = {
  megaphone: "megaphone",
  map: "map",
  message: "message",
  "message-square": "message",
  compass: "compass",
  users: "users",
};

function mapColor(themeColor: string): Board["color"] {
  const color = themeColor.toLowerCase();
  if (color.includes("f59e0b")) return "orange";
  if (color.includes("6b7280") || color.includes("9ca3af")) return "gray";
  return "blue";
}

function toBoardCard(item: BoardApiItem): Board {
  return {
    title: item.name,
    description: item.description ?? "Sem descrição",
    tasks: item.tasksCount,
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    }),
    icon: iconMap[item.icon] ?? "compass",
    color: mapColor(item.themeColor),
  };
}

export function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadBoards() {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/boards`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const body: BoardsResponse = await response.json();
        if (!cancelled) setBoards(body.data.map(toBoardCard));
      } catch {
        if (!cancelled) setError("Não foi possível carregar os boards.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadBoards();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="dashboard-layout">
      <Sidebar />
      <section className="dashboard-content">
        <DashboardHeader />
        <div className="boards-grid">
          <CreateBoardCard />
          {loading && <p>Carregando boards...</p>}
          {error && <p>{error}</p>}
          {!loading &&
            !error &&
            boards.map((board) => <BoardCard key={board.title} board={board} />)}
        </div>
      </section>
    </main>
  );
}
