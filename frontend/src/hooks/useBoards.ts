import useSWR from "swr";
import {
  type Board,
  type BoardMember,
  type BoardPriorityBadge,
} from "../components/BoardCard/BoardCard";

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

export type BoardViewModel = Board & {
  id: number;
};

const iconMap: Record<string, Board["icon"]> = {
  megaphone: "megaphone",
  map: "map",
  message: "message",
  "message-square": "message",
  compass: "compass",
  users: "users",
  rocket: "rocket",
  chart: "chart",
  kanban: "kanban",
  bug: "bug",
  palette: "palette",
};

const boardPriorityByName: Record<string, BoardPriorityBadge> = {
  "Customer Feedback": {
    label: "URGENT",
    tone: "urgent",
  },
  "Product Roadmap": {
    label: "HIGH",
    tone: "high",
  },
};

const boardMembersByName: Record<string, BoardMember[]> = {
  "Customer Feedback": [
    { id: "cf-1", name: "Ana Silva" },
    { id: "cf-2", name: "Bruno Costa" },
    { id: "cf-3", name: "Carla Souza" },
    { id: "cf-4", name: "Diego Lima" },
    { id: "cf-5", name: "Eva Martins" },
  ],
  "Marketing Launch": [
    { id: "ml-1", name: "Lucas Almeida" },
    { id: "ml-2", name: "Mariana Rocha" },
    { id: "ml-3", name: "Paulo Nunes" },
  ],
  "Product Roadmap": [
    { id: "pr-1", name: "Fernanda Melo" },
    { id: "pr-2", name: "Rafael Pinto" },
    { id: "pr-3", name: "Sofia Ramos" },
    { id: "pr-4", name: "Tiago Azevedo" },
  ],
};

function mapIcon(icon: string): Board["icon"] {
  const normalizedIcon = icon.trim().toLowerCase();
  return iconMap[normalizedIcon] ?? "compass";
}

function toBoardViewModel(item: BoardApiItem): BoardViewModel {
  return {
    id: item.id,
    title: item.name,
    description: item.description ?? "Sem descrição",
    tasks: item.tasksCount,
    date: new Date(item.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    }),
    icon: mapIcon(item.icon),
    themeColor: item.themeColor,
    priorityBadge: boardPriorityByName[item.name],
    members: boardMembersByName[item.name] ?? [],
  };
}

async function fetchBoards(url: string): Promise<BoardViewModel[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load boards (HTTP ${response.status})`);
  }

  const body = (await response.json()) as BoardsResponse;

  return body.data.map(toBoardViewModel);
}

export function useBoards() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${apiUrl}/boards`,
    fetchBoards,
    {
      shouldRetryOnError: true,
      errorRetryCount: 2,
      revalidateOnFocus: false,
    }
  );

  return {
    boards: data ?? [],
    isLoading,
    isError: Boolean(error),
    isRefreshing: isValidating && !isLoading,
    retry: () => mutate(),
  };
}
