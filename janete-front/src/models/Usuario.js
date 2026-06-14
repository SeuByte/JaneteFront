const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario'); // Ajuste o caminho do model se necessário

const cadastrarUsuario = async (req, res) => {
  try {
    const {
      perfil,
      cnpjCpf,
      nomeCompleto,
      dataNascimento,
      telefone,
      email,
      senha,
      cobrancaIgual,
      // Desestruturando os campos soltos do endereço que vêm do frontend
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado
    } = req.body;

    // 1. Validação básica de segurança
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    // 2. Verificar se o e-mail já está cadastrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Este e-mail já está em uso.' });
    }

    // 3. Criptografar a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // 4. Limpar formatação do CPF/CNPJ (remover pontos, traços e barras)
    const cnpjCpfLimpo = cnpjCpf ? cnpjCpf.replace(/\D/g, '') : '';

    // 5. Montar o documento estruturado exatamente como o Schema espera
    const novoUsuario = new Usuario({
      perfil,
      cnpjCpf: cnpjCpfLimpo,
      nomeCompleto,
      dataNascimento,
      telefone,
      cobrancaIgual,
      email,
      senha: senhaHash,
      // Aqui acontece a mágica: agrupando os dados no subobjeto correto
      endereco: {
        cep: cep ? cep.replace(/\D/g, '') : '', // Salva apenas os números do CEP
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado
      }
    });

    // 6. Salvar no Banco de Dados
    await novoUsuario.save();

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar o cadastro.' });
  }
};

module.exports = { cadastrarUsuario };