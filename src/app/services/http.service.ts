import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpService {
  httpClient: AxiosInstance;
  omdb: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'http://localhost:3500',
      withCredentials: true,
      headers: {
        XMLHttpRequest: 'HMLHttpRequest',
      },
    });
    this.omdb = axios.create({
      baseURL: 'https://www.omdbapi.com',
    });
  }

  request = <T, R = T>(requestConfig: AxiosRequestConfig): Promise<R> =>
    this.httpClient.request(requestConfig).then(({ data }) => data);

  requestOMDb = <T, R = T>(requestConfig: AxiosRequestConfig): Promise<R> =>
    this.omdb.request(requestConfig).then(({ data }) => data);
}

export const httpService = new HttpService();
