import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class HttpService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://localhost:3500",
      withCredentials: true,
      headers: {
        XMLHttpRequest: "HMLHttpRequest",
      },
    });
  }

  request = <T, R = T>(requestConfig: AxiosRequestConfig): Promise<R> =>
    this.httpClient.request(requestConfig).then(({ data }) => data);
}

export const httpService = new HttpService();
