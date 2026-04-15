import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';
import './ProductsPage.css';

const CATEGORIES = ['all', 'women', 'men', 'kids'];

const CATEGORY_BANNERS = {
  women: {
    image: '/images/women_products_bg.png',
    label: 'The Feminine Edit',
    description: 'Effortless elegance. Pieces crafted for the modern woman who moves through the world with intention.',
  },
  men: {
    image: '/images/men_products_bg.png',
    label: 'The Masculine Edit',
    description: 'Refined tailoring and considered design for the man who dresses with purpose.',
  },
  kids: {
    image: '/images/kids_products_bg.jpg',
    label: 'The Little Ones',
    description: 'Quiet luxury, scaled down. Beautiful clothes for children who deserve the very best.',
  },
};
const SORTS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' }
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    sort: searchParams.get('sort') || '',
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || ''
  });

  useEffect(() => {
    setFilters(f => ({
      ...f,
      category: searchParams.get('category') || 'all',
      search: searchParams.get('search') || ''
    }));
  }, [searchParams]);

  const apiParams = {};
  if (filters.category && filters.category !== 'all') apiParams.category = filters.category;
  if (filters.sort) apiParams.sort = filters.sort;
  if (filters.search) apiParams.search = filters.search;
  if (filters.minPrice) apiParams.minPrice = filters.minPrice;
  if (filters.maxPrice) apiParams.maxPrice = filters.maxPrice;

  const { products, loading, error, total } = useProducts(apiParams);

  const updateFilter = (key, value) => {
    setFilters(f => ({ ...f, [key]: value }));
    const newParams = { ...Object.fromEntries(searchParams), [key]: value };
    if (!value || value === 'all') delete newParams[key];
    setSearchParams(newParams);
  };

  const banner = CATEGORY_BANNERS[filters.category];

  return (
    <main className="products-page page">
      {banner ? (
        <header
          className="products-header products-header--banner"
          style={{ backgroundImage: `url('${banner.image}')` }}
        >
          <div className="products-header-overlay" />
          <div className="header-content header-content--banner">
            <p className="products-eyebrow">{banner.label}</p>
            <h1 className="products-title">
              {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}
            </h1>
            <p className="products-subtitle">{banner.description}</p>
          </div>
        </header>
      ) : (
        <header className="products-header">
          <div className="header-content">
            <p className="products-eyebrow">The Collection</p>
            <h1 className="products-title">All Pieces</h1>
            <p className="products-subtitle">Carefully curated garments for the modern wardrobe. {total} {total === 1 ? 'piece' : 'pieces'} available.</p>
            {filters.search && (
              <p className="search-label">Showing results for: <em>"{filters.search}"</em></p>
            )}
          </div>
        </header>
      )}

      <div className="products-layout container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3 className="filter-title">Category</h3>
            <div className="filter-list">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${filters.category === cat ? 'active' : ''}`}
                  onClick={() => updateFilter('category', cat)}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Sort By</h3>
            <select
              value={filters.sort}
              onChange={e => updateFilter('sort', e.target.value)}
              className="filter-select"
            >
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Price</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={e => updateFilter('minPrice', e.target.value)}
                min="0"
              />
              <span>—</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={e => updateFilter('maxPrice', e.target.value)}
                min="0"
              />
            </div>
          </div>

          <button
            className="clear-btn"
            onClick={() => {
              setFilters({ category: 'all', sort: '', search: '', minPrice: '', maxPrice: '' });
              setSearchParams({});
            }}
          >
            Clear Filters
          </button>
        </aside>

        {/* Product Grid */}
        <section className="products-grid-section">
          {loading && <div className="loading-wrapper"><div className="spinner" /></div>}
          {error && <div className="error-msg">Failed to load the collection. Please try again later.</div>}
          
          {!loading && !error && products.length === 0 && (
            <div className="empty-results">
              <p>No pieces found matching your criteria.</p>
              <button className="btn-primary" onClick={() => {
                setFilters({ category: 'all', sort: '', search: '', minPrice: '', maxPrice: '' });
                setSearchParams({});
              }}>View All Pieces</button>
            </div>
          )}
          
          {!loading && !error && products.length > 0 && (
            <div className="products-grid">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductsPage;
