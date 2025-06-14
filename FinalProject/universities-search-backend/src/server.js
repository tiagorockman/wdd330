import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

var queryBase = "SELECT c.*,d.mpowerfinance, d.CPT, d.URank, d.Tuition_and_fees FROM colleges c LEFT JOIN college_domains d ON c.objectid = d.objectid";

// Lista tudo
app.get('/api/colleges', (req, res) => {
  db.all(`${queryBase} LIMIT 10`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Busca por nome (query: ?name=xxx)
app.get('/api/colleges/search', (req, res) => {
  const name = req.query.name || '';
  db.all(
   `${queryBase} WHERE c.name LIKE ?`,
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
