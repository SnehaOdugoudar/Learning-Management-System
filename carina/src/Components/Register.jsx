import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

function Register() {

  const [role, setRole] = useState("STUDENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  async function save(event) {
    event.preventDefault();
    // Check if any field is empty
    if (!name.trim() || !email.trim() || !password.trim() || role === "Choose the role") {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("/api/auth/signup", {
        name: name,
        role: role,
        email: email,
        password: password,
      });
      alert("Registration Successful! Please login.");
      navigate(`/login`);  // Adjusted to ensure consistency with login path
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(`Registration failed: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        setError("Registration failed: No response from server. Please try again later.");
      } else {
        setError("Registration failed: " + err.message);
      }
    }
  }

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <header className="header bg-secondary p-5" style={{ width: "100%", position: "fixed", top: "0", textAlign: "center" }}>
      </header>
      <div className="container mt-4 d-flex flex-column align-items-center flex-grow-1">
        <div className="card" style={{ width: "500px" }}>
          <h2 className="card-header text-center">Registration</h2>
          <div className="card-body">
            <form onSubmit={save}>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select className="form-control" id="role" value={role} onChange={handleRoleChange}>
                <option value="Choose the role" >Choose the role</option>
                  <option value="STUDENT">STUDENT</option>
                  <option value="FACULTY">FACULTY</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name">Username</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Username"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              {error && <p className="text-danger">{error}</p>}
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary mt-4">Signup</button>
                <Link to="/login" className="btn btn-primary mt-4">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="footer bg-secondary p-3" style={{ width: "100%", position: "fixed", bottom: "0", textAlign: "center" }}>
        <p>@GoTeam2024</p>
      </footer>
    </div>
  );
}

export default Register;
