import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'; 
import "./styling/PageEditor.css"
import { Rnd } from 'react-rnd';
import MediaContext from '../context/MediaContext';
import { getPage } from '../utils/albums';


const PageEditor = () => {
    // const navigate = useNavigate();
    const { albumId, pageId } = useParams();
    const [page, setPage] = useState(null);
    const [clickedMedia, setClickedMedia] = useState(null);
    const { mediaList, setPosition, setSize, handleTextDeletion } = useContext(MediaContext);
    
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
        <div className="editor-container">
            <div className="editor-overlay" onClick={() => setClickedMedia(null)}></div>
            {mediaList.map((media) => (
                <Rnd key={media.id}
                onClick={(e) => {
                    e.stopPropagation();
                    setClickedMedia(media.id);
                }}
                style={{
                    border: media.id === clickedMedia ? "2px solid #403233" : "none",
                }}
                default={{
                x: media.x,
                y: media.y,
                width: media.width,
                height: media.height,
                }}
                position={{ x: media.x, y: media.y }}
                size={{ width: media.width, height: media.height }}
                onDragStop={(e, data) =>  setPosition(media.id, data.x, data.y)}
                onResizeStop={(e, direction, ref, delta, position) => setSize(media.id, parseInt(ref.offsetWidth), parseInt(ref.offsetHeight), parseInt(position.x), parseInt(position.y))}
                >
                    {media.type === "TXT" ? (
                        <div>{media.content}</div>
                    ) :
                    media.type === "IMG" ? (
                        <img
                        src={media.content}
                        alt=""
                    />
                    ) : null}

                {clickedMedia === media.id && (
                    <button className="x-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleTextDeletion(media.id);
                    }}>
                    x
                    </button>
                )}
                </Rnd>
            ))}
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
        </div>    
        
    );
}

export default PageEditor;