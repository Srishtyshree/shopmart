const express = require('express');
const router = express.Router();

let cart = [];

router.get('/', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart, total, count: cart.length });
});

router.post('/', (req, res) => {
  const { productId, name, price, image, size, quantity = 1 } = req.body;
  if (!productId || !name || price === undefined) {
    return res.status(400).json({ error: 'productId, name, and price are required' });
  }

  const existing = cart.find(i => i.productId === productId && i.size === size);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, name, price, image, size, quantity });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.status(201).json({ items: cart, total, count: cart.length });
});

router.put('/:productId', (req, res) => {
  const { productId } = req.params;
  const { size } = req.query;
  const { quantity } = req.body;

  const item = cart.find(i => i.productId === productId && i.size === size);
  if (!item) return res.status(404).json({ error: 'Item not in cart' });

  if (quantity <= 0) {
    cart = cart.filter(i => !(i.productId === productId && i.size === size));
  } else {
    item.quantity = quantity;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart, total, count: cart.length });
});

// Clear entire cart — must come before /:productId to avoid conflict
router.delete('/clear', (req, res) => {
  cart = [];
  res.json({ items: [], total: 0, count: 0 });
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  const { size } = req.query;
  const before = cart.length;
  cart = cart.filter(i => !(i.productId === productId && i.size === size));

  if (cart.length === before) {
    return res.status(404).json({ error: 'Item not in cart' });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart, total, count: cart.length });
});

const resetCart = () => { cart = []; };
const getCart = () => cart;

module.exports = router;
module.exports.resetCart = resetCart;
module.exports.getCart = getCart;
