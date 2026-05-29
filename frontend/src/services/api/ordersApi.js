import { apiClient } from './client.js';

export const getOrders = async () => {
  const { data } = await apiClient.get('/orders');
  return data;
};
