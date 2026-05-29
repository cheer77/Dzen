import { apiClient } from './client.js';

export const getProducts = async () => {
  const { data } = await apiClient.get('/products');
  return data;
};
