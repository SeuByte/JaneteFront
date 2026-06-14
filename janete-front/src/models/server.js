const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Usuario = require('./models/Usuario');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.post('/api/cadastro', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);

    res.status(201).json({
      success: true,
      usuario
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3001, () => {
  console.log('API executando');
});