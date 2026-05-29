import { describe, expect, it } from 'vitest';
import reducer, { setTypeFilter } from './productsSlice.js';

describe('productsSlice', () => {
  it('sets the selected product type filter', () => {
    const state = reducer(undefined, setTypeFilter('Monitors'));

    expect(state.typeFilter).toBe('Monitors');
  });
});
