import { useParams } from 'react-router-dom';

// Fetch and display all albums
export const getAlbums = async () => {
    const token = localStorage.getItem("access_token");
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };  
    try {
        const response = await fetch("http://127.0.0.1:8000/scrapbook/albums/display/", requestOptions);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Could not fetch albums:", error);
    }
};

export const getPages = async (albumId) => {
    const token = localStorage.getItem("access_token");
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response =  await fetch(`http://127.0.0.1:8000/scrapbook/albums/${albumId}/pages/`, requestOptions);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Could not fetch pages:", error);
    }  
}

export const getPage = async (albumId, order) => {
    const token = localStorage.getItem("access_token");
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response =  await fetch(`http://127.0.0.1:8000/scrapbook/albums/${albumId}/pages/${order}`, requestOptions);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Could not fetch page:", error);
    }  
}