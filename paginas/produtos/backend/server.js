const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const dbName = "Teste";

let db;

// exporta o db para as routes usarem
async function start() {
  const client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);
  console.log("🔥 MongoDB conectado");

  // injeta o db nas rotas
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  // rotas
  const produtosRoutes = require("./routes/produtos");
  const clientesRoutes = require("./routes/clientes");

  app.use(express.static("frontend"));
  app.use("/produtos", produtosRoutes);
  app.use("/clientes", clientesRoutes);

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

start();