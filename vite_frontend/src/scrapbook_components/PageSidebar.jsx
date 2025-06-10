import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./styling/PageSidebar.css"
import 'boxicons'



const PageSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/home");
    };

    return (
        <div className={`sidebar-container ${isOpen ? '' : 'close'}`}>
            <div className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                <box-icon name='menu' color='rgba(255,255,255)' ></box-icon>
            </div>
            <div className="button-container">
                <ul>
                <li onClick={navigateHome} className="sidebar-option">Back to Albums</li>
                <li className="sidebar-option">Rename Album</li>
                <li className="sidebar-option">Edit Cover Image</li>
                <li className="sidebar-option">Create New Page</li>
                <li className="sidebar-option">Upload Image</li>
                <li className="sidebar-option">Add Text</li>
                </ul>
            </div>
            
            






            {/* <button onClick={() => setIsOpen(!isOpen)} className="sidebar-option"><box-icon name='menu' color='rgba(255,255,255)' ></box-icon></button>
            {isOpen && (
                <div className='button-container'>
                    <button onClick={navigateHome} className="sidebar-option">Back to Albums</button>
                    <button className="sidebar-option">Rename Album</button>
                    <button className="sidebar-option">Edit Cover Image</button>
                    <button className="sidebar-option">Create New Page</button>
                    <button className="sidebar-option">Upload Image</button>
                    <button className="sidebar-option">Add Text</button>
                </div>
            )}  */}
        </div>
    );
}

export default PageSidebar;