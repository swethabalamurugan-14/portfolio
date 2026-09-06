import axios from 'axios';

// Create a centralized Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // Will use relative in dev if VITE_API_URL is missing, proxy handles it
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout for all requests
});

// Optional: Add interceptors for request/response logging or error tracking (e.g. Sentry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We could integrate Sentry here in the future
    if (error.response) {
      console.error(`API Error: ${error.response.status} - ${error.response.data.message || error.message}`);
    } else if (error.request) {
      console.error('API Error: No response received from server.');
    } else {
      console.error(`API Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default api;
