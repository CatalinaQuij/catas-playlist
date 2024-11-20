const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());


let songs = [
  { id: 1, title: 'GOSSIP', artist: 'Maneskin', duration: '3:45', imageUrl: 'https://i.pinimg.com/enabled_lo_mid/736x/22/de/22/22de227863c746fcc55308985080345a.jpg' },
  { id: 2, title: 'Narcisista por Excelencia', artist: 'Pxndx', duration: '4:00', imageUrl: 'https://i.pinimg.com/enabled_lo_mid/736x/19/c7/0d/19c70d99fa08e67febf7cd0f850695a2.jpg' }
];

app.use(express.json());

app.get('/songs', (req, res) => {
  res.status(200).json(songs);
});

app.post('/songs', (req, res) => {
  const { title, artist, duration, imageUrl } = req.body;
  const newSong = { id: songs.length + 1, title, artist, duration, imageUrl };
  songs.push(newSong);  // Agregar la canción a la lista
  res.status(201).json(newSong); 
});

app.listen(port, () => {
  console.log(`API de canciones escuchando en http://localhost:${port}`);
});