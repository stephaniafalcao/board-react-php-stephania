import { useState, type DragEvent } from "react";
import { Page } from "../Page/Page";
import { Header } from "../Header/Header";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { Ellipsis, Plus } from "lucide-react";
import "./kanban-board-page.css";

type ColumnId = "todo" | "in-progress" | "done";

type Task = {
  id: number;
  title: string;
  description: string;
  isDone?: boolean;
};

type Column = {
  id: ColumnId;
  title: string;
  tone: "todo" | "progress" | "done";
  tasks: Task[];
};

const columnBlueprints: Array<Omit<Column, "tasks">> = [
  {
    id: "todo",
    title: "To Do",
    tone: "todo",
  },
  {
    id: "in-progress",
    title: "In Progress",
    tone: "progress",
  },
  {
    id: "done",
    title: "Done",
    tone: "done",
  },
];

function ensureAllColumns(columns: Column[]): Column[] {
  return columnBlueprints.map((blueprint) => {
    const matchingColumn = columns.find((column) => column.id === blueprint.id);

    return {
      ...blueprint,
      tasks: matchingColumn?.tasks ?? [],
    };
  });
}

const initialColumns: Column[] = ensureAllColumns([
  {
    id: "todo",
    title: "To Do",
    tone: "todo",
    tasks: [
      {
        id: 2,
        title: "Prepare email copy",
        description: "Write launch email sequence.",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tone: "done",
    tasks: [
      {
        id: 1,
        title: "Define campaign audience",
        description: "Segment target users for the campaign",
        isDone: true,
      },
    ],
  },
]);

function moveTaskToColumn(
  columns: Column[],
  taskId: number,
  sourceColumnId: ColumnId,
  targetColumnId: ColumnId
): Column[] {
  const safeColumns = ensureAllColumns(columns);

  if (sourceColumnId === targetColumnId) {
    return safeColumns;
  }

  const sourceColumn = safeColumns.find((column) => column.id === sourceColumnId);
  const targetColumn = safeColumns.find((column) => column.id === targetColumnId);

  if (!sourceColumn || !targetColumn) {
    return safeColumns;
  }

  const taskToMove = sourceColumn.tasks.find((task) => task.id === taskId);

  if (!taskToMove) {
    return safeColumns;
  }

  const taskWithUpdatedStatus = {
    ...taskToMove,
    isDone: targetColumn.tone === "done",
  };

  return safeColumns.map((column) => {
    if (column.id === sourceColumnId) {
      return {
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      };
    }

    if (column.id === targetColumnId) {
      return {
        ...column,
        tasks: [...column.tasks, taskWithUpdatedStatus],
      };
    }

    return column;
  });
}

export function KanbanBoardPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [sourceColumnId, setSourceColumnId] = useState<ColumnId | null>(null);
  const [activeDropColumnId, setActiveDropColumnId] = useState<ColumnId | null>(null);

  const clearDragState = () => {
    setDraggedTaskId(null);
    setSourceColumnId(null);
    setActiveDropColumnId(null);
  };

  const handleTaskDragStart = (
    event: DragEvent<HTMLElement>,
    taskId: number,
    columnId: ColumnId
  ) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(taskId));

    setDraggedTaskId(taskId);
    setSourceColumnId(columnId);
    setActiveDropColumnId(columnId);
  };

  const handleColumnDragOver = (
    event: DragEvent<HTMLElement>,
    targetColumnId: ColumnId
  ) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    if (activeDropColumnId !== targetColumnId) {
      setActiveDropColumnId(targetColumnId);
    }
  };

  const handleColumnDrop = (
    event: DragEvent<HTMLElement>,
    targetColumnId: ColumnId
  ) => {
    event.preventDefault();

    if (draggedTaskId === null || sourceColumnId === null) {
      clearDragState();
      return;
    }

    setColumns((previousColumns) =>
      moveTaskToColumn(previousColumns, draggedTaskId, sourceColumnId, targetColumnId)
    );

    clearDragState();
  };

  const renderedColumns = ensureAllColumns(columns);

  return (
    <Page>
      <div className="page-section-toolbar">
        <Header
          title="Developer Sprint #42"
          description="Simplified task management for active development cycles."
        />
        <Button className="create-task-button page-section-action" type="button" variant="primary">
          Create New Task
        </Button>
      </div>

      <section className="kanban-columns" aria-label="Kanban board columns">
        {renderedColumns.map((column) => (
          <Card
            key={column.id}
            className={`kanban-column kanban-column-${column.tone} ${
              activeDropColumnId === column.id ? "kanban-column-drop-active" : ""
            }`}
            onDragOver={(event) => handleColumnDragOver(event, column.id)}
            onDrop={(event) => handleColumnDrop(event, column.id)}
          >
            <div className="kanban-column-header">
              <div className="kanban-column-title">
                <h2>{column.title}</h2>
                <span>{column.tasks.length}</span>
              </div>

              <Button
                type="button"
                className="kanban-column-menu"
                aria-label={`Open ${column.title} options`}
              >
                <Ellipsis size={16} strokeWidth={2.4} />
              </Button>
            </div>

            <div
              className={`kanban-column-tasks ${
                activeDropColumnId === column.id ? "kanban-column-tasks-drop-active" : ""
              }`}
              onDragOver={(event) => handleColumnDragOver(event, column.id)}
              onDrop={(event) => handleColumnDrop(event, column.id)}
            >
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className={`kanban-task-card ${
                    task.isDone ? "kanban-task-card-done" : ""
                  } ${draggedTaskId === task.id ? "kanban-task-card-dragging" : ""}`}
                  draggable
                  onDragStart={(event) => handleTaskDragStart(event, task.id, column.id)}
                  onDragEnd={clearDragState}
                >
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </Card>
              ))}
            </div>

            <button type="button" className="kanban-add-task">
              <Plus size={14} strokeWidth={2.4} />
              Add Task
            </button>
          </Card>
        ))}
      </section>
    </Page>
  );
}
