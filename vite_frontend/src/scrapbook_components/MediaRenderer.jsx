import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'; 
import { Rnd } from 'react-rnd';
import { getMediaList, updateMedia } from '../utils/media';

const MediaRenderer = () => {
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

    return (
        <div className="editor-container">
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
                    // onDragStop={(e, data) =>  updateMedia(media.id)}
                    onDragStop={(e, data) =>  setPosition(media.id, data.x, data.y)}
                    // onResizeStop={(e, direction, ref, delta, position) => updateMedia(media.id)}
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
            ))}
        </div>
    );
}

export default MediaRenderer;
