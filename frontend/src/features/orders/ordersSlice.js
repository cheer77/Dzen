import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrders } from '../../services/api/ordersApi.js';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  return getOrders();
});

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    deleteOrder: (state, action) => {
      state.items = state.items.filter((order) => order.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load orders';
      });
  }
});

export const { deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
