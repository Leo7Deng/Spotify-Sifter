import React, { useState, useEffect } from 'react';
import PlaylistDisplay from './PlaylistDisplay';
import './PlaylistSelect.css';

function PlaylistSelect() {
    const [playlists, setPlaylists] = useState([]);

    const getPlaylistsUrl = process.env.NODE_ENV === 'production' 
        ? 'https://spotifysifter.up.railway.app/get_playlists' 
        : 'http://localhost:8889/get_playlists';

    useEffect(() => {
        fetch(getPlaylistsUrl, {
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            setPlaylists(data);
        })
        .catch(error => {
            console.error('Error fetching playlists:', error);
        });
    }, [getPlaylistsUrl]);

    return (
        <div>
            {playlists.map(playlist => (
                <PlaylistDisplay 
                    key={playlist.id} 
                    playlist={playlist} 
                    isChecked={playlist.selected}
                />
            ))}
        </div>
    );
}

export default PlaylistSelect;
