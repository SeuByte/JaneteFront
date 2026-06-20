import api from "../api/api";

export async function listar_produtos() {

    try {

        const response = await api.get(
            "produtos/"
        );

        return response.data;

    }

    catch(error) {

        console.error(
            "Erro ao listar produtos:",
            error
        );

        throw error;
    }

}