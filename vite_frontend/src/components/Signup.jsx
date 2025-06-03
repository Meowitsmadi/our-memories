import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "./styling/Signup.css"

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
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
        // validationErrors = {};
    };

    const submitSignup = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              first_name: formData.first_name,
              last_name: formData.last_name,
              password: formData.password,
            }),
        };  
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/signup/', requestOptions);
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                navigate('/home');
            } else {
                setErrorMessage(data.error || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage('An error occurred. Please try again.');
        }  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            setErrorMessage('Password and Confirm Password do not match.');
            return;
        }
        submitSignup()
    }

    return (
        <>
        <Navbar />

        <div className="signup-container">
            <div className="signup-form">
                <p className="signup-text2">Sign Up</p>
                <p className="login-text2">Already have an account? <a href="/login" className="login-link2">Login</a><strong></strong></p>
                <form onSubmit={handleSubmit}>
                    <div className="signup-form-container">
                        <label htmlFor="email" className="form-label">
                            Email<span className="required-asterisk">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-container">
                        <label htmlFor="first_name" className="form-label">
                            First Name<span className="required-asterisk">*</span>
                        </label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            className="form-control"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-container">
                        <label htmlFor="last_name" className="form-label">
                            Last Name<span className="required-asterisk">*</span>
                        </label>
                        <input
                            id="last_name"
                            type="text"
                            name="last_name"
                            className="form-control"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-container">
                        <label htmlFor="password" className="form-label">
                            Password<span className="required-asterisk">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="signup-form-container">
                        <label htmlFor="confirm_password" className="form-label">
                            Confirm Password<span className="required-asterisk">*</span>
                        </label>
                        <input
                            type="password"
                            name="confirm_password"
                            className="form-control"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                    {errorMessage && <div className="error-msgs">{errorMessage}</div>}
                    </form>
            </div>
        </div>
        </>    
    );
};

export default Signup;