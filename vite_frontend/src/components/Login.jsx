import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setUsernameError('');
        setErrorMessage('');
    };

    const submitLogin = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: formData.username,
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
        if (!formData.username) validationErrors.username = 'Username is required';
        if (!formData.password) validationErrors.password = 'Password is required';
    
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
        } else {
          submitLogin();
        }
      };

    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username" className="form-label">
                    Username<span className="required-asterisk">*</span>
                </label>
                <input
                        type="text"
                        className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                />
                <label htmlFor="password" className="form-label">
                    Password<span className="required-asterisk">*</span>
                </label>
                <input
                    type="password"
                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
        </>    
    );
};

export default Login;