import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0]
    });
  };

  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

  return (
    <Link to={`/products/${product.id}`} className="product-card" data-testid="product-card">
      <div className="product-card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
        <div className="product-card-badges">
          {product.new && <span className="badge badge-new">New</span>}
          {product.featured && <span className="badge badge-featured">Featured</span>}
        </div>
        <button
          className="quick-add-btn"
          onClick={handleQuickAdd}
          aria-label={`Quick add ${product.name} to cart`}
          data-testid="quick-add-btn"
        >
          + Quick Add
        </button>
      </div>
      <div className="product-card-info">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-rating" aria-label={`Rating: ${product.rating} out of 5`}>
            <span className="stars">{stars}</span>
            <span className="rating-count">({product.reviews})</span>
          </span>
          <span className="product-price" data-testid="product-price">${product.price.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
