require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const seed = require('./seed');

async function resetDatabase() {
  let connection;
  try {
    console.log('Reinitialisation complete de la base de donnees...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      multipleStatements: true
    });

    await connection.query(sql);
    console.log('Schema SQL execute avec succes.');
    await connection.end();
    connection = null;

    console.log('Lancement du seeder...');
    await seed();
    console.log('Reinitialisation et seeding termines avec succes.');
  } catch (error) {
    console.error('Erreur lors de la reinitialisation :', error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

resetDatabase();
