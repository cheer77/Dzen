import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from '../features/orders/ordersSlice.js';
import productsReducer from '../features/products/productsSlice.js';
import uiReducer from '../features/ui/uiSlice.js';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    products: productsReducer,
    ui: uiReducer
  }
});
