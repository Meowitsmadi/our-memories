import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'; 
import { Rnd } from 'react-rnd';
import MediaContext from '../context/MediaContext';
import { getMediaList, updateMedia, createTextMedia } from '../utils/media';

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

    const contextValues = {
    mediaList,
    setMediaList,
    handleTextCreation,
    setPosition,
    setSize,
  };

    return (
        <MediaContext.Provider value={contextValues}>
            <div>
            {/* <div className="editor-container">
                {mediaList.map((media) => (
                    <Rnd key={media.id}
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
                    </Rnd>
                ))} */}
                {children}
            </div>
        </MediaContext.Provider>
        
    );
}

export default MediaRenderer;
