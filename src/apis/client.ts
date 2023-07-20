import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class ApiClient {
  public instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  get<T>(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.get<T>(path, {
      ...config,
      params: data,
    });
  }

  post<TReseponse, F = any>(
    path: string,
    data?: F,
    config?: AxiosRequestConfig<F>
  ) {
    return this.instance.post<TReseponse>(path, data, config);
  }

  put<TReseponse, F = any>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig<F>
  ) {
    return this.instance.put<TReseponse>(path, data, config);
  }

  delete<TReseponse, F = any>(path: string, config?: AxiosRequestConfig<F>) {
    return this.instance.delete<TReseponse>(path, config);
  }

  patch<TReseponse, F = any>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig<F>
  ) {
    return this.instance.patch<TReseponse>(path, data, config);
  }
}

export const apiClient = new ApiClient(
  "https://api.feltpen.site/api-public/realtime-search-keyword"
);
