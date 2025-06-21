import express from 'express';
import cors from 'cors';
import db from './db.js';
import dotenv from 'dotenv';


//configuring to use environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

var queryBase = "SELECT c.*,d.mpowerfinance, d.CPT, d.URank, d.Tuition_and_fees FROM colleges c LEFT JOIN college_domains d ON c.objectid = d.objectid";


app.get('/api/get-api-link', (req, res) => {
  if(!process.env.GOOGLE_MAPS_API_KEY){
    return res.status(500).json({
      error: 'Google Maps API key not configured'
    })
  }
    res.json({ 'mapUrl': `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=LoadMapInfo`});
});

// Lista tudo
app.get('/api/colleges', (req, res) => {
  db.all(`${queryBase} LIMIT 10`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Serch by name (query: ?name=xxx)
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


// Busca por nome (query: ?name=xxx)
app.get('/api/collegedomain', (req, res) => {
  const name = req.query.name || '';
  db.all(
   `Select * from college_domains`, [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`API online: http://localhost:${PORT}`);
});


app.get('/api/colleges/filter', (req, res) => {
  const {
    query,
    state,
    type,
    tuitionRange,
    cptDayOne,
    mpowerEligible,
    ranking
  } = req.query;

  console.log("filter");

  let sql = queryBase;
  let conditions = [];
  let params = [];

  // Search query filter (name, location, or programs)
  if (query && query.trim()) {
    conditions.push(`(
      c.name LIKE ? OR 
      c.city LIKE ? OR 
      c.state LIKE ? 
    )`);
    const searchTerm = `%${query.trim()}%`;
      console.log("searchTerm", searchTerm);
    params.push(searchTerm, searchTerm, searchTerm);
  }

  // State filter
  if (state && state !== 'all') {
    conditions.push('c.state = ?');
       console.log("state", state);
    params.push(state);
  }

  // Type filter (assuming you have a type column in colleges table)
  if (type && type !== 'all') {
    conditions.push('c.type = ?');
    console.log("type", type);
    
    var typeFilter = 0;
    if(type == "Private"){
      typeFilter = 2;
    }else if(type == "Public"){
      typeFilter = 1;
    }else{
      typeFilter = 3 //Community College
    }

    params.push(typeFilter);
     console.log("typeParam", typeFilter);
  }

  // Tuition range filter
  if (tuitionRange && tuitionRange !== 'any') {
     console.log("tuitionRange", tuitionRange);
    switch (tuitionRange) {
      case 'under30k':
        conditions.push('CAST(d.Tuition_and_fees AS INTEGER) < 30000');
        break;
      case '30k-50k':
        conditions.push('CAST(d.Tuition_and_fees AS INTEGER) >= 30000 AND CAST(d.Tuition_and_fees AS INTEGER) <= 50000');
        break;
      case 'over50k':
        conditions.push('CAST(d.Tuition_and_fees AS INTEGER) > 50000');
        break;
    }
  }

  // CPT Day One filter
  if (cptDayOne === 'true') {
      console.log("cptDayOne");
    conditions.push('d.CPT = 1');
  }

  // MPOWER Eligible filter
  if (mpowerEligible === 'true') {
     console.log("mpowerEligible");
    conditions.push('d.mpowerfinance = 1');
  }

  // Ranking filter
  if (ranking && ranking !== 'any') {
    switch (ranking) {
      case 'top50':
        conditions.push('CAST(d.URank AS INTEGER) <= 50 AND d.URank IS NOT NULL AND d.URank != ""');
        break;
      case 'top100':
        conditions.push('CAST(d.URank AS INTEGER) <= 100 AND d.URank IS NOT NULL AND d.URank != ""');
        break;
      case 'top200':
        conditions.push('CAST(d.URank AS INTEGER) <= 200 AND d.URank IS NOT NULL AND d.URank != ""');
        break;
      case 'ranked':
        conditions.push('d.URank IS NOT NULL AND d.URank != ""');
        break;
    }
  }

  // Build final query
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // Add ordering (optional - you can customize this)
  sql += ' ORDER BY c.name ASC';

  // Add limit to prevent overwhelming results (optional)
  sql += ' LIMIT 10';

  console.log('Executing SQL:', sql);
  console.log('With params:', params);

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    
    console.log(`Found ${rows.length} results`);
    res.json(rows);
  });
});