import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ProgressCharts = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/progress/user")
      .then((res) => {
        setProgressData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load progress data:", err);
      });
  }, []);

  // === Doughnut: Completed vs Others ===
  const total = progressData.length;
  const completed = progressData.filter(p => p.priority === "Completed").length;
  const notCompleted = total - completed;

  const doughnutData = {
    labels: ["Completed", "Others"],
    datasets: [
      {
        data: [completed, notCompleted],
        backgroundColor: ["#2ecc71", "#9b59b6"],
        hoverOffset: 6,
      },
    ],
  };

  // === Bar: Count by Priority ===
  const countByPriority = {
    "To Do": 0,
    "In Progress": 0,
    "Completed": 0,
  };
  progressData.forEach((item) => {
    if (countByPriority[item.priority] !== undefined) {
      countByPriority[item.priority]++;
    }
  });

  const barData = {
    labels: Object.keys(countByPriority),
    datasets: [
      {
        label: "Progress Count",
        data: Object.values(countByPriority),
        backgroundColor: ["#f39c12", "#e67e22", "#2ecc71"],
      },
    ],
  };

  // === Line: Updates Over Time (by day) ===
  const countByDate = {};
  progressData.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    countByDate[date] = (countByDate[date] || 0) + 1;
  });

  const sortedDates = Object.keys(countByDate).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const lineData = {
    labels: sortedDates,
    datasets: [
      {
        label: "Updates Per Day",
        data: sortedDates.map((date) => countByDate[date]),
        borderColor: "#3a7bd5",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="signup-container" style={{ flexDirection: "column", gap: "40px" }}>
      <div className="signup-card" style={{ maxWidth: "800px" }}>
        <h2 className="signup-title">🟢 Completion Ratio</h2>
        <Doughnut data={doughnutData} />
      </div>

      <div className="signup-card" style={{ maxWidth: "800px" }}>
        <h2 className="signup-title">📊 Priority Breakdown</h2>
        <Bar data={barData} />
      </div>

      <div className="signup-card" style={{ maxWidth: "800px" }}>
        <h2 className="signup-title">📈 Daily Update Activity</h2>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default ProgressCharts;
