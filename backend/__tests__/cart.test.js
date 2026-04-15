const request = require('supertest');
const app = require('../app');
const cartRouter = require('../routes/cart');

beforeEach(() => {
  cartRouter.resetCart();
});

describe('Cart API', () => {
  const testItem = {
    productId: '1',
    name: 'Silk Evening Gown',
    price: 4999,
    image: 'https://example.com/img.jpg',
    size: 'M',
    quantity: 1
  };

  describe('GET /api/cart', () => {
    it('returns empty cart initially', async () => {
      const res = await request(app).get('/api/cart');
      expect(res.status).toBe(200);
      expect(res.body.items).toEqual([]);
      expect(res.body.total).toBe(0);
      expect(res.body.count).toBe(0);
    });
  });

  describe('POST /api/cart', () => {
    it('adds an item to cart', async () => {
      const res = await request(app).post('/api/cart').send(testItem);
      expect(res.status).toBe(201);
      expect(res.body.items).toHaveLength(1);
      expect(res.body.items[0].productId).toBe('1');
      expect(res.body.count).toBe(1);
    });

    it('increments quantity for duplicate productId + size', async () => {
      await request(app).post('/api/cart').send(testItem);
      const res = await request(app).post('/api/cart').send(testItem);
      expect(res.body.items).toHaveLength(1);
      expect(res.body.items[0].quantity).toBe(2);
    });

    it('adds separate entries for same product in different sizes', async () => {
      await request(app).post('/api/cart').send(testItem);
      const res = await request(app).post('/api/cart').send({ ...testItem, size: 'L' });
      expect(res.body.items).toHaveLength(2);
    });

    it('calculates total correctly', async () => {
      await request(app).post('/api/cart').send(testItem);
      const res = await request(app).post('/api/cart').send({ ...testItem, productId: '2', size: 'S', price: 2499 });
      expect(res.body.total).toBe(4999 + 2499);
    });

    it('returns 400 when required fields are missing', async () => {
      const res = await request(app).post('/api/cart').send({ productId: '1' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/cart/:productId', () => {
    it('removes an item from cart', async () => {
      await request(app).post('/api/cart').send(testItem);
      const res = await request(app).delete('/api/cart/1?size=M');
      expect(res.status).toBe(200);
      expect(res.body.items).toHaveLength(0);
    });

    it('returns 404 if item not in cart', async () => {
      const res = await request(app).delete('/api/cart/999?size=M');
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/cart/clear', () => {
    it('clears the entire cart', async () => {
      await request(app).post('/api/cart').send(testItem);
      await request(app).post('/api/cart').send({ ...testItem, productId: '2', size: 'S' });
      const res = await request(app).delete('/api/cart/clear');
      expect(res.status).toBe(200);
      expect(res.body.items).toEqual([]);
      expect(res.body.total).toBe(0);
    });
  });
});
