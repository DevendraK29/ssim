import { useNavigate } from "react-router-dom";
import "../styles/Login.css"
import { useState } from "react";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate()

 const handleLogin = async () => {
  setError(false);

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Login failed
      setError(true);
      return;
    }

    // Login success
    alert("Login successful!");
    console.log("Logged in user:", data.user);

    // You can store user info if you want (optional for now)
    // localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    setError(true);
  }
};


  return (
    <div className="login-page">
      <div className="left">
        <div className="mock">
          <h1>SSIM</h1>
          <p><b>Stationery Store Inventory Management</b></p>
          <p><i>Manage sales, stock, and reports easily.</i></p>
        </div>
      </div>

      <div className="right">
        <div className="login-box">
          <h2>Sign in to SSIM</h2>

          {error && <div className="error">Invalid email or password</div>}

          <input
            type="text"
            className="field"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="row">
            <a href="#">Forgot Password?</a>
          </div>

          <button className="btn" onClick={handleLogin}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
