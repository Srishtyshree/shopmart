import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { items, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '', country: 'US' });
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) { setError('Your cart is empty.'); return; }
    setLoading(true);
    setError('');
    try {
      const result = await placeOrder(form);
      setOrder(result);
      clearCart();
    } catch (err) {
      setError(err.message || 'Could not place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (order) {
    return (
      <main className="page checkout-page">
        <div className="container confirmation">
          <div className="confirm-icon">✅</div>
          <h1 className="section-title">Order Confirmed!</h1>
          <p className="confirm-id">Order ID: <strong>{order.id}</strong></p>
          <p className="confirm-msg">
            Thank you, <strong>{order.customer.name}</strong>! Your order has been placed successfully.
            A confirmation will be sent to <strong>{order.customer.email}</strong>.
          </p>
          <div className="confirm-summary">
            <h3>Items Ordered</h3>
            {order.items.map((item, i) => (
              <div key={i} className="confirm-item">
                <span>{item.name} — Size {item.size}</span>
                <span>×{item.quantity} — ${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="confirm-total">Total: <strong>${order.total.toLocaleString()}</strong></div>
          </div>
          <Link to="/" id="back-home-btn" className="btn-primary" style={{ marginTop: '2rem' }}>
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page checkout-page">
      <div className="checkout-container container">
        <h1 className="section-title">Checkout</h1>

        <div className="checkout-layout">
          <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
            <h2 className="form-section-title">Shipping Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkout-name">Full Name *</label>
                <input id="checkout-name" type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Jane Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="checkout-email">Email *</label>
                <input id="checkout-email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="checkout-address">Address *</label>
              <input id="checkout-address" type="text" name="address" value={form.address} onChange={handleChange} required placeholder="123 Fashion Ave" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkout-city">City</label>
                <input id="checkout-city" type="text" name="city" value={form.city} onChange={handleChange} placeholder="New York" />
              </div>
              <div className="form-group">
                <label htmlFor="checkout-zip">ZIP Code</label>
                <input id="checkout-zip" type="text" name="zip" value={form.zip} onChange={handleChange} placeholder="10001" />
              </div>
              <div className="form-group">
                <label htmlFor="checkout-country">Country</label>
                <select id="checkout-country" name="country" value={form.country} onChange={handleChange}>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                </select>
              </div>
            </div>

            <div className="form-section-title" style={{ marginTop: '1.5rem' }}>Payment (Demo)</div>
            <div className="payment-mock">
              <div className="mock-card">
                <span>💳</span>
                <span>**** **** **** 4242</span>
                <span>VISA</span>
              </div>
              <p className="mock-note">This is a demo — no real payment is processed.</p>
            </div>

            {error && <p className="form-error" role="alert">⚠️ {error}</p>}

            <button
              type="submit"
              id="place-order-btn"
              className="btn-primary place-order-btn"
              disabled={loading || items.length === 0}
            >
              {loading ? 'Placing Order…' : `Place Order — $${cartTotal.toFixed(2)}`}
            </button>
          </form>

          {/* Order summary */}
          <aside className="checkout-summary">
            <h2 className="form-section-title">Order Summary</h2>
            <div className="checkout-items">
              {items.map((item, i) => (
                <div key={i} className="checkout-item">
                  <img src={item.image} alt={item.name} className="checkout-item-img" />
                  <div>
                    <p className="checkout-item-name">{item.name}</p>
                    <p className="checkout-item-meta">Size: {item.size} · Qty: {item.quantity}</p>
                  </div>
                  <span className="checkout-item-price">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
