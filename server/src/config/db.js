const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTIONLIMIT
});

const executeQuery = async (query, values) => {
  const connection = await pool.getConnection();
  try {
    const [rows, fields] = await connection.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  executeQuery,
  pool,
}
