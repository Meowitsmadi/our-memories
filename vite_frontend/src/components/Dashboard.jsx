import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import HomeNavbar from "./HomeNavbar";
import "./styling/Dashboard.css"
import { getAlbums } from '../utils/albums';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "../slick-theme.css";


const Dashboard = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const handleNewAlbumClick = () => {
    navigate("/create-album");
  };

  useEffect(() => {
          const loadAlbums = async () => {
              try {
                  const data = await getAlbums();
                  setAlbums(data); 
              } catch (error) {
                  console.error("Could not fetch albums:", error);
              }
          };
          loadAlbums();
      }, []);

  return (
    <div>
      <HomeNavbar />
      <button onClick={handleNewAlbumClick}>Create New Album</button>
      <div className="album-carousel">
        <Slider {...settings}>
            {albums.length > 0 ? (
              albums.map((album) => (
                <Link to={`/albums/${album.id}/pages/`} key={album.id} className="album-card">
                    {album.cover_img ? (
                      <img
                        src={`http://127.0.0.1:8000${album.cover_img}`} // Use the full URL to the media file
                        alt={`${album.name} cover`}
                      />
                    ) : (
                      <p>No cover image</p>
                    )}
                    <div className="album-card-title">{album.name}</div> 
                    Created on {new Date(album.date_created).toLocaleDateString()}
                </Link>
              ))
            ) : (
              <p>No albums found. Create your first album!</p>
            )}
        </Slider>
      </div>
    </div>
  );
}

export default Dashboard;
