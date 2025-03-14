export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://orgfc2c51d8.crm2.dynamics.com"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const { cnpj } = req.query;

  if (!cnpj) {
    return res.status(400).json({ error: 'CNPJ é obrigatório' });
  }

  const apiUrl = `https://receitaws.com.br/v1/cnpj/${cnpj}`;

  fetch(apiUrl, {
    headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).json({ error: 'Erro ao buscar CNPJ', details: err.message });
    });
}
