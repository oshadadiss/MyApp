import { api } from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const ecommerceApi = {
  getProducts: () => api.get<Product[]>('/products'),
  getProduct: (id: string) => api.get<Product>(`/products/${id}`),
  getCategories: () => api.get<string[]>('/categories'),
  searchProducts: (query: string) => api.get<Product[]>(`/products/search?q=${query}`),
  
  // Cart operations
  getCart: () => api.get<CartItem[]>('/cart'),
  addToCart: (productId: string, quantity: number) =>
    api.post('/cart', { productId, quantity }),
  updateCartItem: (productId: string, quantity: number) =>
    api.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId: string) =>
    api.delete(`/cart/${productId}`),

  // Orders
  placeOrder: (cartItems: CartItem[]) =>
    api.post('/orders', { items: cartItems }),
  getOrders: () => api.get('/orders'),
};