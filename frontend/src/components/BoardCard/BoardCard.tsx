import type { CSSProperties } from "react";
import "./board-card.css";

import {
  Megaphone,
  Map,
  MessageSquareText,
  DraftingCompass,
  UserRoundPlus,
  Rocket,
  BarChart3,
  Columns3,
  Bug,
  Palette,
  type LucideIcon,
  CircleCheck,
  CalendarDays,
} from "lucide-react";

type BoardIcon =
  | "megaphone"
  | "map"
  | "message"
  | "compass"
  | "users"
  | "rocket"
  | "chart"
  | "kanban"
  | "bug"
  | "palette";

export type Board = {
  title: string;
  description: string;
  tasks: number;
  date: string;
  icon: BoardIcon;
  themeColor: string;
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
  rocket: Rocket,
  chart: BarChart3,
  kanban: Columns3,
  bug: Bug,
  palette: Palette,
};

const defaultThemeColor = "#1D9BF0";

function normalizeThemeColor(themeColor: string): string {
  const normalized = themeColor.trim();

  if (/^#[0-9a-fA-F]{6}$/.test(normalized)) {
    return normalized.toUpperCase();
  }

  return defaultThemeColor;
}

function hexToRgba(hexColor: string, alpha: number): string {
  const value = hexColor.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function BoardCard({ board }: BoardCardProps) {
  const Icon = icons[board.icon];
  const iconColor = normalizeThemeColor(board.themeColor);
  const iconStyle = {
    "--board-icon-color": iconColor,
    "--board-icon-bg": hexToRgba(iconColor, 0.12),
  } as CSSProperties;

  return (
    <article className="board-card">
      <div className="board-card-top">
        <div className="board-icon" style={iconStyle}>
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
