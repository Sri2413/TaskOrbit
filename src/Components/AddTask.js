import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Addtask.css";

export default function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    datetime: "",
    email: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  // Phone validation
  const isValidPhone = (phone) => /^\+91\d{10}$/.test(phone);

  // Get current datetime for min attribute in input
  const now = new Date();
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16); // YYYY-MM-DDTHH:MM format

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return toast.error("Session expired. Please login again.");

    if (!task.datetime)
      return toast.error("Please select reminder date & time");

    const selectedTime = new Date(task.datetime);
    const now = new Date();
    selectedTime.setSeconds(0, 0);
    now.setSeconds(0, 0);

    if (selectedTime.getTime() <= now.getTime()) {
      return toast.error("Please select a future date and time");
    }

    if (task.phone && !isValidPhone(task.phone)) {
      return toast.error("Phone must be in format +91XXXXXXXXXX");
    }

    const payload = {
      title: task.title.trim(),
      description: task.description.trim(),
      remainderAt: selectedTime.toISOString(),
      email: task.email?.trim() || undefined,
      phone: task.phone?.trim() || undefined,
    };

    console.log("PAYLOAD:", payload);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("Task saved:", response.data);
      toast.success("Task added successfully");

      // Reset form
      setTask({
        title: "",
        description: "",
        datetime: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      console.error("Error saving task:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Failed to add task");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="addtask-page">
        <div className="addtask-card">
          <h2 className="addtask-title">Add New Task</h2>

          <form onSubmit={handleSubmit} className="addtask-form">
            <input
              className="addtask-input"
              name="title"
              placeholder="Task title"
              value={task.title}
              onChange={handleChange}
              required
            />

            <textarea
              className="addtask-textarea"
              name="description"
              placeholder="Description"
              value={task.description}
              onChange={handleChange}
            />

            <input
              className="addtask-input"
              type="datetime-local"
              name="datetime"
              value={task.datetime}
              min={localISOTime} // restrict past dates
              onChange={handleChange}
              required
            />

            <input
              className="addtask-input"
              type="email"
              name="email"
              placeholder="Email for reminder (optional)"
              value={task.email}
              onChange={handleChange}
            />

            <input
              className="addtask-input"
              name="phone"
              placeholder="Phone for SMS (+91XXXXXXXXXX)"
              value={task.phone}
              onChange={handleChange}
            />

            <button type="submit" className="addtask-btn">
              Save Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
