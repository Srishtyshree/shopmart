import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { getProducts } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reveal on scroll logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Fetch products for "The Edit"
    getProducts()
      .then(data => setFeatured(data.products.slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => observer.disconnect();
  }, [loading]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input.value && input.value.includes('@')) {
      input.value = '';
      input.placeholder = "You're on the list ✓";
    }
  };

  return (
    <main className="page">
      <Hero />

      {/* CHAPTER / COLLECTIONS */}
      <section className="chapter-section">
        <div className="chapter-header reveal">
          <h2 className="chapter-title">Choose your <em>chapter</em></h2>
          <p className="chapter-desc">Every collection is a meditation — a closet built around how you live, not how the season tells you to.</p>
        </div>
        <div className="chapter-grid">
          <Link to="/products?category=women" className="chapter-card reveal">
            <div className="chapter-bg chapter-bg-women"></div>
            <div className="chapter-label">
              <p className="chapter-num">01 — The Feminine</p>
              <h3 className="chapter-name">Women</h3>
            </div>
            <span className="chapter-cta">Shop Now</span>
          </Link>
          <Link to="/products?category=men" className="chapter-card reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="chapter-bg chapter-bg-men"></div>
            <div className="chapter-label">
              <p className="chapter-num">02 — The Masculine</p>
              <h3 className="chapter-name">Men</h3>
            </div>
            <span className="chapter-cta">Shop Now</span>
          </Link>
          <Link to="/products?category=kids" className="chapter-card reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="chapter-bg chapter-bg-kids"></div>
            <div className="chapter-label">
              <p className="chapter-num">03 — The Little Ones</p>
              <h3 className="chapter-name">Kids</h3>
            </div>
            <span className="chapter-cta">Shop Now</span>
          </Link>
        </div>
      </section>

      {/* THE EDIT */}
      <section className="edit-section">
        <div className="section-header reveal">
          <div>
            <p className="section-eyebrow">Selected For You</p>
            <h2 className="section-title">The <em>edit</em></h2>
          </div>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        
        {loading ? (
          <div className="loading-wrapper"><div className="spinner" /></div>
        ) : (
          <div className="products-grid">
            {featured.map((p, i) => (
              <Link to={`/products/${p.id}`} key={p.id} className="product-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="product-img">
                  <div className={`product-photo p${(i % 4) + 1}`}>
                    {/* Simulated image if no actual image - you can replace with p.image */}
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: p.image ? 1 : 0 }} />
                  </div>
                  {p.featured && <span className="product-badge bestseller">Bestseller</span>}
                  {p.isNew && <span className="product-badge">New</span>}
                  <button className="wish-btn" onClick={(e) => { e.preventDefault(); e.target.closest('.wish-btn').classList.toggle('active'); }} title="Wishlist">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>
                <div className="product-meta">
                  <div>
                    <p className="product-cat">{p.category}</p>
                    <h3 className="product-name">{p.name}</h3>
                    <p className="product-colors">{p.color || 'Assorted Colors'}</p>
                  </div>
                  <span className="product-price">${p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ATELIER EDITORIAL */}
      <section className="atelier-section">
        <div className="atelier-image">
          <div className="atelier-texture"></div>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }} viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="weave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="10" height="10" fill="rgba(255,255,255,0.3)" rx="5"/>
                <rect x="10" y="10" width="10" height="10" fill="rgba(255,255,255,0.3)" rx="5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#weave)"/>
          </svg>
        </div>
        <div className="atelier-content reveal">
          <p className="atelier-eyebrow">Inside the Atelier</p>
          <h2 className="atelier-title">The hand <em>behind the cloth.</em></h2>
          <p className="atelier-body">Each garment is shaped over weeks, not minutes. Belgian linens, Mongolian cashmere, Italian wools — entrusted to ateliers that have been making the same pieces for generations.</p>
          <Link to="/products" className="atelier-link">Read the Story →</Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="reveal">
          <h2 className="newsletter-title">Receive the <em>letter.</em> Slow fashion, first access.</h2>
        </div>
        <div className="reveal" style={{ transitionDelay: '0.1s' }}>
          <label className="newsletter-label">Newsletter</label>
          <form className="newsletter-input-row" onSubmit={handleSubscribe}>
            <input type="email" placeholder="your@email.com" required />
            <button type="submit" className="subscribe-btn">Subscribe →</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
