const express = require('express');
const router = express.Router();
const cartRouter = require('./cart');

let orders = [];
let orderId = 1;

router.post('/', (req, res) => {
  const { name, email, address, city, zip, country } = req.body;
  if (!name || !email || !address) {
    return res.status(400).json({ error: 'name, email, and address are required' });
  }

  const cart = cartRouter.getCart();
  if (cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: `ORD-${orderId++}`,
    items: [...cart],
    total,
    customer: { name, email, address, city, zip, country },
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  cartRouter.resetCart();

  res.status(201).json(order);
});

router.get('/', (req, res) => {
  res.json({ orders, total: orders.length });
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

const resetOrders = () => { orders = []; orderId = 1; };

module.exports = router;
module.exports.resetOrders = resetOrders;
