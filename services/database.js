const mysql = require('mysql2/promise');

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'opendental',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

async function query(sql, params) {
  const pool = getPool();
  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function testConnection() {
  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
}

module.exports = { getPool, query, testConnection };
