import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth-store';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance for authenticated requests
export const axiosProtectedClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
  withCredentials: true, // Important: Send cookies with requests for refresh token
});

// Create axios instance for public requests (no auth required)
export const axiosPublicClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
  // No withCredentials for public endpoints
});

// Flag to prevent multiple simultaneous refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request Interceptor: Attach access token to every request
axiosProtectedClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();

    // Attach Authorization header if access token exists
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 errors and refresh token
axiosProtectedClient.interceptors.response.use(
  (response) => {
    // If response is successful, just return it
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      url?: string;
    };
    
    // Don't retry if:
    // - it's not a 401
    // - we've already retried this request
    // - this is the refresh endpoint
    // - this is the change-password endpoint (401 here usually means wrong current password,
    //   not an expired token, so we should surface the error directly)
    if (
      error.response?.status !== 401 || 
      originalRequest._retry || 
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('/auth/change-password')
    ) {
      return Promise.reject(error);
    }

    // If we're already refreshing the token, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosProtectedClient(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      // Attempt to refresh the token
      axiosProtectedClient
        .post('/auth/refresh')
        .then((response) => {
          // Handle the actual response structure from the API
          const { data } = response.data;
          const accessToken = data?.accessToken || data;
          const user = data?.user;

          // Update access token and user in store
          const { setAccessToken, setUser } = useAuthStore.getState();
          setAccessToken(accessToken);
          if (user) {
            setUser(user);
          }

          // Update the Authorization header for the original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          // Process all queued requests with the new token
          processQueue(null, accessToken);

          // Retry the original request
          resolve(axiosProtectedClient(originalRequest));
        })
        .catch((err) => {
          // Refresh failed - logout user and clear state
          // NOTE: We intentionally do NOT redirect here.
          // Route-level guards (e.g. ProtectedRoute) are responsible
          // for redirecting users away from protected pages when
          // authentication state changes.
          processQueue(err, null);

          const { logout } = useAuthStore.getState();
          logout();

          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  }
);

// Export both clients
export default axiosProtectedClient;

