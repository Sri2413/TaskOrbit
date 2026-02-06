import axios from "axios";
import { useEffect, useState } from "react";
import "./MyTask.css";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://taskorbit-2.onrender.com/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://taskorbit-2.onrender.com/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const updateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://taskorbit-2.onrender.com/api/tasks/${editId}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTasks((prev) =>
        prev.map((task) => (task._id === editId ? res.data : task)),
      );

      setEditId(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="mytask-container">
      <h2 className="mytask-title">My Tasks</h2>

      {tasks.length === 0 && <p className="mytask-empty">No tasks found</p>}

      <div className="mytask-list">
        {tasks.map((task) => (
          <div className="mytask-card" key={task._id}>
            {editId === task._id ? (
              <>
                <input
                  className="mytask-input"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  placeholder="Task title"
                />

                <textarea
                  className="mytask-textarea"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Task description"
                />

                <div className="mytask-actions">
                  <button className="btn save-btn" onClick={updateTask}>
                    Save
                  </button>

                  <button
                    className="btn cancel-btn"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="mytask-card-title">{task.title}</h3>
                <p className="mytask-card-desc">{task.description}</p>

                <div className="mytask-actions">
                  <button
                    className="btn edit-btn"
                    onClick={() => {
                      setEditId(task._id);
                      setEditData({
                        title: task.title,
                        description: task.description,
                      });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn delete-btn"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
