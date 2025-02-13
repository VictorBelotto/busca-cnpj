const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/busca", async (req, res) => {
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
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));