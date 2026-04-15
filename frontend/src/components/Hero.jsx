import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-image-panel">
        <div className="hero-photo-sim"></div>
      </div>
      <div className="hero-vol">Winter MMXXVI · Volume 04</div>
      <div className="hero-content">
        <p className="hero-eyebrow">Selected Collection</p>
        <h1 className="hero-title">Quiet <em>elegance,</em> made to last.</h1>
        <p className="hero-sub">A wardrobe assembled from the slowest hands and finest fibres. Pieces designed to outlive the season.</p>
        <div className="hero-ctas">
          <Link to="/products?category=dresses" className="btn-primary">Shop Women</Link>
          <Link to="/products?category=tops" className="btn-ghost">Shop Men</Link>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
