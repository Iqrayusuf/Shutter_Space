export default function Timeline({ progressList }) {
    return (
        <div>
            <h2>🕒 Timeline View</h2>
            <div style={{ borderLeft: "2px solid #444", paddingLeft: "10px" }}>
                {progressList.map(p => (
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
        </div>
    );
}

