import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>

      <Link to={`/courses/${course._id}`} className="btn">
        View
      </Link>

      <style>{`
        .card {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 8px;
          text-align: left;
        }

        .btn {
          display: inline-block;
          margin-top: 10px;
          padding: 6px 12px;
          background: black;
          color: white;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
