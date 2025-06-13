import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new sqlite3.Database(':memory:');

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/us-colleges-and-universities.json'), 'utf8')
);

const datadomain = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/gerado-college-domain.json'), 'utf8')
);

db.serialize(() => {
  db.run(`
    CREATE TABLE colleges (
      objectid TEXT PRIMARY KEY,
      ipedsid TEXT,
      name TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      zip TEXT,
      zip4 TEXT,
      telephone TEXT,
      type TEXT,
      status TEXT,
      population TEXT,
      county TEXT,
      countyfips TEXT,
      country TEXT,
      latitude REAL,
      longitude REAL,
      naics_code TEXT,
      naics_desc TEXT,
      source TEXT,
      sourcedate TEXT,
      val_method TEXT,
      val_date TEXT,
      website TEXT,
      stfips TEXT,
      cofips TEXT,
      sector TEXT,
      level TEXT,
      hi_offer TEXT,
      deg_grant TEXT,
      locale TEXT,
      close_date TEXT,
      merge_id TEXT,
      alias TEXT,
      size_set TEXT,
      inst_size TEXT,
      pt_enroll TEXT,
      ft_enroll TEXT,
      tot_enroll TEXT,
      housing TEXT,
      dorm_cap TEXT,
      tot_emp TEXT,
      shelter_id TEXT,
      geo_lat REAL,
      geo_lon REAL
    )
  `);

  var stmt = db.prepare(`
    INSERT INTO colleges VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `);

  data.forEach((c) => {
    stmt.run([
      c.objectid,
      c.ipedsid,
      c.name,
      c.address,
      c.city,
      c.state,
      c.zip,
      c.zip4,
      c.telephone,
      c.type,
      c.status,
      c.population,
      c.county,
      c.countyfips,
      c.country,
      parseFloat(c.latitude),
      parseFloat(c.longitude),
      c.naics_code,
      c.naics_desc,
      c.source,
      c.sourcedate,
      c.val_method,
      c.val_date,
      c.website,
      c.stfips,
      c.cofips,
      c.sector,
      c.level,
      c.hi_offer,
      c.deg_grant,
      c.locale,
      c.close_date,
      c.merge_id,
      c.alias,
      c.size_set,
      c.inst_size,
      c.pt_enroll,
      c.ft_enroll,
      c.tot_enroll,
      c.housing,
      c.dorm_cap,
      c.tot_emp,
      c.shelter_id,
      c.geo_point_2d?.lat || null,
      c.geo_point_2d?.lon || null
    ]);
  });

  stmt.finalize();

  db.run(`
  CREATE TABLE college_domains(
      objectid VARCHAR(255),
      mpowerfinance TINYINT DEFAULT 0,
      CPT TINYINT DEFAULT 0
      )`
    );

    stmt = db.prepare(`
      INSERT INTO college_domains VALUES (?,?,?)
      `);

  datadomain.forEach((d) =>{
      stmt.run([
        d.objectid,
        d.mpowerfinance,
        d.CPT
      ])
  });

});

export default db;
