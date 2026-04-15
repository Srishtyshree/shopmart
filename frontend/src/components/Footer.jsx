import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">MAISON·WLD</span>
          <p className="footer-tagline">An editorial wardrobe for the modern individualist. Clothes made slowly, in small ateliers, by people who care.</p>
        </div>
        <div>
          <p className="footer-col-title">Shop</p>
          <ul className="footer-links">
            <li><Link to="/products?category=dresses">Women</Link></li>
            <li><Link to="/products?category=tops">Men</Link></li>
            <li><Link to="/products?category=bottoms">Kids</Link></li>
            <li><Link to="/products">New In</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Maison</p>
          <ul className="footer-links">
            <li><Link to="#">Our Story</Link></li>
            <li><Link to="#">Ateliers</Link></li>
            <li><Link to="#">Editorial</Link></li>
            <li><Link to="#">Sustainability</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-col-title">Service</p>
          <ul className="footer-links">
            <li><Link to="#">Contact</Link></li>
            <li><Link to="#">Shipping</Link></li>
            <li><Link to="#">Returns</Link></li>
            <li><Link to="#">Care Guide</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 MAISON·WLD. All garments crafted with intent.</span>
        <Link to="#" style={{ color: 'rgba(248,246,242,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy</Link>
      </div>
    </footer>
  );
};

export default Footer;
