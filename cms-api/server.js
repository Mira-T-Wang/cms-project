const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const pool = require('./src/config/database');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'CMS API is running!', status: 'OK' });
});

// Rate limiter 
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/sales', require('./src/routes/sales'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n Server running on http://localhost:${PORT}`);
  console.log(` Test it: http://localhost:${PORT}/api/test\n`);
});