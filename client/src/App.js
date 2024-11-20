import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/songs')
      .then(response => {
        setSongs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las canciones:', error);
        setLoading(false);
      });
  }, []);

  const addSong = (title, duration, artist, imageUrl) => {
    const newSong = { title, duration, artist, imageUrl };

    axios.post('http://localhost:5000/songs', newSong)
      .then(response => {
        setSongs([...songs, response.data]); 
      })
      .catch(error => {
        console.error('Error al agregar la canción:', error);
      });
  };

  const removeSong = (id) => {
    const updatedSongs = songs.filter((song) => song.id !== id);
    setSongs(updatedSongs);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App" style={{ backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <div style={{ backgroundColor: '#1db954', padding: '40px 20px', textAlign: 'center', borderBottom: '3px solid #1a8e46' }}>
        <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold', margin: '0' }}>Cata&apos;s Playlist! &lt;3</h1>
      </div>

      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {songs.map((song) => (
          <div key={song.id} style={{ display: 'flex', marginBottom: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', padding: '20px', alignItems: 'center' }}>
            <img src={song.imageUrl} alt="song cover" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px' }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>{song.title}</h3>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>{song.artist}</p>
              <p style={{ color: '#888', fontSize: '0.85rem' }}>{song.duration}</p>
            </div>
            <button onClick={() => removeSong(song.id)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 18px', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
          </div>
        ))}
      </div>

      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Add a New Song</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const duration = e.target.duration.value;
          const artist = e.target.artist.value;
          const imageUrl = e.target.imageUrl.value;
          addSong(title, duration, artist, imageUrl);
          e.target.reset();
        }}>
          <input type="text" name="title" placeholder="Song Title" required style={{ marginBottom: '15px', padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input type="text" name="duration" placeholder="Duration (e.g., 3:45)" required style={{ marginBottom: '15px', padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input type="text" name="artist" placeholder="Artist" required style={{ marginBottom: '15px', padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input type="url" name="imageUrl" placeholder="Image URL" required style={{ marginBottom: '20px', padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: '12px 20px', backgroundColor: '#1db954', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Add Song</button>
        </form>
      </div>
    </div>
  );
}

export default App;
