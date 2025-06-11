import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import HomeNavbar from "../components/HomeNavbar";
import PageSidebar from "./PageSidebar";
import PageEditor from "./PageEditor";
import MediaRenderer from "./MediaRenderer";
import { useNavigate } from 'react-router-dom';


const AlbumMenu = () => {
    // const navigate = useNavigate();
    const { albumId, pageId } = useParams();
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState("")

    return (
        <div>
            <HomeNavbar />
            <PageSidebar></PageSidebar>
            <PageEditor></PageEditor>
            <MediaRenderer></MediaRenderer>
        </div>
    );
}

export default AlbumMenu;
