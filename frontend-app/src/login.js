import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css'; // Ensure your custom CSS is imported

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const response = await axios.post('http://localhost:8081/login', {
                email,
                password,
            });
            console.log(response.data); // Handle the response as needed
            
            // Show success alert
            alert('Login successful! Welcome back!');

            // Optionally, reset form fields
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('There was an error logging in!', error);
            // Show error alert
            alert('Error logging in: ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card shadow-lg p-4 rounded animate__animated animate__fadeIn" style={{ width: '400px' }}>
                <h2 className="text-center mb-4 text-primary">Log in</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Log In
                    </button>
                    <div className="text-center">
                    <a href="/signup" className="text-muted hover:text-primary transition duration-200">Don't have an account? Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;