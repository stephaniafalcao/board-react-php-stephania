import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { CreateBoardPage } from "./components/CreateBoardPage/CreateBoardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards" replace />} />
      <Route path="/boards" element={<Dashboard />} />
      <Route path="/boards/new" element={<CreateBoardPage />} />
    </Routes>
  );
}
