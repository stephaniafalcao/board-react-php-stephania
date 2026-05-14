import type { CSSProperties } from "react";
import "./board-card.css";
import { Card } from "../Card/Card";
import { CardBody } from "../CardBody/CardBody";
import { CardFooter } from "../CardFooter/CardFooter";
import { CardHeader } from "../CardHeader/CardHeader";

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
  EllipsisVertical,
} from "lucide-react";

export type BoardIcon =
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

export type BoardPriorityTone = "urgent" | "high" | "medium" | "low" | "neutral";

export type BoardPriorityBadge = {
  label: string;
  tone?: BoardPriorityTone;
  backgroundColor?: string;
  textColor?: string;
};

export type BoardMember = {
  id: string | number;
  name: string;
  avatarUrl?: string;
  initials?: string;
};

export type Board = {
  title: string;
  description: string;
  tasks: number;
  date: string;
  icon: BoardIcon;
  themeColor: string;
  priorityBadge?: BoardPriorityBadge;
  members?: BoardMember[];
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
const maxVisibleMembers = 3;
const priorityToneClassMap: Record<BoardPriorityTone, string> = {
  urgent: "board-priority-urgent",
  high: "board-priority-high",
  medium: "board-priority-medium",
  low: "board-priority-low",
  neutral: "board-priority-neutral",
};

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

function resolvePriorityBadge(board: Board): BoardPriorityBadge | null {
  if (board.priorityBadge) {
    return board.priorityBadge;
  }

  if (board.badge) {
    return {
      label: board.badge,
      tone: "urgent",
    };
  }

  return null;
}

function getInitials(member: BoardMember): string {
  if (member.initials && member.initials.trim() !== "") {
    return member.initials.trim().slice(0, 2).toUpperCase();
  }

  const parts = member.name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "??";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function BoardCard({ board }: BoardCardProps) {
  const Icon = icons[board.icon];
  const priorityBadge = resolvePriorityBadge(board);
  const members = board.members ?? [];
  const visibleMembers = members.slice(0, maxVisibleMembers);
  const hiddenMembersCount = members.length - visibleMembers.length;
  const iconColor = normalizeThemeColor(board.themeColor);
  const iconStyle = {
    "--board-icon-color": iconColor,
    "--board-icon-bg": hexToRgba(iconColor, 0.12),
  } as CSSProperties;
  const badgeStyle =
    priorityBadge &&
    (priorityBadge.backgroundColor || priorityBadge.textColor)
      ? ({
          ...(priorityBadge.backgroundColor
            ? { "--board-priority-bg": priorityBadge.backgroundColor }
            : {}),
          ...(priorityBadge.textColor
            ? { "--board-priority-color": priorityBadge.textColor }
            : {}),
        } as CSSProperties)
      : undefined;
  const badgeToneClass =
    priorityBadge && priorityBadge.tone
      ? priorityToneClassMap[priorityBadge.tone]
      : "board-priority-neutral";

  return (
    <Card className="board-card">
      <CardHeader>
        <div className="board-icon" style={iconStyle}>
          <Icon size={20} strokeWidth={2.2} />
        </div>

        <button className="board-menu" aria-label="Open board options">
          <EllipsisVertical size={18} strokeWidth={2.2} />
        </button>
      </CardHeader>

      <CardBody className="board-card-body">
        <div className="board-title-row">
          <h3>{board.title}</h3>

          {priorityBadge && (
            <span
              className={`board-priority-badge ${badgeToneClass}`}
              style={badgeStyle}
            >
              {priorityBadge.label}
            </span>
          )}
        </div>

        <p className="board-description" title={board.description}>
          {board.description}
        </p>
      </CardBody>

      <CardFooter className="board-card-footer">
        <div className="board-card-meta">
          <span>
            <CircleCheck /> {board.tasks} Tasks
          </span>
          <span>
            <CalendarDays /> {board.date}
          </span>
        </div>

        {members.length > 0 && (
          <div className="board-members" aria-label={`${members.length} team members`}>
            {visibleMembers.map((member, index) => (
              <div
                key={member.id}
                className="board-member-avatar"
                style={{ zIndex: visibleMembers.length - index }}
                title={member.name}
              >
                {member.avatarUrl ? (
                  <img src={member.avatarUrl} alt={member.name} loading="lazy" />
                ) : (
                  <span>{getInitials(member)}</span>
                )}
              </div>
            ))}

            {hiddenMembersCount > 0 && (
              <div className="board-member-more" title={`${hiddenMembersCount} more members`}>
                +{hiddenMembersCount}
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
