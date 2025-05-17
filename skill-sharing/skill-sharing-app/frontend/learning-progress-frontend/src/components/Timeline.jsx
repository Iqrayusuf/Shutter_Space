import React from "react";

export default function Timeline({ progressList }) {
    // Group by priority
    const priorities = ["Completed", "In Progress", "To Do"];
    const grouped = priorities.map(priority => ({
        priority,
        items: progressList.filter(p => p.priority === priority)
    }));

    return (
        <div>
            <h2>🕒 Timeline View</h2>
            {progressList.length === 0 ? (
                <p style={{ color: "#ccc" }}>No progress updates found.</p>
            ) : (
                <div style={{ borderLeft: "2px solid #444", paddingLeft: "10px" }}>
                    {grouped.map(group =>
                        group.items.length > 0 && (
                            <div key={group.priority} style={{ marginBottom: "30px" }}>
                                <h3 style={{ color: "#2ecc71", marginBottom: "10px" }}>{group.priority}</h3>
                                {group.items.map(p => (
                                    <div key={p.id} style={{ marginBottom: "20px", position: "relative" }}>
                                        <div style={{
                                            width: "15px", height: "15px",
                                            background: "#3a7bd5",
                                            borderRadius: "50%",
                                            position: "absolute",
                                            left: "-8px",
                                            top: "5px"
                                        }}></div>
                                        <h4 style={{ color: "#fff" }}>{p.title}</h4>
                                        <p style={{ color: "#ccc" }}>{p.description}</p>
                                        <small style={{ color: "#999" }}>{p.privacy}</small>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

