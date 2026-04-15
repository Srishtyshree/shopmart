import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CATEGORY_META = {
  dresses: {
    label: 'Dresses',
    desc: 'From silk gowns to breezy maxis',
    index: '01',
    img: 'https://images.unsplash.com/photo-1768818565983-29d3f4d76869?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwyfHxoaWdoJTIwZmFzaGlvbiUyMGVkaXRvcmlhbCUyMHdvbWFufGVufDB8fHx8MTc3NzE5MjY5MXww&ixlib=rb-4.1.0&q=85',
  },
  tops: {
    label: 'Tops',
    desc: 'Blouses, crops & more',
    index: '02',
    img: 'https://images.unsplash.com/photo-1776262144962-bb88a3281353?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZmFzaGlvbiUyMGVkaXRvcmlhbCUyMHdvbWFufGVufDB8fHx8MTc3NzE5MjY5MXww&ixlib=rb-4.1.0&q=85',
  },
  bottoms: {
    label: 'Bottoms',
    desc: 'Trousers, skirts & denim',
    index: '03',
    img: 'https://images.unsplash.com/photo-1639747658423-1b00fee36582?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwyfHxtZW5zd2VhciUyMGZhc2hpb24lMjBtb2RlbHxlbnwwfHx8fDE3NzcxOTI2OTF8MA&ixlib=rb-4.1.0&q=85',
  },
  outerwear: {
    label: 'Outerwear',
    desc: 'Coats, jackets & blazers',
    index: '04',
    img: 'https://images.unsplash.com/photo-1611242316169-17f849375c5d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGZhYnJpYyUyMHRleHR1cmUlMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc3NzE5MjY5MXww&ixlib=rb-4.1.0&q=85',
  },
};

const CategoryCard = ({ category }) => {
  const meta = CATEGORY_META[category] || { label: category, desc: '', index: '–', img: '' };
  return (
    <Link
      to={`/products?category=${category}`}
      className="category-card"
      data-testid="category-card"
      aria-label={`Browse ${meta.label}`}
    >
      <div className="category-card-img" style={{ backgroundImage: `url(${meta.img})` }} />
      <div className="category-card-overlay" />
      <div className="category-card-content">
        <span className="category-index">{meta.index}</span>
        <div>
          <h3 className="category-label">{meta.label}</h3>
          <p className="category-desc">{meta.desc}</p>
        </div>
        <span className="category-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
