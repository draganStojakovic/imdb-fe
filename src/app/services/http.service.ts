import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ISignIn } from "app/types/IUser";

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

  async post(route: string, payload: ISignIn | null, credentials: any | null) {
    if (payload === null)
      return await this.httpClient.post(route, payload || null, credentials || null);
    return await this.httpClient.post(route, payload);
  }

  request = <T, R = T>(requestConfig: AxiosRequestConfig): Promise<R> =>
    this.httpClient.request(requestConfig).then(({ data }) => data);
}

export const httpService = new HttpService();
