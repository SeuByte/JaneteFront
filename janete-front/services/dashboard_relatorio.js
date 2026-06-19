import api from "../api/api";

export async function getDashboardStats() {

  try {
    const response = await api.get("/dashboard_relatorio/");
    return response.data.data;

  } catch (error) {
    console.error(
      "Erro ao buscar dashboard:",
      error
    );
    throw error;
  }
}