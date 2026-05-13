import "./createboard.css";
import { CreateBoardIcon } from "./CreateBoardIcon";

export function CreateBoardCard() {
  return (
    <button className="create-board-card">
      <CreateBoardIcon />
      <span>Create New Board</span>
    </button>
  );
}