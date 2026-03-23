const { Pool, types } = require('pg');
require('dotenv').config();

// Force node-postgres to parse PostgreSQL NUMERIC (OID 1700) types cleanly into JS floats natively bypassing string-casting 
types.setTypeParser(1700, function(val) {
  return parseFloat(val);
});

// Assuming DATABASE_URL is stored in the .env file containing the PostgreSQL connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err, client) => {
  console.error('[DB] Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
