const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Fonction pour établir la connexion à la base de données
export async function connect() {
  try {
    await client.connect();
    console.log('Connecté à la base de données');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

// Fonction pour exécuter une requête SQL
export async function query(sql, params) {
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête SQL:', error);
    throw error;
  }
}

// Fonction pour fermer la connexion à la base de données
export async function close() {
  try {
    await client.end();
    console.log('Connexion à la base de données fermée');
  } catch (error) {
    console.error('Erreur lors de la fermeture de la connexion à la base de données:', error);
  }
}

module.exports = { connect, query, close };