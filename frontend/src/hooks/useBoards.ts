import useSWR from "swr";
import { type Board } from "../components/BoardCard/BoardCard";

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
};

function mapColor(themeColor: string): Board["color"] {
  const color = themeColor.toLowerCase();
  if (color.includes("f59e0b")) return "orange";
  if (color.includes("6b7280") || color.includes("9ca3af")) return "gray";
  return "blue";
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
    icon: iconMap[item.icon] ?? "compass",
    color: mapColor(item.themeColor),
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
