const API_BASE = import.meta.env.VITE_API_URL || '/api';

const fetchJSON = async (url, options = {}) => {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
};

// Products
export const getProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return fetchJSON(`/products${qs ? `?${qs}` : ''}`);
};

export const getProduct = (id) => fetchJSON(`/products/${id}`);

export const getCategories = () => fetchJSON('/categories');

// Cart
export const getCart = () => fetchJSON('/cart');
export const addToCart = (item) => fetchJSON('/cart', { method: 'POST', body: JSON.stringify(item) });
export const removeFromCart = (productId, size) =>
  fetchJSON(`/cart/${productId}?size=${encodeURIComponent(size)}`, { method: 'DELETE' });
export const clearCartAPI = () => fetchJSON('/cart/clear', { method: 'DELETE' });
export const updateCartItem = (productId, size, quantity) =>
  fetchJSON(`/cart/${productId}?size=${encodeURIComponent(size)}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity })
  });

// Orders
export const placeOrder = (data) => fetchJSON('/orders', { method: 'POST', body: JSON.stringify(data) });
export const getOrder = (id) => fetchJSON(`/orders/${id}`);
