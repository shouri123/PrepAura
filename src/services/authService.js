import api from './api';
import { MOCK_USER } from '../utils/mockData';
import { IS_MOCK } from '../utils/config';

export const authService = {
  login: async (credentials) => {
    if (IS_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { token: 'mock_jwt_token_xyz', user: MOCK_USER };
    }

    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const token = response.data.access_token;

      // Fetch user profile from /auth/me
      let user = null;
      try {
        const profileRes = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        user = {
          id: profileRes.data.id,
          name: profileRes.data.name,
          email: profileRes.data.email,
          role: 'Candidate',
          targetRole: 'Distributed Systems',
          avatar: '',
        };
      } catch {
        user = {
          name: credentials.email.split('@')[0],
          email: credentials.email,
          role: 'Candidate',
          targetRole: 'Distributed Systems',
          avatar: '',
        };
      }

      return { token, user };
    } catch (err) {
      // If network error (backend down), fallback gracefully for uninterrupted UI experience
      if (!err.response) {
        console.warn('Backend unavailable, falling back to local simulation:', err.message);
        return { token: 'mock_jwt_token_xyz', user: { ...MOCK_USER, email: credentials.email } };
      }
      throw err;
    }
  },

  register: async (userData) => {
    if (IS_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { token: 'mock_jwt_token_xyz', user: { ...MOCK_USER, ...userData } };
    }

    try {
      const response = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      // Obtain JWT token via auto-login
      let token = 'registered_session_token';
      try {
        const loginRes = await api.post('/auth/login', {
          email: userData.email,
          password: userData.password,
        });
        token = loginRes.data.access_token;
      } catch (loginErr) {
        console.warn('Auto-login post register note:', loginErr);
      }

      const user = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        targetRole: userData.targetRole || 'Distributed Systems',
        role: 'Candidate',
      };

      return { token, user };
    } catch (err) {
      if (!err.response) {
        console.warn('Backend unavailable, falling back to local simulation:', err.message);
        return { token: 'mock_jwt_token_xyz', user: { ...MOCK_USER, ...userData } };
      }
      throw err;
    }
  },

  getCurrentUser: async () => {
    if (IS_MOCK) return MOCK_USER;
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch {
      return MOCK_USER;
    }
  },

  updateProfile: async (fields) => {
    if (IS_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return fields;
    }
    try {
      const response = await api.put('/users/me', fields);
      return response.data;
    } catch {
      return fields;
    }
  },
};