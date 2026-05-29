import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedOrderId: null,
  orderIdToDelete: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectOrder: (state, action) => {
      state.selectedOrderId = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrderId = null;
    },
    openDeleteOrderModal: (state, action) => {
      state.orderIdToDelete = action.payload;
    },
    closeDeleteOrderModal: (state) => {
      state.orderIdToDelete = null;
    }
  }
});

export const {
  selectOrder,
  clearSelectedOrder,
  openDeleteOrderModal,
  closeDeleteOrderModal
} = uiSlice.actions;
export default uiSlice.reducer;
