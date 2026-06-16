import api from "../api/api";

export async function getDashboardStats() {
  try {
    const response = await api.get("/dashboard_relatorio/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    throw error; // Repassa o erro para a página tratar
  }
}