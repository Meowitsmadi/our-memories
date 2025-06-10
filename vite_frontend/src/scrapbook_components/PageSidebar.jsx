import React from "react";
import { useNavigate } from 'react-router-dom';
import "./styling/PageSidebar.css"

const PageSidebar = () => {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/home");
    };

    return (
        <div className="sidebar-container">
            <button onClick={navigateHome} className="sidebar-option">Back to Albums</button>
            <button className="sidebar-option">Rename Album</button>
            <button className="sidebar-option">Edit Cover Image</button>
            <button className="sidebar-option">Create New Page</button>
            <button className="sidebar-option">Upload Image</button>
            <button className="sidebar-option">Add Text</button>
        </div>
    );
}

export default PageSidebar;