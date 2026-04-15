import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="cart-item" data-testid="cart-item">
      <div className="cart-item-img-wrap">
        <img src={item.image} alt={item.name} className="cart-item-img" />
      </div>
      <div className="cart-item-details">
        <div className="cart-item-top">
          <div>
            <p className="cart-item-brand">{item.brand || ''}</p>
            <h3 className="cart-item-name">{item.name}</h3>
            {item.size && <p className="cart-item-size">Size: <strong>{item.size}</strong></p>}
          </div>
          <button
            className="cart-item-remove"
            onClick={() => removeItem(item.productId, item.size)}
            aria-label={`Remove ${item.name} from cart`}
          >
            ✕
          </button>
        </div>
        <div className="cart-item-bottom">
          <div className="qty-controls">
            <button
              className="qty-btn"
              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
              aria-label="Decrease quantity"
            >−</button>
            <span className="qty-value" data-testid="qty-value">{item.quantity}</span>
            <button
              className="qty-btn"
              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
              aria-label="Increase quantity"
            >+</button>
          </div>
          <span className="cart-item-price">${(item.price * item.quantity).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
