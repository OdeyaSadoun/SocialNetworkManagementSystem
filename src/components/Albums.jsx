import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Albums({ userId }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.log('Error fetching albums:', error);
      }
    };

    if (userId) {
      fetchAlbums();
    }
  }, [userId]);

  return (
    <>
      <h1>Albums List</h1>
      {albums.length > 0 ? (
        albums.map(album => (
          <div key={album.id}>
            <Link to={`/Albums/${album.id}`}>{album.title}</Link>
          </div>
        ))
      ) : (
        <p>No albums found for the user.</p>
      )}
    </>
  );
}

export default Albums;
