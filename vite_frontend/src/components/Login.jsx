import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import "./styling/Login.css"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessage('');
    };

    const submitLogin = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
        };  
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/login/', requestOptions);
            const data = await response.json();
            if (response.status === 401 || response.status === 400) {
            // Error protocol for invalid login
            setErrorMessage("Invalid login credentials.");
            } else if (response.ok) {
            // Protocol for successful login
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            navigate('/home');
            } else {
            setErrorMessage("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage('An error occurred. Please try again.');
        }  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate required fields
        let validationErrors = {};
        if (!formData.email) validationErrors.email = 'Email is required';
        if (!formData.password) validationErrors.password = 'Password is required';
    
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
        } else {
          setErrorMessage('');
          submitLogin();
        }
      };

    return (
        <>
        <Navbar />
        <div className="login-container">
            <div className="login-form">
                <p className="login-text">Login</p>
                <p className="signup-text">Don't have an account? <a href="/signup" className="signup-link">Sign up</a><strong></strong></p>
                <form onSubmit={handleSubmit}>
                    <div className="form-container">
                        <label htmlFor="email" className="form-label">
                            Email<span className="required-asterisk">*</span>
                        </label>
                        <input
                                id="email"
                                type="text"
                                name="email"
                                className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                        />
                        {errors.email && <div className="error-msgs">{errors.email}</div>}
                    </div>
                    <div className="form-container">
                        <label htmlFor="password" className="form-label">
                            Password<span className="required-asterisk">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="error-msgs">{errors.password}</div>}
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    {errorMessage && <div className="error-msgs">{errorMessage}</div>}
                </form>
            </div>
        </div>
        </>    
    );
};

export default Login;