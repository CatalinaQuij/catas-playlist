const express = require('express');
const app = express();
const port = 5000;

let songs = [
  { id: 1, title: 'Song 1', artist: 'Artist 1', duration: '3:45', imageUrl: 'https://i.pinimg.com/736x/69/d9/95/69d995d8148798d66c5bbeaa25a57300.jpg' },
  { id: 2, title: 'Song 2', artist: 'Artist 2', duration: '4:00', imageUrl: 'https://i.pinimg.com/enabled_lo_mid/736x/2e/eb/03/2eeb037642597ab614f247ed2898162a.jpg' }
];

// Middleware para permitir el uso de JSON en los cuerpos de las solicitudes
app.use(express.json());

// Ruta GET para obtener todas las canciones
app.get('/songs', (req, res) => {
  res.status(200).json(songs);
});

// Ruta POST para agregar una nueva canción
app.post('/songs', (req, res) => {
  const { title, artist, duration, imageUrl } = req.body;
  const newSong = { id: songs.length + 1, title, artist, duration, imageUrl };
  songs.push(newSong);
  res.status(201).json(newSong);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API de canciones escuchando en http://localhost:${port}`);
});
