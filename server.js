const express = require('express');
const cors = require('cors');
const frases = require('./frases.json');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/frases/random', (req, res) => {
  const random = frases[Math.floor(Math.random() * frases.length)];
  res.json(random);
});


app.get('/frases', (req, res) => {
  res.json(frases);
});

app.get('/frases/categoria/:categoria', (req, res) => {
  const { categoria } = req.params;
  const filtradas = frases.filter(
    f => f.categoria.toLowerCase() === categoria.toLowerCase()
  );
  res.json(filtradas);
});

app.get('/frases/buscar', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ erro: 'Informe um termo' });

  const resultado = frases.filter(f =>
    f.frase.toLowerCase().includes(q.toLowerCase())
  );

  res.json(resultado);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
