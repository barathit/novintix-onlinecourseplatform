import React, { useState, useContext } from "react";
import axios from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("/auth/register", { name, email, password });
    login(res.data.token, res.data.user);
    navigate("/");
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Register</h2>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Register</button>
      </form>

      <style>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to right, #667eea, #764ba2);
          font-family: Arial, sans-serif;
        }

        .form {
          background: white;
          padding: 25px;
          border-radius: 10px;
          width: 320px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        h2 {
          text-align: center;
          margin-bottom: 10px;
        }

        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #667eea;
        }

        button {
          padding: 10px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        button:hover {
          background: #5a67d8;
        }
      `}</style>
    </div>
  );
}
