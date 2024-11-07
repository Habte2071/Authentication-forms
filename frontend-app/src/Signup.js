import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Import your custom CSS if needed

const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const response = await axios.post('http://localhost:8081/signup', {
                firstname,
                lastname,
                email,
                password,
            });
            console.log(response.data); // Handle the response as needed
            
            alert('Signup successful! Welcome, ' + firstname + '!');

            // Reset form fields
            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('There was an error signing up!', error);
            alert('Error signing up: ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card shadow-lg p-4 rounded" style={{ width: '400px' }}>
                <h2 className="text-center mb-4 text-primary">Create Account</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            className="form-control"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            className="form-control"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email"
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
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Sign Up
                    </button>
                    <div className="text-center">
                        <a href="/login" className="text-muted">Already have an account? Log In</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;