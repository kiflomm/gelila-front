import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create axios instance with default config
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important: enables sending cookies
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Cookies (including accessToken) are automatically sent with withCredentials: true
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - try to refresh token
    // Skip refresh for login, forgot-password, reset-password, and refresh endpoints
    const skipRefreshPaths = [
      "/auth/login",
      "/auth/forgot-password",
      "/auth/reset-password",
      "/auth/refresh",
    ];
    const shouldSkipRefresh =
      skipRefreshPaths.some((path) => originalRequest.url?.includes(path));

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh
    ) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        await axiosClient.post("/auth/refresh", {}, { withCredentials: true });
        processQueue(null, null);
        // Retry the original request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        // Refresh failed, redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    const status = error.response?.status;
    if (status === 404) {
      // Handle not found
    } else if (status && status >= 500) {
      // Handle server errors
    }

    return Promise.reject(error);
  }
);
