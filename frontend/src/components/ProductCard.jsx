import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const isFavorited = isInWishlist(product.id);

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

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleWishlist(product);
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
          className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg viewBox="0 0 24 24" fill={isFavorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

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
