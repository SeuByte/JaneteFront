const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const clientes = await req.db.collection("clientes").find().toArray();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

module.exports = router;