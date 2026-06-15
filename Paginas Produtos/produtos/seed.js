const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "Teste";

const produtos = [
  {
    Estoque: 120,
    Nome: "Arroz Integral",
    Unidade: "kg",
    Valor_venda: 6.99,
    Grupo: "Alimentos",
    Preco_100g: 0.69
  },
  {
    Estoque: 80,
    Nome: "Feijão Carioca",
    Unidade: "kg",
    Valor_venda: 7.50,
    Grupo: "Alimentos",
    Preco_100g: 0.75
  },
  {
    Estoque: 200,
    Nome: "Açúcar Refinado",
    Unidade: "kg",
    Valor_venda: 4.20,
    Grupo: "Alimentos",
    Preco_100g: 0.42
  },
  {
    Estoque: 50,
    Nome: "Óleo de Soja",
    Unidade: "L",
    Valor_venda: 6.89,
    Grupo: "Alimentos",
    Preco_100g: 0.68
  },
  {
    Estoque: 30,
    Nome: "Sabonete Dove",
    Unidade: "un",
    Valor_venda: 3.99,
    Grupo: "Higiene",
    Preco_100g: 3.99
  },
  {
    Estoque: 100,
    Nome: "Macarrão Espaguete",
    Unidade: "kg",
    Valor_venda: 5.49,
    Grupo: "Alimentos",
    Preco_100g: 0.54
  },
  {
    Estoque: 60,
    Nome: "Detergente",
    Unidade: "un",
    Valor_venda: 2.79,
    Grupo: "Limpeza",
    Preco_100g: 2.79
  },
  {
    Estoque: 90,
    Nome: "Café Torrado",
    Unidade: "kg",
    Valor_venda: 18.90,
    Grupo: "Alimentos",
    Preco_100g: 1.89
  }
];

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const collection = db.collection("produtos");

    // limpa antes (opcional, mas útil em dev)
    await collection.deleteMany({});

    // insere tudo de uma vez (MUITO rápido)
    await collection.insertMany(produtos);

    console.log("🔥 Seed executado com sucesso!");
  } catch (err) {
    console.error("Erro no seed:", err);
  } finally {
    await client.close();
  }
}

seed();