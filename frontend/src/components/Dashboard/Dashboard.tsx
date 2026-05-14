import { BoardCard } from "../BoardCard/BoardCard";
import { CreateBoardCard } from "../CreateBoard/CreateBoardCard";
import { Sidebar } from "../Sidebar/Sidebar";
import "./dashboard.css";
import { DashboardHeader } from "./DashboardHeader";
import { useBoards } from "../../hooks/useBoards";
import { Button } from "../Button/Button";
import { Page } from "../Page/Page";

export function Dashboard() {
  const { boards, isLoading, isError, isRefreshing, retry } = useBoards();

  return (
    <Page>
        <DashboardHeader />
        <div className="boards-grid">
          <CreateBoardCard />
          {isLoading && <p>Carregando boards...</p>}
          {isError && (
            <p>
              Não foi possível carregar os boards.
              <Button type="button" onClick={retry}>
                Tentar novamente
              </Button>
            </p>
          )}
          {!isLoading &&
            !isError &&
            boards.map((board) => <BoardCard key={board.id} board={board} />)}
          {isRefreshing && <p>Atualizando boards...</p>}
        </div>
      </Page>
  );
}
