import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ModernCss.css"; // Make sure this has your ShutterSpace CSS

export default function ProgressForm({ onAdded }) {
    const navigate = useNavigate();
    const [templateType, setTemplateType] = useState("");
    const [formData, setFormData] = useState({
        tutorialName: "",
        keyTakeaway: "",
        timeSpent: "",
        skillName: "",
        howILearned: "",
        myTip: "",
        generalWork: "",
        progressMade: "",
        feeling: "",
        tags: "",
        privacy: "Public",
        priority: "To Do"
    });

    const isFormValid = () => {
        if (!templateType) return false;
        if (templateType === "Completed Tutorial" && (!formData.tutorialName || !formData.keyTakeaway || !formData.timeSpent)) return false;
        if (templateType === "Learned New Skill" && (!formData.skillName || !formData.howILearned || !formData.myTip)) return false;
        if (templateType === "General Update" && (!formData.generalWork || !formData.progressMade || !formData.feeling)) return false;
        return true;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let finalData = {
            templateType,
            title: "",
            description: "",
            tags: formData.tags,
            privacy: formData.privacy,
            priority: formData.priority
        };

        if (templateType === "Completed Tutorial") {
            finalData.title = formData.tutorialName;
            finalData.description = `Key Takeaway: ${formData.keyTakeaway} | Time Spent: ${formData.timeSpent}`;
        } else if (templateType === "Learned New Skill") {
            finalData.title = formData.skillName;
            finalData.description = `How I Learned: ${formData.howILearned} | Tip: ${formData.myTip}`;
        } else if (templateType === "General Update") {
            finalData.title = formData.generalWork;
            finalData.description = `Progress: ${formData.progressMade} | Feeling: ${formData.feeling}`;
        }

        toast.dismiss();

        axios.post("http://localhost:8080/api/progress", finalData)
            .then(() => {
                toast.success("✅ Progress Added Successfully!", { autoClose: 2000 });
                onAdded();
                setTemplateType("");
                setFormData({
                    tutorialName: "",
                    keyTakeaway: "",
                    timeSpent: "",
                    skillName: "",
                    howILearned: "",
                    myTip: "",
                    generalWork: "",
                    progressMade: "",
                    feeling: "",
                    tags: "",
                    privacy: "Public",
                    priority: "To Do"
                });
                navigate("/progress");
            })
            .catch(err => {
                toast.error("❌ Failed to add progress. Please try again.", { autoClose: 2000 });
                console.error(err);
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-card" style={{ maxWidth: "700px" }}>
                <h2 className="signup-title">📝 Share Your Learning Progress</h2>

                <form onSubmit={handleSubmit}>
                    {/* Template Type Dropdown */}
                    <div className="form-group form-row">
                        <label style={{ flex: "1", marginRight: "12px" }}>Template Type</label>
                        <select
                            className="skill-level"
                            style={{ flex: "2" }}
                            value={templateType}
                            onChange={(e) => setTemplateType(e.target.value)}
                            required
                        >
                            <option value="">-- Select Template --</option>
                            <option value="Completed Tutorial">Completed Tutorial</option>
                            <option value="Learned New Skill">Learned a New Skill</option>
                            <option value="General Update">General Update</option>
                        </select>
                    </div>


                    {/* Conditional Fields */}
                    {templateType === "Completed Tutorial" && (
                        <>
                            <div className="form-group">
                                <input type="text" name="tutorialName" placeholder="Tutorial Name" value={formData.tutorialName} onChange={handleChange} required style={{ width: "70%" }} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="keyTakeaway" placeholder="Key Takeaway" value={formData.keyTakeaway} onChange={handleChange} required style={{ width: "70%" }} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="timeSpent" placeholder="Time Spent (e.g., 2 hours)" value={formData.timeSpent} onChange={handleChange} required style={{ width: "70%" }} />
                            </div>
                        </>
                    )}

                    {templateType === "Learned New Skill" && (
                        <>
                            <div className="form-group">
                                <input type="text" name="skillName" placeholder="Skill Name" value={formData.skillName} onChange={handleChange} required style={{ width: "70%" }} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="howILearned" placeholder="How I Learned" value={formData.howILearned} onChange={handleChange} required style={{ width: "70%" }} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="myTip" placeholder="My Tip for Others" value={formData.myTip} onChange={handleChange} required style={{ width: "70%" }} />
                            </div>
                        </>
                    )}

                    {templateType === "General Update" && (
                        <>
                            <div className="form-group">
                                <input type="text" name="generalWork" placeholder="Today I worked on..." value={formData.generalWork} onChange={handleChange} required style={{ width: "70%" }} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="progressMade" placeholder="Progress Made" value={formData.progressMade} onChange={handleChange} required style={{ width: "70%" }} />
                            </div>
                            <div className="form-group form-row">
                                <label style={{ flex: "1", marginRight: "12px" }}>How do you feel?</label>
                                <select
                                    name="feeling"
                                    value={formData.feeling}
                                    onChange={handleChange}
                                    className="skill-level"
                                    style={{ flex: "2" }}
                                    required
                                >
                                    <option value="">-- Select Feeling --</option>
                                    <option value="😄 Confident">😄 Confident</option>
                                    <option value="😐 Neutral">😐 Neutral</option>
                                    <option value="😕 Confused">😕 Confused</option>
                                </select>
                            </div>

                        </>
                    )}

                    {templateType && (
                        <div className="form-group">
                            <input
                                type="text"
                                name="tags"
                                placeholder="#tags (comma-separated)"
                                value={formData.tags}
                                onChange={handleChange}
                                style={{ width: "70%" }}
                            />
                        </div>
                    )}


                    {/* Privacy Dropdown */}
                    <div className="form-group form-row">
                        <label style={{ flex: "1", marginRight: "12px" }}>Privacy</label>
                        <select
                            name="privacy"
                            value={formData.privacy}
                            onChange={handleChange}
                            className="skill-level"
                            style={{ flex: "2" }}
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="Mentor Only">Mentor Only</option>
                        </select>
                    </div>

                    {/* Priority Dropdown */}
                    <div className="form-group form-row">
                        <label style={{ flex: "1", marginRight: "12px" }}>Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="skill-level"
                            style={{ flex: "2" }}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="signup-button" disabled={!isFormValid()}>
                        ➕ Post Update
                    </button>
                </form>
                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        </div>
    );
}
