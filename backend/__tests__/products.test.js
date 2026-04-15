const request = require('supertest');
const app = require('../app');

describe('Products API', () => {
  describe('GET /api/health', () => {
    it('returns health status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('GET /api/categories', () => {
    it('returns an array of categories', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.categories)).toBe(true);
      expect(res.body.categories.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/products', () => {
    it('returns all products with total count', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('products');
      expect(res.body).toHaveProperty('total');
      expect(Array.isArray(res.body.products)).toBe(true);
      expect(res.body.total).toBe(res.body.products.length);
    });

    it('filters by category', async () => {
      const res = await request(app).get('/api/products?category=dresses');
      expect(res.status).toBe(200);
      res.body.products.forEach(p => expect(p.category).toBe('dresses'));
    });

    it('filters by search query', async () => {
      const res = await request(app).get('/api/products?search=gown');
      expect(res.status).toBe(200);
      expect(res.body.products.length).toBeGreaterThan(0);
    });

    it('returns empty array for non-matching search', async () => {
      const res = await request(app).get('/api/products?search=zzznomatch999');
      expect(res.status).toBe(200);
      expect(res.body.products.length).toBe(0);
    });

    it('sorts by price ascending', async () => {
      const res = await request(app).get('/api/products?sort=price-asc');
      expect(res.status).toBe(200);
      const prices = res.body.products.map(p => p.price);
      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
      }
    });

    it('sorts by price descending', async () => {
      const res = await request(app).get('/api/products?sort=price-desc');
      expect(res.status).toBe(200);
      const prices = res.body.products.map(p => p.price);
      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
      }
    });

    it('filters by minPrice and maxPrice', async () => {
      const res = await request(app).get('/api/products?minPrice=1000&maxPrice=2000');
      expect(res.status).toBe(200);
      res.body.products.forEach(p => {
        expect(p.price).toBeGreaterThanOrEqual(1000);
        expect(p.price).toBeLessThanOrEqual(2000);
      });
    });
  });

  describe('GET /api/products/:id', () => {
    it('returns a product by id', async () => {
      const res = await request(app).get('/api/products/1');
      expect(res.status).toBe(200);
      expect(res.body.id).toBe('1');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('price');
      expect(res.body).toHaveProperty('category');
    });

    it('returns 404 for non-existent product', async () => {
      const res = await request(app).get('/api/products/999');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
