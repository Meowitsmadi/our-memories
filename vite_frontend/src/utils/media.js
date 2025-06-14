export const getMediaList = async (albumId, pageId) => {
    const token = localStorage.getItem("access_token");
    const requestOptions = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response =  await fetch(`http://127.0.0.1:8000/scrapbook/albums/${albumId}/pages/${pageId}/media/`, requestOptions);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Could not fetch media list:", error);
    }  
}

export const updateMedia = async (mediaId, updates) => {
    const token = localStorage.getItem("access_token");
    const requestOptions = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
    };
    try {
        console.log(updates)
        const response =  await fetch(`http://127.0.0.1:8000/scrapbook/media/${mediaId}/update/`, requestOptions);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Could not update media:", error);
    }  
}