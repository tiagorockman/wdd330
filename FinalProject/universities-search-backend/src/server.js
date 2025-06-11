import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Lista tudo
app.get('/api/colleges', (req, res) => {
  db.all('SELECT * FROM colleges LIMIT 100', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Busca por nome (query: ?name=xxx)
app.get('/api/colleges/search', (req, res) => {
  const name = req.query.name || '';
  db.all(
    'SELECT * FROM colleges WHERE name LIKE ?',
    [`%${name}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`API online: http://localhost:${PORT}`);
});
