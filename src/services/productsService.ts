import { Product } from '../store/slices/productSlice';

const API_URL = 'https://api.example.com';

export const productsService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch products');
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch product');
    }
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${API_URL}/products?category=${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch products by category');
    }
  },
};