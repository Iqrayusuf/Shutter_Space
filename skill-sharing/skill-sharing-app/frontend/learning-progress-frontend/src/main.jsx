import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import ProgressPage from './pages/ProgressPage.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import Timeline from "./components/Timeline.jsx";
import axios from "axios"; // Add axios import

// TimelinePage wrapper component
function TimelinePage() {
  const [progressList, setProgressList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get("http://localhost:8080/api/progress/user")
      .then(res => setProgressList(res.data))
      .catch(err => console.log(err));
  }, []);

  // Sort by priority: Completed > In Progress > To Do
  const priorityOrder = { "Completed": 0, "In Progress": 1, "To Do": 2 };
  const sortedList = [...progressList].sort((a, b) => {
    return (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99);
  });

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          backgroundColor: "#3a7bd5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        ⬅️ Back
      </button>
      <Timeline progressList={sortedList} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
