import api from "../api/api";

export async function listar_clientes() {

  const response = await api.get("/listar_cliente/");

  return response.data;
}