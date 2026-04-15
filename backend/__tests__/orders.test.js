const request = require('supertest');
const app = require('../app');
const cartRouter = require('../routes/cart');
const ordersRouter = require('../routes/orders');

beforeEach(() => {
  cartRouter.resetCart();
  ordersRouter.resetOrders();
});

const customer = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  address: '123 Fashion Ave',
  city: 'New York',
  zip: '10001',
  country: 'US'
};

const addItemToCart = () =>
  request(app).post('/api/cart').send({
    productId: '1',
    name: 'Silk Evening Gown',
    price: 4999,
    image: 'https://example.com/img.jpg',
    size: 'M',
    quantity: 1
  });

describe('Orders API – Integration Tests', () => {
  describe('POST /api/orders', () => {
    it('places an order and returns confirmed status', async () => {
      await addItemToCart();
      const res = await request(app).post('/api/orders').send(customer);
      expect(res.status).toBe(201);
      expect(res.body.id).toMatch(/^ORD-/);
      expect(res.body.status).toBe('confirmed');
      expect(res.body.items).toHaveLength(1);
      expect(res.body.customer.email).toBe(customer.email);
    });

    it('calculates order total correctly', async () => {
      await addItemToCart();
      const res = await request(app).post('/api/orders').send(customer);
      expect(res.body.total).toBe(4999);
    });

    it('clears cart after order is placed', async () => {
      await addItemToCart();
      await request(app).post('/api/orders').send(customer);
      const cartRes = await request(app).get('/api/cart');
      expect(cartRes.body.items).toHaveLength(0);
    });

    it('returns 400 when cart is empty', async () => {
      const res = await request(app).post('/api/orders').send(customer);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('returns 400 when required customer fields are missing', async () => {
      await addItemToCart();
      const res = await request(app).post('/api/orders').send({ name: 'Jane' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/orders', () => {
    it('returns all placed orders', async () => {
      await addItemToCart();
      await request(app).post('/api/orders').send(customer);
      const res = await request(app).get('/api/orders');
      expect(res.status).toBe(200);
      expect(res.body.orders).toHaveLength(1);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('returns a specific order by id', async () => {
      await addItemToCart();
      const orderRes = await request(app).post('/api/orders').send(customer);
      const orderId = orderRes.body.id;
      const res = await request(app).get(`/api/orders/${orderId}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(orderId);
    });

    it('returns 404 for non-existent order', async () => {
      const res = await request(app).get('/api/orders/ORD-999');
      expect(res.status).toBe(404);
    });
  });
});
