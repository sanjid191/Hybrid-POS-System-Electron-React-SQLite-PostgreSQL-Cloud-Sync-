const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase direct connections
});

async function runSetup() {
  console.log('[Setup] Connecting to Supabase PostgreSQL database...');
  try {
    const sqlPath = path.join(__dirname, 'init.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');

    const client = await pool.connect();
    console.log('[Setup] Connected! Running schema migrations...');
    
    await client.query(sqlScript);
    console.log('[Setup] Migrations completed successfully. Cloud DB is ready!');
    
    client.release();
  } catch (err) {
    console.error('[Setup Error]', err);
  } finally {
    pool.end();
  }
}

runSetup();
