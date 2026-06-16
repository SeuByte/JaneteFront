const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const produtos = await req.db.collection("produtos").find().toArray();

    const formatados = produtos.map(p => ({
      ...p,
      Valor_venda: Number(p.Valor_venda).toFixed(2),
      Preco_100g: Number(p.Preco_100g).toFixed(2)
    }));

    res.json(formatados);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

module.exports = router;