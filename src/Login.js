import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔴 IMPORTANT

    try {
      console.log("Submitting login");

      const res = await fetch("https://localhost:44364/api/Account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log("API response:", data);

      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
      navigate("/components/Menu");
        //alert("Login successful");
      } else {
        alert(data.message || "Invalid login");
      }

    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <Link to="/ludo">
            <button type="button">Go to Ludo Game</button>
          </Link>
           {/* <Link to="/StudentForm">
            <button type="button">Go to Add Student</button>
          </Link> */}
          <Link to="/components/Menu">
            <button type="button">Go to Menu</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
