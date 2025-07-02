import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'; 
import { Rnd } from 'react-rnd';
import MediaContext from '../context/MediaContext';
import { getMediaList, updateMedia, createTextMedia, deleteTextMedia } from '../utils/media';

const MediaRenderer = ({ children }) => {
    const [mediaList, setMediaList] = useState([]);
    const { albumId, pageId } = useParams();

    useEffect(() => {
                  const loadMediaList = async () => {
                      try {
                          const data = await getMediaList(albumId, pageId);
                          setMediaList(data);
                      } catch (error) {
                          console.error("Could not fetch media list:", error);
                      }
                  };
                  loadMediaList();
              }, [albumId, pageId]);

    const setPosition = (mediaId, x, y) => {
        setMediaList(prev => 
            prev.map(media => media.id === mediaId ? { ...media, x, y } : media)
        );
        updateMedia(mediaId, { x, y });
    }

    const setSize = (mediaId, width, height, x, y) => {
    setMediaList(prev => 
            prev.map(media => media.id === mediaId ? { ...media, width, height, x, y } : media)
        );
        updateMedia(mediaId, { width, height, x, y });
    }

    const handleTextCreation = async () => {
        try {
            const data = await createTextMedia(albumId, pageId);
            setMediaList(prev => [...prev, data]);
        }
        catch (error) {
            console.error("Could not create media:", error);
        }
    }

    const handleTextUpdate = async () => {
    }

    const handleTextDeletion = async (mediaId) => {
        try {
            const data = await deleteTextMedia(mediaId);
            setMediaList(prev => prev.filter(media => media.id !== mediaId));
        }
        catch (error) {
            console.error("Could not delete media:", error);
        }
    }

    const contextValues = {
    mediaList,
    setMediaList,
    handleTextCreation,
    handleTextDeletion,
    setPosition,
    setSize,
  };

    return (
        <MediaContext.Provider value={contextValues}>
            <div>
                {children}
            </div>
        </MediaContext.Provider>
        
    );
}

export default MediaRenderer;
