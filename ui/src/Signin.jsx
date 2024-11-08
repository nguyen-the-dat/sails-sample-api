import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // Khai báo state để lưu thông báo lỗi

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:1338/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", data.token);
        navigate("/");
      } else {
        setErrorMessage(data.error || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="signin">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
    </div>
  );
}

export default SignIn;
