import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stock: number;
  rating: number;
  brand: string;
}

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  searchResults: Product[];
  isLoading: {
    items: boolean;
    selectedProduct: boolean;
    search: boolean;
  };
  error: {
    items: string | null;
    selectedProduct: string | null;
    search: string | null;
  };
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  searchResults: [],
  isLoading: {
    items: false,
    selectedProduct: false,
    search: false,
  },
  error: {
    items: null,
    selectedProduct: null,
    search: null,
  },
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return data.products;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      if (!response.ok) throw new Error('Failed to search products');
      const data = await response.json();
      return data.products;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to search products');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.error.selectedProduct = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.error.search = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all products
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading.items = true;
        state.error.items = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading.items = false;
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading.items = false;
        state.error.items = action.payload as string;
      })
    // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading.selectedProduct = true;
        state.error.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading.selectedProduct = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading.selectedProduct = false;
        state.error.selectedProduct = action.payload as string;
      })
    // Search products
      .addCase(searchProducts.pending, (state) => {
        state.isLoading.search = true;
        state.error.search = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading.search = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading.search = false;
        state.error.search = action.payload as string;
      });
  },
});

// Selectors
export const selectAllProducts = (state: RootState) => state.products.items;
export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectSearchResults = (state: RootState) => state.products.searchResults;
export const selectProductsLoading = (state: RootState) => state.products.isLoading;
export const selectProductsError = (state: RootState) => state.products.error;

export const { clearSelectedProduct, clearSearchResults } = productSlice.actions;

export default productSlice.reducer;