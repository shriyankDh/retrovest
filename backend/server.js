// backend/server.js
import express from 'express';
import cors from 'cors';
import yahooFinance from 'yahoo-finance2'; // Import the default export

const app = express();
app.use(cors());

app.get('/api/quote', async (req, res) => {
  const symbols = req.query.symbols;
  if (!symbols) {
    return res.status(400).json({ error: 'Missing symbols query parameter.' });
  }
  
  const symbolArray = symbols.split(',');
  try {
    const result = await yahooFinance.quote(symbolArray);
    res.json({ quoteResponse: { result } });
  } catch (error) {
    console.error('Error fetching data from yahoo-finance2:', error);
    res.status(500).json({ error: 'Failed to fetch data from Yahoo Finance.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
