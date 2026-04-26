const express = require('express');
const cors = require('cors');

const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ShopMart API is running' });
});

app.get('/api/categories', (req, res) => {
  const categories = ['dresses', 'tops', 'bottoms', 'outerwear'];
  res.json({ categories });
});

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);

module.exports = app;
