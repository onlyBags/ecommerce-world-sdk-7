type HttpMethod = "GET" | "POST";
import config from "../config";

const { baseUrl } = config;

interface DGLiveResponse<T> {
  data: T;
  message: string;
  status: number;
}

interface HttpOptions {
  headers?: Record<string, string>;
}

class Http {
  baseUrl: string;
  defaultHeaders: Record<string, string>;

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  async request<T>(
    url: string,
    method: HttpMethod,
    data?: any,
    options?: HttpOptions
  ): Promise<T> {
    const fullUrl = `${this.baseUrl}/${url}`;
    const headers = { ...this.defaultHeaders, ...options?.headers };

    try {
      const response = await fetch(fullUrl, {
        method,
        headers,
        body: method === "POST" ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("HTTP Request Error:", error);
      throw error;
    }
  }

  get<T>(url: string, options?: HttpOptions): Promise<DGLiveResponse<T>> {
    return this.request<DGLiveResponse<T>>(url, "GET", null, options);
  }

  post<T>(
    url: string,
    data: any,
    options?: HttpOptions
  ): Promise<DGLiveResponse<T>> {
    return this.request<DGLiveResponse<T>>(url, "POST", data, options);
  }
}

export const http = new Http(baseUrl, {
  accept: "application/json",
  "Content-Type": "application/json",
});
