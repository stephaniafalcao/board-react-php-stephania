import { BoardCard } from "../BoardCard/BoardCard";
import { CreateBoardCard } from "../CreateBoard/CreateBoardCard";
import "./dashboard.css";
import { Header } from "../Header/Header";
import { useBoards } from "../../hooks/useBoards";
import { Button } from "../Button/Button";
import { Page } from "../Page/Page";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const { boards, isLoading, isError, isRefreshing, retry } = useBoards();

  return (
    <Page>
        <Header
            title="Your Dashboards"
            description="Manage and create your projects boards here."
        />
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
            boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onClick={() => navigate("/workspace")}
              />
            ))}
          {isRefreshing && <p>Atualizando boards...</p>}
        </div>
      </Page>
  );
}
