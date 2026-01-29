import { useState } from "react";
import AddTask from "../Components/AddTask";
import "./Dashboard.css";
import MyTasks from "../Components/MyTasks";
export default function Dashboard() {
  const [active, setActive] = useState("add");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-logo">Task Reminder</h2>

        <button
          className={active === "add" ? "active" : ""}
          onClick={() => setActive("add")}
        >
          ➕ Add Task
        </button>

        <button
          className={active === "list" ? "active" : ""}
          onClick={() => setActive("list")}
        >
          📋 My Tasks
        </button>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {active === "add" && <AddTask />}
        {active === "list" && <MyTasks />}
      </main>
    </div>
  );
}
