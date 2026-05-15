import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { CreateBoardPage } from "./components/CreateBoardPage/CreateBoardPage";
import { KanbanBoardPage } from "./components/KanbanBoard/KanbanBoardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards" replace />} />
      <Route path="/boards" element={<Dashboard />} />
      <Route path="/boards/new" element={<CreateBoardPage />} />
      <Route path="/boards/kanban" element={<KanbanBoardPage />} />
    </Routes>
  );
}
