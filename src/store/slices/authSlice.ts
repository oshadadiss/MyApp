import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {storage, StorageKeys} from '../../utils/storage';
import {RootState} from '../store';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role?: string;
  company?: any;
  phone?: string;
  university?: string;
}

interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}

interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isInitialized: false,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials>(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login response:', data);
      await storage.setItem(StorageKeys.AUTH_TOKEN, data.accessToken);
      await storage.setItem(StorageKeys.USER_DATA, data);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  },
);

export const loadToken = createAsyncThunk(
  'auth/loadToken',
  async (_, {dispatch}) => {
    try {
      const [token, userData] = await Promise.all([
        storage.getItem(StorageKeys.AUTH_TOKEN),
        storage.getItem(StorageKeys.USER_DATA),
      ]);

      if (token && userData) {
        dispatch(setToken(token as string));
        dispatch(setUser(userData as User));
        return {token, userData};
      }
      return null;
    } catch (error) {
      console.error('Error loading token:', error);
      return null;
    }
  },
);

export const getUserDetails = createAsyncThunk(
  'auth/getUserDetails',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      
      if (!token) {
        return rejectWithValue('No token available');
      }

      console.log('Using token for auth:', token);

      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        return rejectWithValue(errorData.message || 'Failed to fetch user details');
      }

      const data = await response.json();
      console.log('User details response:', data);
      await storage.setItem(StorageKeys.USER_DATA, data);
      return data;
    } catch (error) {
      console.error('getUserDetails error:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user details');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.error = null;
      storage.removeItem(StorageKeys.AUTH_TOKEN);
      storage.removeItem(StorageKeys.USER_DATA);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const {accessToken, ...userData} = action.payload;
        state.user = userData;
        state.token = accessToken;
        state.error = null;
        console.log('State after login:', { user: state.user, token: state.token });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loadToken.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
      })
      .addCase(loadToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.error.message || 'Failed to load token';
      })
      .addCase(getUserDetails.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;

export const {setUser, setToken, setLoading, setError, logout} = authSlice.actions;
export default authSlice.reducer;