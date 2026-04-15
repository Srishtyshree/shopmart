import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CartProvider } from '../context/CartContext';

const mockProduct = {
  id: '1',
  name: 'Silk Evening Gown',
  price: 4999,
  category: 'dresses',
  brand: 'Élégance',
  rating: 4.8,
  reviews: 124,
  stock: 15,
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['Black', 'Champagne'],
  description: 'A luxurious silk evening gown.',
  image: 'https://example.com/gown.jpg',
  featured: true,
  new: true
};

const renderCard = (product = mockProduct) =>
  render(
    <MemoryRouter>
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>
    </MemoryRouter>
  );

describe('ProductCard', () => {
  it('renders product name', () => {
    renderCard();
    expect(screen.getByText('Silk Evening Gown')).toBeInTheDocument();
  });

  it('renders product brand', () => {
    renderCard();
    expect(screen.getByText('Élégance')).toBeInTheDocument();
  });

  it('renders product price', () => {
    renderCard();
    expect(screen.getByTestId('product-price')).toHaveTextContent('4,999');
  });

  it('renders New badge when product.new is true', () => {
    renderCard();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('does not render New badge when product.new is false', () => {
    renderCard({ ...mockProduct, new: false });
    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });

  it('renders product image with alt text', () => {
    renderCard();
    const img = screen.getByAltText('Silk Evening Gown');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProduct.image);
  });

  it('renders quick add button', () => {
    renderCard();
    expect(screen.getByTestId('quick-add-btn')).toBeInTheDocument();
  });

  it('links to the correct product detail page', () => {
    renderCard();
    const card = screen.getByTestId('product-card');
    expect(card.getAttribute('href')).toBe('/products/1');
  });

  it('renders Featured badge when product.featured is true', () => {
    renderCard();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });
});
