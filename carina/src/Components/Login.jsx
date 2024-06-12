import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        // Check if email or password is empty
        if (!email.trim()) {
            setError("Please enter your email and password.");
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password.");
            return;
        }

        try {
            const response = await axios.post("https://doctrinalms.victoriouscoast-70b12acf.westus.azurecontainerapps.io/api/auth/login", {
                email: email,
                password: password,
            });

            if (response.data.email && response.data.token) {
                sessionStorage.setItem('userId', response.data.userId);
                sessionStorage.setItem('name', response.data.name);
                sessionStorage.setItem('role', response.data.role);
                sessionStorage.setItem('email', response.data.email);
                sessionStorage.setItem('token', response.data.token);

                if (response.data.role === 'FACULTY') {
                    sessionStorage.setItem('facultyId', response.data.userId);
                    navigate(`/faculty/${response.data.userId}/courses`); // Navigate using facultyId
                } else if (response.data.role === 'STUDENT') {
                    navigate(`/student`);
                } else if (response.data.role === 'ADMIN') {
                    navigate(`/admin`);
                } else {
                   alert('Role not recognized, contact administrator');
                }
            }
        } catch (err) {
            console.error(err);
            
            if (err.response && err.response.status === 401) {
                setError("Incorrect email or password.");
            } else {
                setError("Login failed. Please try again later.");
            }
        }
    }

    return (
        <div className="d-flex flex-column" style={{ minHeight: "50vh" }}>
            <header className="header bg-secondary p-3" style={{ width: "100%", position: "fixed", top: "0", textAlign: "center" }}>
                <p>Login to Your Account</p>
            </header>
            <div className="container mt-4 d-flex flex-column align-items-center flex-grow-1">
                <div className="card" style={{ width: "500px" }}>
                    <h2 className="card-header text-center">Login</h2>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
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

                            <button type="submit" className="btn btn-primary mt-4">Login</button>
                            <Link to="/register" className="btn btn-link mt-4">I'm a new user</Link>
                            {error && <p className="text-danger mt-3">{error}</p>}
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

export default Login;
