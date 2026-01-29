import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Task Reminder Application</h1>

      <p className="home-description">
        Never miss a deadline. Create tasks, set reminders, and receive
        automated email alerts.
      </p>

      <div className="home-actions">
        <button className="home-btn primary" onClick={() => navigate("/login")}>
          Login
        </button>

        <span className="home-or">or</span>

        <button
          className="home-btn secondary"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
