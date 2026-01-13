import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Find Your Dream Job</h1>
      <p>Search and apply for your next big opportunity.</p>
      <Link to="/jobs"><button>Browse Jobs</button></Link>
    </div>
  );
}
