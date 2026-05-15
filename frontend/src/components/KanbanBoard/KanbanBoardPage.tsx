import { Page } from "../Page/Page";
import { Header } from "../Header/Header";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { Ellipsis, Plus } from "lucide-react";
import "./kanban-board-page.css";

type Task = {
  id: number;
  title: string;
  description: string;
  isDone?: boolean;
};

type Column = {
  id: string;
  title: string;
  tone: "todo" | "progress" | "done";
  tasks: Task[];
};

const columns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tone: "todo",
    tasks: [
      {
        id: 2,
        title: "Prepare email copy",
        description: "Write launch email sequence.",
      }
    ],
  },
  {
    id: "todo",
    title: "To Do",
    tone: "todo",
    tasks: [],
  },
  {
    id: "done",
    title: "Done",
    tone: "done",
    tasks: [
      {
        id: 1,
        title: "Define campaign audience",
        description:
          "Segment target users for the campaign",
      },
    ],
  },
];

export function KanbanBoardPage() {
  return (
    <Page>
      <div className="kanban-board-top">
        <Header
          title="Developer Sprint #42"
          description="Simplified task management for active development cycles."
        />
        <Button className="create-task-button" type="button" variant="primary">
          Create New Task
        </Button>
      </div>

      <section className="kanban-columns" aria-label="Kanban board columns">
        {columns.map((column) => (
          <Card key={column.id} className={`kanban-column kanban-column-${column.tone}`}>
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

            <div className="kanban-column-tasks">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className={`kanban-task-card ${task.isDone ? "kanban-task-card-done" : ""}`}
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
