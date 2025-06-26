import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchAllProducts,
  fetchProductById,
  searchProducts,
  selectAllProducts,
  selectSelectedProduct,
  selectSearchResults,
  selectProductsLoading,
  selectProductsError,
} from '../store/slices/productSlice';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const searchResults = useAppSelector(selectSearchResults);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const loadProducts = () => {
    dispatch(fetchAllProducts());
  };

  const loadProductById = (id: number) => {
    dispatch(fetchProductById(id));
  };

  const searchForProducts = (query: string) => {
    dispatch(searchProducts(query));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    // Data
    products,
    selectedProduct,
    searchResults,
    // Loading states
    isLoading: {
      products: loading.items,
      selectedProduct: loading.selectedProduct,
      search: loading.search,
    },
    // Error states
    error: {
      products: error.items,
      selectedProduct: error.selectedProduct,
      search: error.search,
    },
    // Actions
    loadProducts,
    loadProductById,
    searchForProducts,
  };
};