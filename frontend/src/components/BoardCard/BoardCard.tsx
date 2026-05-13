import "./boardcard.css";

import {
  Megaphone,
  Map,
  MessageSquareText,
  DraftingCompass,
  UserRoundPlus,
  type LucideIcon,
  CircleCheck,
  CalendarDays,
} from "lucide-react";

type BoardIcon = "megaphone" | "map" | "message" | "compass" | "users";

export type Board = {
  title: string;
  description: string;
  tasks: number;
  date: string;
  icon: BoardIcon;
  color: "blue" | "orange" | "gray";
  badge?: string;
};

type BoardCardProps = {
  board: Board;
};

const icons: Record<BoardIcon, LucideIcon> = {
  megaphone: Megaphone,
  map: Map,
  message: MessageSquareText,
  compass: DraftingCompass,
  users: UserRoundPlus,
};

export function BoardCard({ board }: BoardCardProps) {
  const Icon = icons[board.icon];

  return (
    <article className="board-card">
      <div className="board-card-top">
        <div className={`board-icon ${board.color}`}>
          <Icon size={20} strokeWidth={2.2} />
        </div>

        <button className="board-menu" aria-label="Open board options">
          ⋮
        </button>
      </div>

      <div className="board-card-body">
        <div className="board-title-row">
          <h3>{board.title}</h3>

          {board.badge && <span className="board-badge">{board.badge}</span>}
        </div>

        <p>{board.description}</p>
      </div>

      <footer className="board-card-footer">
        <span><CircleCheck /> {board.tasks} Tasks</span>
        <span><CalendarDays /> {board.date}</span>
      </footer>
    </article>
  );
}
