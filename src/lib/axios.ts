import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Base configuration
const API_BASE_URL = "http://localhost:3000/api/v1";

// Augment AxiosRequestConfig to track a single retry
declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Response interceptor to handle 401 and refresh once
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig | undefined;

      const status = error.response?.status;
      const requestUrl = originalRequest?.url || "";

      const isRefreshEndpoint = requestUrl.includes("/auth/refresh");

      if (
        status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !isRefreshEndpoint
      ) {
        originalRequest._retry = true;
        try {
          // Attempt refresh
          await client.post("/auth/refresh", undefined, {
            withCredentials: true,
          });
          // Retry original request
          return client(originalRequest);
        } catch (refreshErr) {
          // Bubble up the original 401 if refresh fails
          return Promise.reject(refreshErr);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
}

export const apiClient = createApiClient();
export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data: T;
};
