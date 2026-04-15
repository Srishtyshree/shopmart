import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

const testItem = { productId: '1', name: 'Silk Gown', price: 4999, image: '', size: 'M', quantity: 1 };
const testItem2 = { productId: '2', name: 'Linen Shirt', price: 999, image: '', size: 'L', quantity: 1 };

// Test component to expose cart context
const CartDisplay = () => {
  const { items, cartTotal, cartCount, addItem, removeItem, updateQuantity, clearCart } = useCart();
  return (
    <div>
      <span data-testid="item-count">{cartCount}</span>
      <span data-testid="total">{cartTotal}</span>
      <span data-testid="items">{items.map(i => i.name).join(',')}</span>
      <button onClick={() => addItem(testItem)} data-testid="add1">add1</button>
      <button onClick={() => addItem(testItem2)} data-testid="add2">add2</button>
      <button onClick={() => removeItem('1', 'M')} data-testid="remove1">remove1</button>
      <button onClick={() => updateQuantity('1', 'M', 3)} data-testid="update1">update1</button>
      <button onClick={() => updateQuantity('1', 'M', 0)} data-testid="update0">update0</button>
      <button onClick={clearCart} data-testid="clear">clear</button>
    </div>
  );
};

const renderCart = () =>
  render(<CartProvider><CartDisplay /></CartProvider>);

describe('CartContext', () => {
  it('starts with empty cart', () => {
    renderCart();
    expect(screen.getByTestId('item-count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');
  });

  it('adds an item to cart', () => {
    renderCart();
    act(() => screen.getByTestId('add1').click());
    expect(screen.getByTestId('item-count').textContent).toBe('1');
    expect(screen.getByTestId('items').textContent).toContain('Silk Gown');
  });

  it('calculates total correctly', () => {
    renderCart();
    act(() => screen.getByTestId('add1').click());
    expect(screen.getByTestId('total').textContent).toBe('4999');
  });

  it('increments quantity for duplicate item (same id + size)', () => {
    renderCart();
    act(() => screen.getByTestId('add1').click());
    act(() => screen.getByTestId('add1').click());
    expect(screen.getByTestId('item-count').textContent).toBe('2');
  });

  it('adds two different items', () => {
    renderCart();
    act(() => screen.getByTestId('add1').click());
    act(() => screen.getByTestId('add2').click());
    expect(screen.getByTestId('item-count').textContent).toBe('2');
    expect(screen.getByTestId('total').textContent).toBe('5998');
  });

  it('removes an item from cart', () => {
    renderCart();
    act(() => screen.getByTestId('add1').click());
    act(() => screen.getByTestId('remove1').click());
    expect(screen.getByTestId('item-count').textContent).toBe('0');
  });

  it('updates item quantity', () => {
    renderCart();
    act(() => screen.getByTestId('add1').click());
    act(() => screen.getByTestId('update1').click());
    expect(screen.getByTestId('item-count').textContent).toBe('3');
  });

  it('removes item when quantity updated to 0', () => {
    renderCart();
    act(() => screen.getByTestId('add1').click());
    act(() => screen.getByTestId('update0').click());
    expect(screen.getByTestId('item-count').textContent).toBe('0');
  });

  it('clears the entire cart', () => {
    renderCart();
    act(() => screen.getByTestId('add1').click());
    act(() => screen.getByTestId('add2').click());
    act(() => screen.getByTestId('clear').click());
    expect(screen.getByTestId('item-count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');
  });

  it('throws when useCart used outside CartProvider', () => {
    const BadComponent = () => { useCart(); return null; };
    expect(() => render(<BadComponent />)).toThrow('useCart must be used inside CartProvider');
  });
});
