import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

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
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <label>First Name:</label>
            <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
            />
            <label>Last Name:</label>
            <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <label>Confirm Password:</label>
            <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
            />
            <button type="submit">Sign Up</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
        </>    
    );
};

export default Signup;