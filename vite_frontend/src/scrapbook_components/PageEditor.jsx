import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import { getPage } from '../utils/albums';

const PageEditor = () => {
    // const navigate = useNavigate();
    const { albumId, order } = useParams();
    const [page, setPage] = useState(null);

    useEffect(() => {
              const loadPage = async () => {
                  try {
                      const data = await getPage(albumId, order);
                      setPage(data);
                  } catch (error) {
                      console.error("Could not fetch page:", error);
                  }
              };
              loadPage();
          }, [albumId, order]);

    return (
        <div className="page-container">
             {page ? (
                    // <Link to={`/albums/${album.id}/pages/`} key={album.id}>
                    <div className="page-card">
                        <div className="page-card-title">{page.name}</div> 
                        Created on {new Date(page.date_created).toLocaleDateString()}
                    </div>
            ) : (
            <p>No pages found. Create your first page!</p>
            )}  
        </div>
    );
}

export default PageEditor;