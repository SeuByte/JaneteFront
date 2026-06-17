const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Importações necessárias do seu projeto
const Cliente = require('../models/Cliente');
const authMiddleware = require('../middlewares/authMiddleware'); // O middleware que injeta o req.usuarioId baseado no JWT

// Rota PUT para alteração de senha segura
router.put('/cliente/alterar-senha', authMiddleware, async (req, res) => {
  const { senhaAtual, novaSenha } = req.body;

  // Validação simples de campo vazio
  if (!senhaAtual || !novaSenha) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos correspondentes à senha.' });
  }

  // Validação do tamanho da senha nova
  if (novaSenha.length < 6) {
    return res.status(400).json({ mensagem: 'A nova senha deve possuir no mínimo 6 caracteres.' });
  }

  try {
    // Procura o cliente utilizando o ID extraído do Token JWT
    const cliente = await Cliente.findById(req.usuarioId);

    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }

    // Compara se a senha antiga digitada é igual à cadastrada criptografada
    const senhaValida = await bcrypt.compare(senhaAtual, cliente.senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: 'A senha atual digitada está incorreta.' });
    }

    // Compara se a nova senha não é idêntica à atual
    const mesmaSenha = await bcrypt.compare(novaSenha, cliente.senha);
    if (mesmaSenha) {
      return res.status(400).json({ mensagem: 'A nova senha não pode ser idêntica à senha atual.' });
    }

    // Geração do Hash seguro para a nova senha
    const salt = await bcrypt.genSalt(10);
    const hashSenha = await bcrypt.hash(novaSenha, salt);

    // Substitui e salva no banco de dados MongoDB
    cliente.senha = hashSenha;
    await cliente.save();

    return res.status(200).json({ mensagem: 'Senha alterada com sucesso!' });

  } catch (error) {
    console.error('Erro ao atualizar senha no servidor:', error);
    return res.status(500).json({ mensagem: 'Erro interno no servidor ao tentar redefinir senha.' });
  }
});

module.exports = router;