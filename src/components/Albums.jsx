import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from "../App";
import { useContext } from "react";

function Albums() {

  const userId = useContext(userContext).id;
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
  }, []);

  return (
    <>
      <h1>Albums List</h1>
      {albums.length > 0 ? (
        albums.map(album => (
          <div key={album.id}>
            <Link to={`/${userId}/Albums/${album.id}/Photos`}>{album.title}</Link>
          </div>
        ))
      ) : (
        <p>No albums found for the user.</p>
      )}
    </>
  );
}

export default Albums;
