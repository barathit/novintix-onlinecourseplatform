import React, { useState, useContext } from "react";
import axios from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("/auth/login", { email, password });
    login(res.data.token, res.data.user);
    navigate("/");
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>

      <style>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f2f2f2;
        }

        form {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        input {
          padding: 8px;
          border: 1px solid #ccc;
        }

        button {
          padding: 10px;
          background: black;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
