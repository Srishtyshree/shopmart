import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as api from '../services/api';

// Mock fetch globally
const mockFetch = (data, ok = true) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    json: () => Promise.resolve(data)
  });
};

beforeEach(() => { vi.clearAllMocks(); });
afterEach(() => { vi.restoreAllMocks(); });

describe('API Service', () => {
  describe('getProducts', () => {
    it('calls /products endpoint', async () => {
      mockFetch({ products: [], total: 0 });
      await api.getProducts();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/products'),
        expect.any(Object)
      );
    });

    it('appends query params when provided', async () => {
      mockFetch({ products: [], total: 0 });
      await api.getProducts({ category: 'dresses', sort: 'price-asc' });
      const url = global.fetch.mock.calls[0][0];
      expect(url).toContain('category=dresses');
      expect(url).toContain('sort=price-asc');
    });

    it('returns products array', async () => {
      const mockProducts = [{ id: '1', name: 'Gown' }];
      mockFetch({ products: mockProducts, total: 1 });
      const data = await api.getProducts();
      expect(data.products).toEqual(mockProducts);
    });
  });

  describe('getProduct', () => {
    it('calls correct endpoint with product id', async () => {
      mockFetch({ id: '1', name: 'Gown', price: 4999 });
      await api.getProduct('1');
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/products/1'),
        expect.any(Object)
      );
    });
  });

  describe('getCategories', () => {
    it('calls /categories endpoint', async () => {
      mockFetch({ categories: ['dresses', 'tops'] });
      const data = await api.getCategories();
      expect(data.categories).toEqual(['dresses', 'tops']);
    });
  });

  describe('addToCart', () => {
    it('calls POST /cart', async () => {
      mockFetch({ items: [], total: 0, count: 0 });
      await api.addToCart({ productId: '1', name: 'Gown', price: 4999, size: 'M' });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/cart'),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  describe('placeOrder', () => {
    it('calls POST /orders', async () => {
      mockFetch({ id: 'ORD-1', status: 'confirmed', items: [], total: 0, customer: {} });
      await api.placeOrder({ name: 'Jane', email: 'jane@a.com', address: '123 St' });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/orders'),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  describe('error handling', () => {
    it('throws with server error message on 4xx/5xx', async () => {
      mockFetch({ error: 'Product not found' }, false);
      await expect(api.getProduct('999')).rejects.toThrow('Product not found');
    });
  });
});
