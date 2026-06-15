const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const uri = "mongodb://localhost:27017";
const dbName = "Teste";

let db;

async function start() {
  const client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);
  console.log("🔥 Conectado ao MongoDB");

  // rota teste
  app.get("/", (req, res) => {
    res.send("API rodando 🚀");
  });

  // listar produtos
  app.get("/produtos", async (req, res) => {
    try {
      const produtos = await db.collection("produtos").find().toArray();
  
      // 🔥 CORREÇÃO AQUI (formata tudo antes de enviar)
      const formatados = produtos.map(p => ({
        _id: p._id,
        Nome: p.Nome,
        Estoque: Number(p.Estoque),
        Unidade: p.Unidade,
        Grupo: p.Grupo,
  
        // garante 2 casas SEM perder o zero
        Valor_venda: Number(p.Valor_venda).toFixed(2),
        Preco_100g: Number(p.Preco_100g).toFixed(2)
      }));
  
      res.json(formatados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

start();