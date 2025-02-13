const axios = require("axios");

export default async function handler(req, res) {
    // Configurar CORS para permitir requisições do Dynamics CRM
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Responder rapidamente a requisições OPTIONS (CORS Preflight)
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    // Pegar o CNPJ da query string
    const { cnpj } = req.query;

    if (!cnpj) {
        return res.status(400).json({ error: "CNPJ é obrigatório" });
    }

    try {
        const apiUrl = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
        const response = await axios.get(apiUrl, {
            headers: { "Accept": "application/json" }
        });

        return res.status(200).json(response.data);
    } catch (error) {
        console.error("Erro ao buscar CNPJ:", error.message);

        return res.status(500).json({
            error: "Erro ao buscar CNPJ",
            message: error.response?.data || error.message,
        });
    }
}
