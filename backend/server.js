const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 4100;

app.use(express.json());

// Configuração do banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dw3_Trab01',
  password: 'postdba',
  port: 5432,
});

// Rota para inserir dados no banco de dados
app.post('/inserirConta', async (req, res) => {
  const { descricaoConta, valorConta } = req.body;

  try {
    const query = 'INSERT INTO contas (descricao, valor) VALUES ($1, $2)';
    const values = [descricaoConta, valorConta];

    await pool.query(query, values);

    res.json({ message: 'Inserção bem-sucedida' });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro na inserção' });
  }
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});
