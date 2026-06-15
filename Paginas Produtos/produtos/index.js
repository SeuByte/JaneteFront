const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

// URL do MongoDB (local)
const uri = "mongodb://localhost:27017";

// Nome do banco
const dbName = "Teste";

let db;

// Conectar ao MongoDB
async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log("Conectado ao MongoDB!");
}

connectDB();

// Rota para listar produtos
app.get("/produtos", async (req, res) => {
  try {
    const produtos = await db.collection("produtos").find().toArray();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});