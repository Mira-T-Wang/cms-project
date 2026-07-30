const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./src/config/database');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'CMS API is running!', status: 'OK' });
});

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/sales', require('./src/routes/sales'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n Server running on http://localhost:${PORT}`);
  console.log(` Test it: http://localhost:${PORT}/api/test\n`);
});