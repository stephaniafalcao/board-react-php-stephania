import "./create-board.css";
import { useNavigate } from "react-router-dom";
import { CreateBoardIcon } from "./CreateBoardIcon";

export function CreateBoardCard() {
  const navigate = useNavigate();

  return (
    <button
      className="create-board-card"
      type="button"
      onClick={() => navigate("/boards/new")}
    >
      <CreateBoardIcon />
      <span>Create New Board</span>
    </button>
  );
}
