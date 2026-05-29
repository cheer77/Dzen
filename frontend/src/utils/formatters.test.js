import { describe, expect, it } from 'vitest';
import { getProductPrice, getProductPriceText } from './formatters.js';

const product = {
  price: [
    { value: 100, symbol: 'USD', isDefault: 0 },
    { value: 2600, symbol: 'UAH', isDefault: 1 }
  ]
};

describe('formatters', () => {
  it('returns a product price by currency symbol', () => {
    expect(getProductPrice(product, 'USD')).toBe(100);
    expect(getProductPrice(product, 'UAH')).toBe(2600);
  });

  it('returns zero for missing currency symbol', () => {
    expect(getProductPrice(product, 'EUR')).toBe(0);
  });

  it('formats all product prices as text', () => {
    expect(getProductPriceText(product)).toContain('$100.00');
    expect(getProductPriceText(product)).toContain('UAH');
  });
});
