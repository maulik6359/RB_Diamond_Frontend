import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

interface ErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;

  private constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error));
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ErrorResponse {
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response?.data as ApiErrorResponse;

      switch (status) {
        case 401:
          this.handleUnauthorized();
          return {
            message: errorData?.message || "Unauthorized access. Please login again.",
            status,
            code: "UNAUTHORIZED",
          };
        case 403:
          return {
            message: errorData?.message || "Access forbidden.",
            status,
            code: "FORBIDDEN",
          };
        case 404:
          return {
            message: errorData?.message || "Resource not found.",
            status,
            code: "NOT_FOUND",
          };
        case 422:
          return {
            message: errorData?.message || "Validation error.",
            status,
            code: "VALIDATION_ERROR",
          };
        case 500:
          return {
            message: errorData?.message || "Internal server error.",
            status,
            code: "SERVER_ERROR",
          };
        case 400:
          return {
            message: errorData?.message || errorData?.error || "Bad request",
            status,
            code: "BAD_REQUEST",
          };
        default:
          return {
            message: errorData?.message || "An unexpected error occurred.",
            status,
            code: "UNKNOWN_ERROR",
          };
      }
    } else if (error.request) {
      return {
        message: "No response received from server.",
        code: "NO_RESPONSE",
      };
    } else {
      return {
        message:
          error.message || "An error occurred while setting up the request.",
        code: "REQUEST_SETUP_ERROR",
      };
    }
  }

  private handleUnauthorized(): void {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  private async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.request<T>(config);
      return {
        data: response.data,
        status: response.status,
        message: "Success",
      };
    } catch (error) {
      throw error;
    }
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "GET", url });
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "POST", url, data });
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "PUT", url, data });
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "PATCH", url, data });
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: "DELETE", url });
  }
}

export const apiClient = ApiClient.getInstance();
