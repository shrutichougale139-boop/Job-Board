import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api";
import { AuthContext } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resumeLink, setResumeLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => setError("Failed to load job"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await API.post("/applications", { jobId: id, resumeLink });
      alert("Applied successfully!");
      setResumeLink("");
    } catch (err) {
      setError(err.response?.data?.message || "Application failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="job-details">
      <h1>{job.title}</h1>
      <p className="company">{job.company}</p>
      <p className="location">📍 {job.location}</p>
      <div className="description">
        <h3>Description</h3>
        <p>{job.description}</p>
      </div>

      {user?.role === "seeker" && (
        <form onSubmit={handleApply} className="apply-form">
          <h3>Apply for this job</h3>
          <input
            type="url"
            placeholder="Resume Link (URL)"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            required
          />
          <button type="submit">Submit Application</button>
        </form>
      )}
    </div>
  );
}