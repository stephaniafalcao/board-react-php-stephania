import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";

const apiUrl = import.meta.env.VITE_API_URL ?? '/api';

export default function App() {
  return <Dashboard />;
}
