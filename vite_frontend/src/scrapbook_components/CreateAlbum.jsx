import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from "../components/HomeNavbar";
// import { getAlbums } from './utils/getAlbums';

const CreateAlbum = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [coverImg, setCoverImg] = useState(null);
    const navigate = useNavigate();

    const handleAlbumCreation = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("access_token");
        setIsSubmitting(true);

        if (!token) {
            console.error("No access token found");
            setError("User not authenticated.");
            setIsSubmitting(false);
            return;
        } 

        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: (() => {
                const formData = new FormData();
                formData.append('name', name); 
                if (coverImg) {
                    formData.append('cover_img', coverImg); 
                }
                return formData;
            })(),
        };  
        try {
            const response = await fetch("http://127.0.0.1:8000/scrapbook/albums/create/", requestOptions);
            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error details:", JSON.stringify(errorData))
            } else {
                const data = await response.json();
                console.log(data);
                setIsSubmitting(false);
                navigate("/home");   
            }

        } catch (error) {
            console.error("An unexpected error occurred:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <HomeNavbar/>
        <div>
            <form onSubmit={handleAlbumCreation}>
                <label>Name:</label>
                <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {setName(e.target.value);}}
                required
                />
                <div>
                <label>Cover Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImg(e.target.files[0])}
                />
                </div>
                <button type="submit" disabled={isSubmitting}>Create Album</button>
            </form>
            {error && <p>{error}</p>}
        </div>
        </>
    );
};

export default CreateAlbum;