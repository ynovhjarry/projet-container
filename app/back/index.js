const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { Client } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_ENABLED = !!process.env.POSTGRES_HOST;
let client = null;
const inMemory = [];

async function initDB() {
  if (!DB_ENABLED) return;
  client = new Client({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB || 'appdb',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  });
  await client.connect();
  await client.query('CREATE TABLE IF NOT EXISTS items (id VARCHAR PRIMARY KEY, text TEXT)');
}
initDB().catch(err => { console.error('DB init error', err); });

app.get('/healthz', (req, res) => res.send('ok'));

app.get('/items', async (req, res) => {
  if (client) {
    const r = await client.query('SELECT id,text FROM items ORDER BY id');
    return res.json(r.rows);
  } else {
    return res.json(inMemory);
  }
});

app.post('/items', async (req, res) => {
  const id = uuidv4();
  const text = req.body.text || '';
  if (client) {
    await client.query('INSERT INTO items (id,text) VALUES($1,$2)', [id,text]);
  } else {
    inMemory.push({id,text});
  }
  res.status(201).json({id,text});
});

app.delete('/items/:id', async (req, res) => {
  const id = req.params.id;
  if (client) {
    await client.query('DELETE FROM items WHERE id=$1', [id]);
    return res.status(204).send();
  } else {
    const i = inMemory.findIndex(x => x.id === id);
    if (i >= 0) inMemory.splice(i,1);
    return res.status(204).send();
  }
});

// ⚡ Export app pour les tests
module.exports = app;

// ⚡ Démarrage du serveur uniquement si exécuté directement
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log('Server listening on', port));
}
