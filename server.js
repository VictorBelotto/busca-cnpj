const axios = require("axios");

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permite acesso de qualquer origem
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Responde ao preflight request do CORS
    }

    const { cnpj } = req.query;

    if (!cnpj) {
        return res.status(400).json({ error: "CNPJ é obrigatório" });
    }

    try {
        const apiUrl = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
        const response = await axios.get(apiUrl, {
            headers: { "Accept": "application/json" }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar CNPJ" });
    }
}
