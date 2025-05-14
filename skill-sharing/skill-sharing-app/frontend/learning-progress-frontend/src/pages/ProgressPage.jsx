import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import ProgressCard from "../components/ProgressCard";
import ProgressCharts from "../components/ProgressCharts";


export default function ProgressPage() {
    const [progressList, setProgressList] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        axios.get("http://localhost:8080/api/progress/user")
            .then(res => setProgressList(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#222", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}>
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
            <h1 style={{ color: "#fff", background: "linear-gradient(90deg, #3a7bd5, #5e35b1)", WebkitBackgroundClip: "text", color: "transparent" }}>📋 All Progress Updates</h1>
            {progressList.map(p => (
                <ProgressCard key={p.id} progress={p} onDelete={() => {
                    axios.get("http://localhost:8080/api/progress/user")
                        .then(res => setProgressList(res.data))
                        .catch(err => console.log(err));
                }} />
            ))}
        </div>
    );
}
