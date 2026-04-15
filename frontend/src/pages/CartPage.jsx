import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = cartTotal > 150 ? 0 : 15;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;

  if (items.length === 0) {
    return (
      <main className="page cart-page">
        <div className="container empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <h1 className="section-title">Your Cart is Empty</h1>
          <p className="section-subtitle">Looks like you haven't added anything yet.</p>
          <Link to="/products" id="browse-products-btn" className="btn-primary" style={{ marginTop: '2rem' }}>
            Browse Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page cart-page">
      <div className="cart-container container">
        <div className="cart-header">
          <h1 className="section-title">Shopping Cart</h1>
          <button className="btn-outline clear-cart-btn" onClick={clearCart}>Clear All</button>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items" aria-label="Cart items">
            {items.map((item, idx) => (
              <CartItem key={`${item.productId}-${item.size}-${idx}`} item={item} />
            ))}
          </div>

          {/* Summary */}
          <aside className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="free-shipping">Free</span> : `$${shipping}`}</span>
              </div>
              <div className="summary-line">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <p className="shipping-note">Add ${(150 - cartTotal).toFixed(2)} more for free shipping</p>
              )}
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span className="total-amount">${orderTotal.toFixed(2)}</span>
            </div>

            <button
              id="checkout-btn"
              className="btn-primary checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout →
            </button>

            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
