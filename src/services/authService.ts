interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

const API_URL = 'https://api.example.com';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Simulated API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated successful response
      return {
        user: {
          id: '1',
          email: credentials.email,
          name: 'John Doe',
        },
        token: 'dummy-token',
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  },

  async logout(): Promise<void> {
    try {
      // Simulated API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Logout failed');
    }
  },
};