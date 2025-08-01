import { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import ProgressForm from "./components/ProgressForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [progressList, setProgressList] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const loadProgress = () => {
    axios.get("http://localhost:8080/api/progress/user")
      .then(res => setProgressList(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const filteredList = selectedTag
    ? progressList.filter(p =>
        (p.tags || "").split(" ").map(t => t.replace("#", "")).includes(selectedTag)
      )
    : progressList;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{
        textAlign: "center",
        background: "linear-gradient(90deg, #3a7bd5, #5e35b1)",
        WebkitBackgroundClip: "text",
        color: "transparent"
      }}>
        🌟 Learning Progress Tracker
      </h1>

      {/* Progress Form */}
      <ProgressForm onAdded={loadProgress} />

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/progress")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3a7bd5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          📋 View All Progress
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#5e35b1",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          📊 Dashboard
        </button>
      </div>

      {/* ToastContainer */}
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </div>
  );
}

export default App;
