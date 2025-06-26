import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading, setProducts, setError } from '../store/slices/productSlice';
import { productsService } from '../services/productsService';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error } = useAppSelector((state) => state.products);

  const fetchProducts = async () => {
    try {
      dispatch(setLoading(true));
      const products = await productsService.getProducts();
      dispatch(setProducts(products));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch products'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    try {
      dispatch(setLoading(true));
      const products = await productsService.getProductsByCategory(category);
      dispatch(setProducts(products));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch products'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products: items,
    isLoading,
    error,
    fetchProducts,
    fetchProductsByCategory,
  };
};