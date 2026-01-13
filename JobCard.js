import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="location">📍 {job.location}</p>
      <p className="description">{job.description?.substring(0, 100)}...</p>
      <Link to={`/job/${job._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}