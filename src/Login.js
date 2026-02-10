import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // CAPTCHA states
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const navigate = useNavigate();

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let captchaText = "";
    for (let i = 0; i < 6; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captchaText);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // CAPTCHA validation
    if (captchaInput !== captcha) {
      setCaptchaError("Invalid CAPTCHA");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    setCaptchaError("");

    try {
      const res = await fetch("https://localhost:44364/api/Account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        navigate("/Division");
      } else {
        alert(data.message || "Invalid login");
        generateCaptcha();
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "0px" }}>
      <div className="login-page">
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

          {/* CAPTCHA Display */}
          <div style={{ margin: "10px 0" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                letterSpacing: "3px",
                background: "#eee",
                padding: "8px",
                display: "inline-block"
              }}
            >
              {captcha}
            </div>
            <button
              type="button"
              onClick={generateCaptcha}
              style={{ marginLeft: "10px" }}
            >
              🔄
            </button>
          </div>

          <input
            type="text" maxLength={6}
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />

          {captchaError && (
            <p style={{ color: "red", fontSize: "14px" }}>{captchaError}</p>
          )}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
