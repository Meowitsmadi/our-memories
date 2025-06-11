import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import "./styling/PageEditor.css"
import { getPage } from '../utils/albums';


const PageEditor = () => {
    // const navigate = useNavigate();
    const { albumId, pageId } = useParams();
    const [page, setPage] = useState(null);
    
    useEffect(() => {
              const loadPage = async () => {
                  try {
                      const data = await getPage(albumId, pageId);
                      setPage(data);
                  } catch (error) {
                      console.error("Could not fetch page:", error);
                  }
              };
              loadPage();
          }, [albumId, pageId]);

    return (
        <div className="page-container">
             {page ? (
                    <div className="page-card">
                        <div className="page-title">{page.name}</div> 
                        {/* Created on {new Date(page.date_created).toLocaleDateString()} */}
                    </div>
            ) : (
            <p>No pages found. Create a page from the sidebar!</p>
            )}  
        </div>
    );
}

export default PageEditor;