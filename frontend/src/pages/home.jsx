import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";

export default function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [apiFailed, setApiFailed] = useState(false);

  const staticCourses = [
    {
      _id: 1,
      title: "React Basics",
      description: "Learn React from scratch.",
      price: 99,
    },
    {
      _id: 2,
      title: "Node.js Backend",
      description: "Build REST APIs.",
      price: 89,
    },
    {
      _id: 3,
      title: "Full Stack Project",
      description: "Complete MERN project.",
      price: 149,
    },
    {
      _id: 4,
      title: "JavaScript Essentials",
      description: "Master JavaScript.",
      price: 79,
    },
    {
      _id: 5,
      title: "CSS Flexbox & Grid",
      description: "Responsive design.",
      price: 59,
    },
    {
      _id: 6,
      title: "Database Basics",
      description: "MongoDB & SQL.",
      price: 69,
    },
  ];

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get("/courses");
        setCourses(res.data);
        setApiFailed(false);
      } catch (err) {
        console.error("API Failed. Loading static courses.");
        setCourses(staticCourses);
        setApiFailed(true);
      }
    }
    fetchCourses();
  }, []);

  function handleView(courseId) {
    navigate(`/courses/${courseId}`);
  }

  return (
    <div className="home">
      <header className="header">
        <h1>NOVINTIX</h1>
        <p>Your Online Learning Portal</p>
        {apiFailed && (
          <p style={{ fontSize: "14px" }}>
            ⚠ API Offline – Showing Demo Courses
          </p>
        )}
      </header>

      <h2>Available Courses</h2>

      <div className="grid">
        {courses.map((course) => (
          <div className="card" key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p className="price">Price: ₹{course.price || 99}</p>
            <button onClick={() => handleView(course._id)}>View Course</button>
          </div>
        ))}
      </div>

      <style>{`
        .home {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          font-family: Segoe UI;
          color: white;
          text-align: center;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 25px;
          max-width: 1100px;
          margin: auto;
          color: #333;
        }

        .card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        button {
          padding: 10px 18px;
          background: #764ba2;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
