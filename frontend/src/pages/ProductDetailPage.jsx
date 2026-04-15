import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then(data => {
        setProduct(data);
        setSelectedSize(data.sizes[0]);
      })
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({ productId: product.id, name: product.name, price: product.price, image: product.image, size: selectedSize });
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(''), 2500);
  };

  const inCart = items.some(i => i.productId === id && i.size === selectedSize);

  if (loading) return <main className="page"><div className="loading-wrapper"><div className="spinner" /></div></main>;
  if (error) return (
    <main className="page container">
      <div className="not-found">
        <h2>Product Not Found</h2>
        <Link to="/products" className="btn-primary" style={{ marginTop: '1rem' }}>Back to Products</Link>
      </div>
    </main>
  );

  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

  return (
    <main className="page product-detail-page">
      <div className="detail-container container">
        <div className="detail-breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
        </div>

        <div className="detail-grid">
          {/* Image */}
          <div className="detail-img-wrap">
            <img src={product.image} alt={product.name} className="detail-img" />
            {product.new && <span className="detail-badge-new">New Arrival</span>}
          </div>

          {/* Info */}
          <div className="detail-info">
            <p className="detail-brand">{product.brand}</p>
            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <span className="stars">{stars}</span>
              <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="detail-price">${product.price.toLocaleString()}</p>

            <p className="detail-description">{product.description}</p>

            {/* Size selector */}
            <div className="size-section">
              <p className="size-label">Select Size: <strong>{selectedSize}</strong></p>
              <div className="size-grid">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    id={`size-${size}`}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="colors-section">
                <p className="size-label">Colors: <span className="color-list">{product.colors.join(', ')}</span></p>
              </div>
            )}

            <div className="detail-stock">
              <span className="stock-dot" />
              <span>{product.stock} in stock</span>
            </div>

            <div className="detail-actions">
              <button
                id="add-to-cart-btn"
                className="btn-primary add-btn"
                onClick={handleAddToCart}
              >
                {inCart ? '✓ Added to Cart' : '+ Add to Cart'}
              </button>
              <button
                className="btn-outline"
                onClick={() => navigate('/cart')}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && <div className="toast success" role="alert">{toast}</div>}
    </main>
  );
};

export default ProductDetailPage;
