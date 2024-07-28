import axios from "axios";

const API = import.meta.env.VITE_SOME_API!;

const api = axios.create({
  baseURL: API,
});

// Request interceptor to add Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh and redirect if necessary
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response && response.status === 401 && !response.config.__isRetryRequest) {
      console.log('Access token expired, attempting to refresh...'); // Debug log

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        // Request to refresh the token
        const result = await axios.post(`${API}/refresh`, { token: refreshToken });
        const { accessToken } = result.data;

        // Update local storage with new access token
        localStorage.setItem('accessToken', accessToken);

        // Mark the request as a retry to avoid infinite loops
        response.config.__isRetryRequest = true;

        // Set the new access token in the headers
        response.config.headers['Authorization'] = `Bearer ${accessToken}`;

        // Retry the original request with the new access token
        return axios(response.config);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);

        // Clear tokens and redirect to login page
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Redirect to login page
        window.location.href = '/login';

        // Return rejected promise to propagate the error
        return Promise.reject(refreshError);
      }
    }

    // If the error is not a 401 or has already been retried, propagate it
    return Promise.reject(error);
  }
);

export default api;
