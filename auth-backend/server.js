const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.js');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', //has to run the react localhost at port 3000
  credentials: true
}));

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // use true in production with HTTPS
    maxAge: 1000 * 60 * 60, // 1 hour
  }
}));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
