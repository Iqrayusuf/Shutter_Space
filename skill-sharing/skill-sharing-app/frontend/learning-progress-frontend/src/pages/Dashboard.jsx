import React from "react";
import ProgressCharts from "../components/ProgressCharts";
import "../styles/ModernCss.css"; // Your ShutterSpace theme
import { useNavigate } from "react-router-dom"; // Add this import

const Dashboard = () => {
  const navigate = useNavigate(); // Add this line

  return (
    <div className="signup-container" style={{ flexDirection: "column", gap: "32px" }}>
      {/* Back to Form Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          backgroundColor: "#3a7bd5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease"
        }}
      >
        ⬅️ Back to Form
      </button>
      <div className="signup-card" style={{ maxWidth: "800px", marginBottom: "20px" }}>
        <h2 className="signup-title">📊 Learning Progress Dashboard</h2>
        <p style={{ textAlign: "center", color: "#aaa", fontSize: "15px", marginTop: "-10px" }}>
          Track your goals, analyze trends, and stay motivated.
        </p>
      </div>

      <ProgressCharts />
    </div>
  );
};

export default Dashboard;
