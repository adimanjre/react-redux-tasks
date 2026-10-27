import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

type CustomAxiosConfig = AxiosRequestConfig & { _isRetry: boolean };
let promise: Promise<unknown> | null = null;

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const config = error.config as CustomAxiosConfig;
    if (error.status !== 401) {
      return Promise.reject(error);
    }
    if (config._isRetry || config.url?.startsWith("/api/v1/auth")) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
    config._isRetry = true;
    if (!promise) {
      promise = instance
        .post("/api/v1/auth/refresh-token", {})
        .finally(() => (promise = null));
    }
    return promise.then(() => instance(config));
  },
);

export default instance;
