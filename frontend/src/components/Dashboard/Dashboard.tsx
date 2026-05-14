import { BoardCard } from "../BoardCard/BoardCard";
import { CreateBoardCard } from "../CreateBoard/CreateBoard";
import { Sidebar } from "../Sidebar/Sidebar";
import "./dashboard.css";
import { DashboardHeader } from "./DashboardHeader";
import { useBoards } from "../../hooks/useBoards";

export function Dashboard() {
  const { boards, isLoading, isError, isRefreshing, retry } = useBoards();

  return (
    <main className="dashboard-layout">
      <Sidebar />
      <section className="dashboard-content">
        <DashboardHeader />
        <div className="boards-grid">
          <CreateBoardCard />
          {isLoading && <p>Carregando boards...</p>}
          {isError && (
            <p>
              Não foi possível carregar os boards.
              <button type="button" onClick={retry}>
                Tentar novamente
              </button>
            </p>
          )}
          {!isLoading &&
            !isError &&
            boards.map((board) => <BoardCard key={board.id} board={board} />)}
          {isRefreshing && <p>Atualizando boards...</p>}
        </div>
      </section>
    </main>
  );
}
