import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import HomeNavbar from "../components/HomeNavbar";
import { useNavigate } from 'react-router-dom';
import { getPages } from '../utils/albums';

const AlbumMenu = () => {
    const navigate = useNavigate();
    const { albumId } = useParams();
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState("")

    useEffect(() => {
              const loadPages = async () => {
                  try {
                      const data = await getPages(albumId);
                      setPages(data);
                      setCurrentPage(data[0])

                  } catch (error) {
                      console.error("Could not fetch pages:", error);
                  }
              };
              loadPages();
          }, []);

    return (
        <div>
            <HomeNavbar />
            <button /*onClick={handleNewPageClick} */>Create New Page</button>
            {pages.length > 0 ? (
                pages.map((page) => (
                    // <Link to={`/albums/${album.id}/pages/`} key={album.id}>
                    <div className="page-card">
                        <div className="page-card-title">{page.name}</div> 
                        Created on {new Date(page.date_created).toLocaleDateString()}
                    </div>
                ))
            ) : (
            <p>No pages found. Create your first page!</p>
            )}  
        </div>
    );
}

export default AlbumMenu;
