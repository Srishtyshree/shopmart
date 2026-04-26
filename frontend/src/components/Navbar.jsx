import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cartCount } = useCart();
  const { user } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <div className="ticker">
        <div className="ticker-track">
          <span>New Arrivals · Winter Edit</span><span className="dot">·</span>
          <span>Atelier-Made in Italy</span><span className="dot">·</span>
          <span>Discover the Editorial</span><span className="dot">·</span>
          <span>Complimentary Shipping on Orders Over $300</span><span className="dot">·</span>
          <span>New Arrivals · Winter Edit</span><span className="dot">·</span>
          <span>Atelier-Made in Italy</span><span className="dot">·</span>
          <span>Discover the Editorial</span><span className="dot">·</span>
          <span>Complimentary Shipping on Orders Over $300</span><span className="dot">·</span>
        </div>
      </div>

      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <Link to="/" className="logo">MAISON·WLD</Link>
        <ul className="nav-links">
          <li><Link to="/products?category=women">Women</Link></li>
          <li><Link to="/products?category=men">Men</Link></li>
          <li><Link to="/products?category=kids">Kids</Link></li>
          <li><Link to="/products">Editorial</Link></li>
        </ul>
        <div className="nav-icons">
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <form onSubmit={handleSearchSubmit}>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>
            <button title="Search" onClick={() => setIsSearchOpen(!isSearchOpen)} className="search-toggle-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>
          
          <Link to={user ? "/profile" : "/login"} title="Account" className="cart-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
          <Link to="/profile" title="Wishlist" className="cart-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
          </Link>
          <Link to="/cart" title="Cart" className="cart-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
