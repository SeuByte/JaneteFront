import api from "../api/api";

export async function listarProdutos() {

  const response = await api.get("/listar-produtos/");

  return response.data;
}