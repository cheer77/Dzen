import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../services/api/productsApi.js';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return getProducts();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  typeFilter: 'all'
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load products';
      });
  }
});

export const { setTypeFilter } = productsSlice.actions;
export default productsSlice.reducer;
